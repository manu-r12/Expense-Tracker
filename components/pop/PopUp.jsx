import React, { useContext, useEffect, useState } from 'react'
import styles from './pop.module.css'
import { useDispatch } from 'react-redux';
import { setAmountSaved, setAmountSpent, setDate } from '@/reducers/AddNewExpense';
import { db } from '@/database/firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { UserContext } from '@/context/CurrentUserContext';
import { Toaster, toast } from 'react-hot-toast';


const PopUp = ({closeOrOpen ,currentUser, currentUserDetails}) => {
  const {} = useContext(UserContext)

// STATEs 
const [moneySpent, setMoneySpent] = useState(0);
const [moneySaved, setMoneySaved] = useState(0);
const [isSet1, setIsSet1] = useState(true)
const [isSet, setIsSet] = useState(true)
const [popUp, setPopUp] = useState(false)

const currentDates = new Date()
const currentDate = currentDates.getDate();
const currentYear = currentDates.getFullYear();
const currentMonth = currentDates.getMonth();
const humanReadableMonth = currentMonth + 1;







const dateFormated = `${currentDate}/${humanReadableMonth}/${currentYear}`




  
  console.log(moneySaved, moneySpent)

  const dispatch = useDispatch()

  const handleClickForSpentMoney = () =>{
    dispatch(setAmountSpent(moneySpent))
    setIsSet1(false)
  }
  const handleClickForSavedMoney = () =>{
    dispatch(setAmountSaved(moneySaved))
    dispatch(setDate(dateFormated))
    setIsSet(false)
  }


  const arrayRef = doc(db, "details", currentUser.uid);

  const handelUpdate = async () =>{
    await updateDoc(arrayRef, {
      dailySpentMoney: arrayUnion({
        date: dateFormated,
        amountSpent: moneySpent,
        amountSaved: moneySaved,
      })
    
  })
  toast("successfully updated")
  window.location.reload(); // Reload the page
  } 

  return (
    <div  className={styles.PopUp}>
       <Toaster/>
      <div className={styles.input}>
      <div className={styles.title}>
          <h1 className={styles.addTitle}>Add New Details</h1>
          <p onClick={() => closeOrOpen()}  className={styles.closeBtn}>Close</p>
      </div>
        <label>Set How Much You Spent Today :</label>
        <div className={styles.inputAndBtn}>
          <input onClick={() => setIsSet1(true)} onChange={(e) => setMoneySpent(e.target.value)} className={styles.detailsInput} type='number'/>
         {isSet1 && <button onClick={handleClickForSpentMoney} className={styles.setBtn}>Set</button>}
        </div>
        <label>Set How Much You Saved Today :</label>
        <div className={styles.inputAndBtn}>
          <input onClick={() => setIsSet(true)} onChange={(e) => setMoneySaved(e.target.value)} className={styles.detailsInput} type='number'/>
          {isSet && <button onClick={handleClickForSavedMoney} className={styles.setBtn}>Set</button>}
        </div>
        {/* <label>Set How Much You Spent Today :</label> */}
        {/* <div className={styles.inputAndBtn}>
          <input className={styles.detailsInput} type='number'/>
          <button className={styles.setBtn}>Set</button>
        </div> */}
      </div>

      <div className={styles.uploadBtn}>
        <button onClick={handelUpdate} style={{width: "150px"}} className={styles.setBtn}>Update</button>
      </div>
    
    </div>
  )
}

export default PopUp