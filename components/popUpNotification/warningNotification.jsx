import React from 'react'
import styles from './warning.module.css'
import Setup from '@/pages/expense/setGoal'
import SetUpPop from './setUpPop'
import { useState } from 'react'

const WarningNotification = () => {
    const [isPopOpen , setIsPopOpen] = useState(false)

 const handelClick = () =>{
    setIsPopOpen(!isPopOpen)
 }


  return (
    <div className={styles.pop}>
    {isPopOpen && <SetUpPop/>}
    <p><span className={styles.span}>⚠️</span>You have not set up Expenses Details Yet:<span onClick={handelClick} className={styles.linkbtn}>Click to Setup</span></p>
    
</div>
  )
}

export default WarningNotification