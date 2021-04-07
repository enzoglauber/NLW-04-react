import '../styles/global.css';

import { ChallengerProvider } from '../contexts/ChallengesContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengerProvider>
      <Component {...pageProps} />
    </ChallengerProvider>
  )
}

export default MyApp
