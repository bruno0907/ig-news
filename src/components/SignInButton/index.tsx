
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

function SignInButton(){
  const isUserLoggedIn = true

  return isUserLoggedIn ? (
    <button className={styles.signInButton}>
      <FaGithub color="#04d361"/>
      Bruno Mariani
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button className={styles.signInButton}>
      <FaGithub color="#eba417"/>
      Sign in With Github      
    </button>
  )  
}

export { SignInButton }