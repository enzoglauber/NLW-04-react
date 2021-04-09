import { createContext, ReactNode, useEffect, useState } from 'react';

import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengerContextData {
  level: number,
  levelUp: () => void,
  currentExperience: number,
  challengesCompleted: number,
  resetChallenge: () => void,
  completeChallenge: () => void,
  startNewChallenge: () => void,
  experienceToNextLevel: number,
  activeChallenge: Challenge
}

interface ChallengerProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengerContextData);

export function ChallengerProvider({ children }: ChallengerProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  useEffect(() => { // amount
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
  }

  useEffect(() => {
    // Cookies.set('level', String(level))
    // Cookies.set('currentExperience', String(currentExperience))
    // Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge as Challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} de xp!`,
        silent: false,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)


  return (
    <ChallengesContext.Provider value={{
      level,
      levelUp,
      challengesCompleted,
      currentExperience,
      experienceToNextLevel,
      activeChallenge,
      completeChallenge,
      startNewChallenge,
      resetChallenge,
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}
