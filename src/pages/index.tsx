
import {GetServerSideProps} from 'next';
import React from "react";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from "../styles/pages/Home.module.css";
import Head from "next/Head"
import { ChallengeBox } from "../components/ChallengeBox";
import { CountDownProvider } from "../contexts/CountDownContext";
import { ChallengeProvider } from '../contexts/ChallengesContext';

interface HomeProps{
  level: number;
  currentExperience: number;
  challengeCompleted: number;

}

export default function Home(props: HomeProps) {
  
  return (
    <ChallengeProvider level={props.level} currentExperience={props.currentExperience} challengeCompleted={props.challengeCompleted}>
    <div className={styles.container}>
      <Head>
        <title>Inicio | move.it</title>
      </Head>

      <ExperienceBar />
      <CountDownProvider>
      <section className="">
        <div className="">
          <Profile/>
          <CompletedChallenges/>
          <CountDown/>
        </div>
        <div className="">
          <ChallengeBox/>
        </div>
      </section>
      </CountDownProvider>
    </div>
    </ChallengeProvider>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) =>{
  
  const {level, currentExperience, challengeCompleted} = ctx.req.cookies;
  
  
  return {
    
    
      props:{
        level: Number(level),
        currentExperience: Number(currentExperience),
        challengeCompleted: Number(challengeCompleted)

      }
    
  }

}