import '../styles/global.css';
import { ChallengeProvider, ChallengesContext } from '../contexts/ChallengesContext';
import React from 'react';
import { CountDownProvider } from '../contexts/CountDownContext';

function MyApp({ Component, pageProps }) {
  
  return (
    
  <ChallengeProvider>
      
          <Component {...pageProps} />
       
  </ChallengeProvider>
  )
}

export default MyApp
