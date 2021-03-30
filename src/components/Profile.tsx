import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/enzoglauber.png" alt="Profile image" />
      <div>
        <strong>Enzo Glauber</strong>
        <p>
          <img src="icons/level.svg" alt="Icons" />
          Level 1
        </p>
      </div>
    </div>
  )
}
