import { useChallenges } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useChallenges();

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/enzoglauber.png" alt="Profile image" />
      <div>
        <strong>Enzo Glauber</strong>
        <p>
          <img src="icons/level.svg" alt="Icons" />
          Level {level}
        </p>
      </div>
    </div>
  )
}
