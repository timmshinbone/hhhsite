import type { Metadata } from "next";
import QuizApp from "./QuizApp";

export const metadata: Metadata = {
  title: "Cart Cost Quiz | Healthy Homemade Habits",
  description:
    "Answer 8 quick questions and find out how much you're overspending at the grocery store - and how much you could save!",
};

export default function QuizPage() {
  return <QuizApp />;
}
