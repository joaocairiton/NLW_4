import { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/CountDown.module.css";

let countDownTimeout: NodeJS.Timeout;

export function CountDown() {

  const {startNewChallenge } = useContext(ChallengesContext);
 

  const [time, setTime] = useState(0.1 * 60);
  const [isactive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, "0")
    .split("");

  function startCountDown() {
    setIsActive(true);
  }
  function resetCountDown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if (isactive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isactive && time == 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isactive, time]);

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>
      {hasFinished ? (
        <button disabled className={styles.countDownButton}>
          Ciclo Encerrado
        </button>
      ) : (
          <>
              {isactive ? (
        <button
          type="button"
          className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
          onClick={resetCountDown}
        >
          Abandonar Ciclo
        </button>
      ) : (
        <button
          type="button"
          className={styles.countDownButton}
          onClick={startCountDown}
        >
          Iniciar o Ciclo
        </button>
      )}
          </>
      )}

      
    </div>
  );
}
