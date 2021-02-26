import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {

  const {level}= useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8e3DX5MHGUaBvItelfLnnvIoLVz5xbPyrsw&usqp=CAU"
        alt=""
      />
      <div className="">
        <strong>joao Cairiton</strong>
        <p>
            <img src="icons/level.svg"/>
            Level {level}
            </p>
      </div>
    </div>
  );
}
