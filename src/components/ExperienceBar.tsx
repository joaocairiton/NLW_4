import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const {currentExperience, experienceNextToLevel}= useContext(ChallengesContext);
  const percentNextToLevel = Math.round(currentExperience * 100) / experienceNextToLevel;
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
          <div style={{width: `${percentNextToLevel}%`}}/>
          <span className={styles.currenteExperience}style={{left: `${percentNextToLevel}%`}}>{currentExperience} xp</span>

          
      </div>

      <span>{experienceNextToLevel} xp</span>
    </header>
  );
}
