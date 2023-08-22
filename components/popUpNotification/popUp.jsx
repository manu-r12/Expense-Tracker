import styles from './popUp.module.css'
import React from 'react'

const PopUp = ({text, animatiop}) => {
  return (
    <div className={styles.pop}>
        <p><span className={styles.span}>👈🏼</span>{text}</p>
    </div>
  )
}

export default PopUp