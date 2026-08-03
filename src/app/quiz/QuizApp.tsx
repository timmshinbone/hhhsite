"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import EmailCaptureForm from "@/components/EmailCaptureForm";
import cartImg from "../../../public/images/shopping_cart.jpg";
import Tag from "@/components/Tag";
import styles from "./quiz.module.css";
import {
  QUESTIONS,
  TIERS,
  score,
  type Answers,
  type TierKey,
  type ScoreResult,
} from "./quiz-data";

const STORE_KEY = "cleanCart.v1";
const TOTAL_Q = QUESTIONS.length;

type Step = "entry" | "quiz" | "gate" | "results";

interface SavedState {
  step: Step;
  qIndex: number;
  answers: Answers;
  emailGiven: boolean;
}

function loadState(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveState(s: SavedState) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(s));
  } catch {}
}

// ---------- small pieces ----------
function Progress({ index }: { index: number }) {
  const pct = Math.round(((index + 1) / TOTAL_Q) * 100);
  return (
    <div className={styles.progress}>
      <div className={styles.progressMeta}>
        <span>
          Question {index + 1} of {TOTAL_Q}
        </span>
        <span>{pct}% complete</span>
      </div>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function OptionCard({
  text,
  selected,
  onSelect,
  idx,
}: {
  text: string;
  selected: boolean;
  onSelect: () => void;
  idx: number;
}) {
  return (
    <button
      type="button"
      className={`${styles.opt} ${selected ? styles.optSel : ""}`}
      onClick={onSelect}
      style={{ animationDelay: `${idx * 45}ms` }}
    >
      <span className={styles.optText}>{text}</span>
      <span className={styles.optCheck}>
        <i className="ph ph-check" />
      </span>
    </button>
  );
}

// ---------- screens ----------
function Entry({ onStart }: { onStart: () => void }) {
  return (
    <div className={styles.entryGrid}>
      <div>
        <span className="eyebrow">Free 3-minute quiz</span>
        <h1 className={styles.entryH1}>
          Find out how much you’re{" "}
          <span className="accent">overspending</span> at the grocery store
        </h1>
        <p className={styles.entrySub}>
          Answer 8 quick questions and we’ll show you exactly where your
          grocery money is going - and how much you could save.
        </p>
        <div className={styles.entryCta}>
          <button type="button" className="btn btn-primary lg" onClick={onStart}>
            Take the Free Quiz <i className="ph ph-arrow-right" />
          </button>
        </div>
        <p className="fineprint">
          <i className="ph ph-clock" />
          Takes under 3 minutes. Enter your email to unlock your results.
        </p>
      </div>
      <div className={styles.entryMedia}>
        <div className={styles.cartCover}>
          <Image
            src={cartImg}
            alt="Cart full of fresh groceries"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </div>
  );
}

function QuizScreen({
  index,
  answers,
  onAnswer,
  onNext,
  onBack,
}: {
  index: number;
  answers: Answers;
  onAnswer: (index: number, val: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const question = QUESTIONS[index];
  const selected = answers[index];
  const hasSel = selected !== null && selected !== undefined;
  return (
    <div>
      <Progress index={index} />
      <div className={styles.quizBody} key={index}>
        <span className={styles.qLabel}>{question.label}</span>
        <h2 className={styles.qTitle}>{question.q}</h2>
        <div className={styles.optList}>
          {question.options.map((opt, i) => (
            <OptionCard
              key={i}
              idx={i}
              text={opt}
              selected={selected === i}
              onSelect={() => onAnswer(index, i)}
            />
          ))}
        </div>
      </div>
      <div className={styles.quizNav}>
        <button
          type="button"
          className={`${styles.back} ${index === 0 ? styles.backHidden : ""}`}
          onClick={onBack}
        >
          <i className="ph ph-arrow-left" /> Back
        </button>
        {hasSel ? (
          <button type="button" className="btn btn-primary" onClick={onNext}>
            {index === TOTAL_Q - 1 ? "See My Results" : "Next"}{" "}
            <i className="ph ph-arrow-right" />
          </button>
        ) : (
          <span className={styles.navHint}>Choose an answer to continue</span>
        )}
      </div>
    </div>
  );
}

function Gate({ onUnlock }: { onUnlock: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [gateStatus, setGateStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGateStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: "swap-sheet", email, firstName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setGateStatus("error");
        return;
      }
      setDownloadUrl(data.downloadUrl || "");
      setGateStatus("done");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setGateStatus("error");
    }
  }

  if (gateStatus === "done") {
    return (
      <div className={styles.emailInner}>
        <span className={styles.checkmark}>
          <i className="ph ph-check-circle" />
        </span>
        <span className="eyebrow">Check your inbox</span>
        <h1 className={styles.emailH1}>Your free guide is on its way!</h1>
        <p className={styles.emailSub}>
          We just sent <strong>The 5-Second Shopper</strong> to {email}. It&apos;ll help you
          start cutting your grocery bill on your very next trip.
        </p>
        {downloadUrl && (
          <a href={downloadUrl} className="btn btn-outline" style={{ marginBottom: 20 }}>
            Download now <i className="ph ph-download-simple" />
          </a>
        )}
        <div>
          <button type="button" className="btn btn-primary" onClick={() => onUnlock(email)}>
            See My Results <i className="ph ph-arrow-right" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.emailInner}>
      <span className={styles.checkmark}>
        <i className="ph ph-check-circle" />
      </span>
      <span className="eyebrow">Your results are ready</span>
      <h1 className={styles.emailH1}>Unlock your free Clean Cart Report</h1>
      <p className={styles.emailSub}>
        Enter your email to see your results. We&apos;ll also send you{" "}
        <strong>The 5-Second Shopper</strong> — our free guide to spotting Ultra Processed
        Foods in seconds — so you can start saving money on your very next grocery trip.
      </p>
      <div className={styles.emailCaptureWrap}>
        <form className="capture" onSubmit={handleSubmit}>
          <input
            type="text"
            className="capture-name"
            placeholder="First name (optional)"
            aria-label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={gateStatus === "loading"}
          />
          <input
            type="email"
            placeholder="your@email.com"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={gateStatus === "loading"}
          />
          <button className="btn btn-primary" type="submit" disabled={gateStatus === "loading"}>
            {gateStatus === "loading" ? "Sending…" : "Unlock My Results"}
          </button>
        </form>
        {gateStatus === "error" && (
          <p className="capture-error" role="alert">{errorMsg}</p>
        )}
      </div>
      <p className={`fineprint ${styles.centerFine}`}>
        <i className="ph ph-lock" /> No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}

const TIER_KEYS: TierKey[] = ["low", "medium", "high"];

function Results({
  result,
  tierOverride,
  onTierPreview,
}: {
  result: ScoreResult;
  tierOverride: TierKey | null;
  onTierPreview: (tier: TierKey) => void;
}) {
  const [waitlistDone, setWaitlistDone] = useState(false);
  const tierKey = tierOverride || result.tier;
  const tier = TIERS[tierKey];
  const bridge = tier.bridge(result.monthlyRange.text, result.annualRange.text);

  return (
    <div>
      <span className="eyebrow">Your Clean Cart Report</span>
      <h1 className={styles.resultsH1}>{tier.headline}</h1>

      {/* ----- stat card ----- */}
      <div className={styles.statcard}>
        <div className={styles.statGrid}>
          <div className={styles.statBlock}>
            <span className={styles.statCap}>Estimated monthly overspend</span>
            <span className={styles.statBig}>{result.monthlyRange.text}</span>
          </div>
          <div className={styles.statBlock}>
            <span className={styles.statCap}>Estimated annual overspend</span>
            <span className={styles.statBig}>{result.annualRange.text}</span>
          </div>
        </div>
        <div className={styles.opp}>
          <span className={styles.oppLabel}>Your biggest opportunity areas</span>
          <div className={styles.oppTags}>
            {result.areaLabels.map((a, i) => (
              <Tag key={i}>{a}</Tag>
            ))}
          </div>
        </div>
      </div>

      {/* ----- bridge ----- */}
      <p className={styles.bridge}>{bridge}</p>

      {/* ----- consultation waitlist ----- */}
      <div className={styles.waitlist}>
        <span className="eyebrow">Coming soon</span>
        <h2 className={styles.waitlistH2}>
          The Clean Cart Consultation is on its way.
        </h2>
        <p className={styles.waitlistDesc}>
          We're building a 1-on-1 session where Hana and Timm walk through
          your answers with you, build a personalized grocery list for your
          household, and set you up with a 2-week meal plan that actually fits
          your life. Drop your email below and you'll be the first to know when
          spots open, and first in line for our founding member rate.
        </p>
        {!waitlistDone ? (
          <EmailCaptureForm
            placeholder="your@email.com"
            buttonLabel="Join the Waitlist"
            group="waitlist"
            onSuccess={() => setWaitlistDone(true)}
          />
        ) : (
          <p className={styles.waitlistConfirm}>
            <i className="ph ph-check-circle" /> You're on the list! We'll be
            in touch when spots open.
          </p>
        )}
        <a className={styles.secondaryLink} href="/the-perfect-list">
          Not ready to wait? Start with our Grocery Guide instead →
        </a>
      </div>

      <p className={styles.source}>
        Baseline grocery costs based on USDA moderate food plan data via{" "}
        <a href="https://groceriestracker.com" target="_blank" rel="noopener">
          groceriestracker.com
        </a>
        .
      </p>

      {/* ----- demo tier preview ----- */}
      <div className={styles.tierPreview}>
        <span className={styles.tierPreviewLabel}>Demo - preview result tier</span>
        <div className={styles.tierBtns}>
          {TIER_KEYS.map((t) => (
            <button
              key={t}
              type="button"
              className={`${styles.tierBtn} ${tierKey === t ? styles.tierBtnOn : ""}`}
              onClick={() => onTierPreview(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- app shell ----------
export default function QuizApp() {
  const [step, setStep] = useState<Step>("entry");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(() => new Array(TOTAL_Q).fill(null));
  const [tierOverride, setTierOverride] = useState<TierKey | null>(null);
  const [emailGiven, setEmailGiven] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // load any saved progress after mount (avoids SSR/client hydration mismatch)
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      const validSteps: Step[] = ["entry", "quiz", "gate", "results"];
      const restoredStep = saved.step as string;
      setStep(validSteps.includes(restoredStep as Step) ? (restoredStep as Step) : "entry");
      setQIndex(saved.qIndex ?? 0);
      setAnswers(saved.answers ?? new Array(TOTAL_Q).fill(null));
      setEmailGiven(saved.emailGiven ?? false);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveState({ step, qIndex, answers, emailGiven });
  }, [hydrated, step, qIndex, answers, emailGiven]);

  // scroll to top of page on screen change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, qIndex]);

  const result = score(answers);

  function answer(i: number, val: number) {
    const next = answers.slice();
    next[i] = val;
    setAnswers(next);
  }
  function nextQ() {
    if (qIndex < TOTAL_Q - 1) setQIndex(qIndex + 1);
    else if (emailGiven) setStep("results");
    else setStep("gate");
  }
  function backQ() {
    if (qIndex > 0) setQIndex(qIndex - 1);
    else setStep("entry");
  }
  function startOver() {
    setAnswers(new Array(TOTAL_Q).fill(null));
    setQIndex(0);
    setTierOverride(null);
    setStep("entry");
  }

  let screen: ReactNode;
  if (step === "entry") {
    screen = (
      <Entry
        onStart={() => {
          setQIndex(0);
          setStep("quiz");
        }}
      />
    );
  } else if (step === "quiz") {
    screen = (
      <QuizScreen
        index={qIndex}
        answers={answers}
        onAnswer={answer}
        onNext={nextQ}
        onBack={backQ}
      />
    );
  } else if (step === "gate") {
    screen = (
      <Gate
        onUnlock={() => {
          setEmailGiven(true);
          setStep("results");
        }}
      />
    );
  } else {
    screen = (
      <Results
        result={result}
        tierOverride={tierOverride}
        onTierPreview={setTierOverride}
      />
    );
  }

  return (
    <section className={styles.stage}>
      <div
        className={`${styles.stageInner} ${step === "results" ? styles.wide : ""}`}
        key={`${step}-${step === "quiz" ? qIndex : ""}`}
      >
        {step !== "entry" && (
          <div className={styles.restartRow}>
            <button type="button" className={styles.restart} onClick={startOver}>
              <i className="ph ph-arrow-counter-clockwise" /> Start over
            </button>
          </div>
        )}
        {screen}
      </div>
    </section>
  );
}
