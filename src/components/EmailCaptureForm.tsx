"use client";

import { useState } from "react";

interface EmailCaptureFormProps {
  buttonLabel: string;
  placeholder?: string;
  className?: string;
  group?: string;
  collectFirstName?: boolean;
  collectLastName?: boolean;
  /** Called after submission completes. If provided, the form skips its own success/error UI. */
  onSuccess?: (email: string) => void;
}

type Status = "idle" | "loading" | "success" | "error";

export default function EmailCaptureForm({
  buttonLabel,
  placeholder = "Enter your email",
  className,
  group,
  collectFirstName = false,
  collectLastName = false,
  onSuccess,
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          ...(group ? { group } : {}),
          ...(collectFirstName && firstName ? { firstName } : {}),
          ...(collectLastName && lastName ? { lastName } : {}),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (onSuccess) {
          onSuccess(email);
        } else {
          setErrorMsg(data.error || "Something went wrong. Please try again.");
          setStatus("error");
        }
      } else {
        if (onSuccess) {
          onSuccess(email);
        } else {
          setStatus("success");
        }
      }
    } catch {
      if (onSuccess) {
        onSuccess(email);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
        setStatus("error");
      }
    }
  }

  if (status === "success") {
    return (
      <div className={["capture-success", className].filter(Boolean).join(" ")}>
        <i className="ph ph-check-circle" />
        <span>You&apos;re in! Check your inbox for the guide.</span>
      </div>
    );
  }

  return (
    <>
      <form
        className={["capture", className].filter(Boolean).join(" ")}
        onSubmit={handleSubmit}
      >
        {collectFirstName && (
          <input
            type="text"
            className="capture-name"
            placeholder="First name"
            aria-label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={status === "loading"}
          />
        )}
        {collectLastName && (
          <input
            type="text"
            className="capture-name"
            placeholder="Last name"
            aria-label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={status === "loading"}
          />
        )}
        <input
          type="email"
          placeholder={placeholder}
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending…" : buttonLabel}
        </button>
      </form>
      {status === "error" && (
        <p className="capture-error" role="alert">
          {errorMsg}
        </p>
      )}
    </>
  );
}
