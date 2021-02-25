

import React from "react";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from "../styles/pages/Home.module.css";
import Head from "next/Head"
import { ChallengeBox } from "../components/ChallengeBox";
import { CountDownProvider } from "../contexts/CountDownContext";



export default function Home() {
  return (
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
  );
}
