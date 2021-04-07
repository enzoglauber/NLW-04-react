import { createContext, ReactNode, useState } from 'react';

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
  starNewChallenge: () => void,
  resetChallenge: () => void,
  completeChallenge: () => void,
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

  function levelUp() {
    setLevel(level + 1);
  }

  function starNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
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
      starNewChallenge,
      resetChallenge,
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}
