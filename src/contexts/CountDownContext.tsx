import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";



let countDownTimeout: NodeJS.Timeout;
interface CountDownContextData{

    minutes:number;
    seconds: number;
    hasFinished:boolean;
    isactive:boolean;
    startCountDown: () => void;
    resetCountDown: () => void;

}
interface CountDownProviderProps{
    children: ReactNode;
}


export const CountDownContext = createContext({} as CountDownContextData)

export function  CountDownProvider({children}: CountDownProviderProps){

    const {startNewChallenge } = useContext(ChallengesContext);
 

    const [time, setTime] = useState(0.1 * 60);
    const [isactive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
  
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountDown() {
        setIsActive(true);
      }
      function resetCountDown() {
        clearTimeout(countDownTimeout);
        setIsActive(false);
        setHasFinished(false);
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
    
    return(
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isactive,
            startCountDown,
            resetCountDown
        }}>

            {children}
        </CountDownContext.Provider>
    );

}