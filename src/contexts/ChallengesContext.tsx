import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from "../../challenges.json";

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
  completedChallenge: () => void;
  resetChallenge: () => void;
  levelUp: () => void;
}
interface ChallengeProviderProps {
  children: ReactNode;
}
export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children }: ChallengeProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceNextToLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
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
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
