import styles from "./InfoRules.module.css";

export default function InfoRules() {
  return (
    <div className={styles.rulesView}>
      <h2>📜 Ghid & Regulament Depozitare Colete</h2>
      <div className={styles.rulesList}>
        <div className={styles.ruleItem}>
          <span className={styles.ruleNum}>01</span>
          <div>
            <h4>Timp Maxim de Păstrare</h4>
            <p>Coletele pot fi menținute în compartimente pentru maximum 48 de ore de la depunere.</p>
          </div>
        </div>

        <div className={styles.ruleItem}>
          <span className={styles.ruleNum}>02</span>
          <div>
            <h4>Dimensiuni Admise</h4>
            <p>Asigurați-vă că pachetul selectat respectă limitele (S: max 10kg, M: max 20kg, L: max 30kg).</p>
          </div>
        </div>

        <div className={styles.ruleItem}>
          <span className={styles.ruleNum}>03</span>
          <div>
            <h4>Securitate & Monitorizare</h4>
            <p>Toate hub-urile DNCB și din capitală sunt supravegheate video 24/7 și protejate prin PIN dinamic.</p>
          </div>
        </div>
      </div>
    </div>
  );
}