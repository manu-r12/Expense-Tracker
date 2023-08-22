import React from 'react'
import styles from './welcome.module.css'
import Link from 'next/link'

const Welcome = () => {
  return (
    <div className={styles.container}>
        <div className={styles.welcomeScreen}>
             <div className={styles.welcomeTitle}>
                <h1>Welcome</h1>
             </div>
             <div >
                <Link className={styles.button} href={"/register"}>Get Start</Link>
             </div>
        </div>
    </div>  
  )
}

export default Welcome