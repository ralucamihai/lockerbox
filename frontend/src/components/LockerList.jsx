import LockerCard from "./LockerCard.jsx";

export default function LockerList({ lockers }) {
  if (!lockers || lockers.length === 0) {
    return (
      <p className="empty" style={{ textAlign: "center", padding: "20px", color: "#94a3b8" }}>
        Nu există niciun locker pe acest traseu.
      </p>
    );
  }

  return (
    <ul className="locker-highway-list">
      {lockers.map((locker) => (
        <LockerCard key={locker.id} locker={locker} />
      ))}
    </ul>
  );
}