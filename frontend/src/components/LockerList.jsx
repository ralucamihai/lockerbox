import LockerCard from "./LockerCard.jsx";
import styles from "./LockerList.module.css";

export default function LockerList({ lockers, onToggle, onDelete }) {
  if (!lockers || lockers.length === 0) {
    return (
      <p className={styles.empty} data-testid="empty">
        Nu există niciun locker pe acest traseu.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {lockers.map((locker) => (
        <LockerCard
          key={locker.id}
          locker={locker}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
