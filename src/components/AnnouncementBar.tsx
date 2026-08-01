import Link from "next/link";
import styles from "./AnnouncementBar.module.css";

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <Link href="/quiz" className={styles.link}>
        Find out how much you&apos;re overspending on groceries &rarr;
      </Link>
    </div>
  );
}
