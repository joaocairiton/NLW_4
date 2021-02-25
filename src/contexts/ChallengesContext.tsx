import {createContext, useState, ReactNode} from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface  ChallengeContextData{
    startNewChallenge: () => void;
    level:number;
    activeChallenge: Challenge;
    currentExperience:number;
    challengeCompleted:number;
    experienceNextToLevel: number;
    resetChallenge: () => void;
     levelUp: () => void;

}
interface ChallengeProviderProps{
    children: ReactNode;
}
export const ChallengesContext = createContext({} as ChallengeContextData);

export  function ChallengeProvider({children}: ChallengeProviderProps){

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengeCompleted, setChallengeCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceNextToLevel = Math.pow((level + 1)* 4, 2)

  function levelUp() {
    setLevel(level + 1);

  }
  function startNewChallenge(){
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengesIndex];
    setActiveChallenge(challenge);

  }

  function resetChallenge() {
      setActiveChallenge(null);
  }
    return(
        <ChallengesContext.Provider value={{startNewChallenge,
        level,
        currentExperience,
        challengeCompleted,
         levelUp,
          activeChallenge,
          resetChallenge,
          experienceNextToLevel}}>
{children}
        </ChallengesContext.Provider>
    );

}