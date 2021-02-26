import "../styles/global.css";
import {
  ChallengeProvider,
 
} from "../contexts/ChallengesContext";
import React from "react";


function MyApp({ Component, pageProps }) {
  return (
    
      <Component {...pageProps} />
   
  );
}

export default MyApp;
