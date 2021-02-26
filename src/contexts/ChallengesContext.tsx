import React, { createContext, useState, ReactNode, useEffect } from "react";
import challenges from "../../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";



interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengeContextData {
  startNewChallenge: () => void;
  level: number;
  activeChallenge: Challenge;
  currentExperience: number;
  challengeCompleted: number;
  experienceNextToLevel: number;
  closeLevelUpModal: () => void;
  completedChallenge: () => void;
  resetChallenge: () => void;
  levelUp: () => void;
}
interface ChallengeProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children, ...rest}: ChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceNextToLevel = Math.pow((level + 1) * 4, 2);

useEffect(() => {

  Cookies.set('level', String(level));
  Cookies.set('currentExperience', String(currentExperience));
  Cookies.set('challengeCompleted', String(challengeCompleted));
  
}, [level, currentExperience, challengeCompleted])



  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false);

  }
  function startNewChallenge() {
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengesIndex];
    setActiveChallenge(challenge);

    //new Audio('/notification.mp3').play();

    if (Notification.permission === "granted") {
      new Notification("Novo Desafio ", {
        body: `Valendo${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completedChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceNextToLevel) {
      finalExperience = finalExperience - experienceNextToLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengeCompleted(challengeCompleted + 1);
  }
  return (
    <ChallengesContext.Provider
      value={{
        startNewChallenge,
        level,
        currentExperience,
        challengeCompleted,
        levelUp,
        activeChallenge,
        resetChallenge,
        experienceNextToLevel,
        completedChallenge,
        closeLevelUpModal,

      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal/>}
    </ChallengesContext.Provider>
  );
}
