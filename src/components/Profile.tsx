import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {

  const {level}= useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://assets.change.org/photos/8/rs/wx/ldRSwXeXPMCOQUE-800x450-noPad.jpg?1563944095"
        alt=""
      />
      <div className="">
        <strong>joao Frango</strong>
        <p>
            <img src="icons/level.svg"/>
            Level {level}
            </p>
      </div>
    </div>
  );
}
