import cx from 'classnames';
import { useEffect, useState } from 'react';

// import { useChallenges } from "../hooks/useChallenges";
// import { useCountdown } from "../hooks/useCountdown";

import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // const {
  //   isActive,
  //   hasFinished,
  //   resetCountdown,
  //   startCountdown,
  //   minutes,
  //   seconds
  // } = useCountdown();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountDown() {
    setActive(true);
  }


  useEffect(() => {
    console.log(active)
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    }
  }, [active, time])

  return (
    <>
      <div className={styles.countdown}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      <button type="button" className={styles.startCycleButton} onClick={startCountDown}>
        Iniciar um ciclo
      </button>
      {/* { hasFinished ? (
        <button
          disabled
          className={styles.startCycleButton}
        >
          Ciclo encerrado
        </button>
      ) : (
        <>
          { isActive ? (
            <button
              type="button"
              className={cx(styles.startCycleButton, styles.startCycleButtonActive)}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.startCycleButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )} */}
    </>
  );
}
