import styles from "./StepFlow.module.css";

type Step = { number: number; label: string };

export default function StepFlow({ steps }: { steps: Step[] }) {
  return (
    <div className={styles.flow}>
      {steps.map((step, i) => (
        <div key={step.number} className={styles.stepWrap}>
          <div className={styles.step}>
            <div className={styles.circle}>{step.number}</div>
            <p>{step.label}</p>
          </div>
          {i < steps.length - 1 && (
            <div className={styles.arrow} aria-hidden="true">→</div>
          )}
        </div>
      ))}
    </div>
  );
}
