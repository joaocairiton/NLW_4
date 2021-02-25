import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountDownContext } from "../contexts/CountDownContext";
import styles from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {
const {activeChallenge, resetChallenge, completedChallenge} = useContext(ChallengesContext);
const {resetCountDown} = useContext(CountDownContext);
function handleChallengeSuccess(){
completedChallenge();
resetCountDown();
}

function handleChaFailed(){
resetChallenge();
resetCountDown();

}
  
  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount}</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button type="button" className={styles.challengeFailButton}
            onClick={handleChaFailed}>
              Falhei
            </button>
            <button type="button" className={styles.challengeSuccessButton}
            onClick={handleChallengeSuccess}>
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>
            Inicie um ciclo para receber desafio a serem completados
          </strong>
          <p>
            <img src="icons/level-up.svg" alt="leve-up" />
            Avance de level completando os desafios
          </p>
        </div>
      )}
    </div>
  );
}
