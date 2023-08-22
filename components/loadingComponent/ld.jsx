import React from 'react'
import  styles from './ld.module.css'

const LDComponent = () => {
  return (
    <div>
        <div className={styles.loadingwave}>
            <div className={styles.loadingbar}></div>
            <div className={styles.loadingbar}></div>
            <div className={styles.loadingbar}></div>
            <div className={styles.loadingbar}></div>
        </div>
    </div>
  

  )
}

export default LDComponent