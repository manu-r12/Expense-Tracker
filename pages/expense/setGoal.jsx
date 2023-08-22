import React, { use, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@/database/firebase'
import { doc, getDoc } from 'firebase/firestore'
import styles from './set.module.css'
import { UserContext } from '@/context/CurrentUserContext'
import { useDispatch, useSelector } from 'react-redux'
import { setTIme } from '@/reducers/ExpenseReducer'
import { getTime } from '@/reducers/ExpenseSelectors'
import Link from 'next/link'

const Setup =   () => {
  const [input , setInput] = useState()
  const [isSet, setIsSet] = useState(true)
  const {currentUser} = useContext(UserContext)
  console.log("fetchedData", currentUser)

  const dispatch = useDispatch()
  const time = useSelector(getTime)

  const handelChange = (e) =>{
    setInput(e.target.value)

  }
  

  const handleClick = () =>{
       dispatch(setTIme(input))
       setIsSet(false)
  }
  console.log("time:", time)


  return (
    <div className={styles.container}>
          <h2 className={styles.title}>Hi, {currentUser.displayName}</h2>
        <div className={styles.inputContainer}>
            <label for="goal">Set Your Goal</label>
                  <select onChange={handelChange} className={styles.select} name="pets" id="pet-select">
                    <option value="">Please choose an option</option>
                    <option value="7">Weekly</option>
                    <option value="28">Monthly</option>
                  </select>
          { isSet && <button className={styles.button} onClick={handleClick}>Set</button>}
        </div>
        <Link className={styles.button}  href={"/expense/setAmount"}>Next.</Link>
    </div>
  )
}

export default Setup

