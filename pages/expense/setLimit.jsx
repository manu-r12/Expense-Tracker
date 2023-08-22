import { UserContext } from '@/context/CurrentUserContext';
import styles from './set.module.css'
import { useContext, useState } from 'react';
import Link from 'next/link';
import { setAmount, setLimit } from '@/reducers/ExpenseReducer';
import { useDispatch , useSelector } from 'react-redux';
import { getAmount } from '@/reducers/ExpenseSelectors';




const SetAmount = () =>{
    const [input , setInput] = useState()
    const [isSet, setIsSet] = useState(true)
    const dispatch = useDispatch()
 

    const handelChange = (e) =>{
        const amount = e.target.value
        setInput(amount)
    
      }
      
    
      const handleClick = () =>{
           dispatch(setLimit(input))
           setIsSet(false)
      }



    return (
        <div className={styles.container}>
              <h2 className={styles.title}>How much daliy limit do you want set.?</h2>
            <div className={styles.inputContainer}>
                <label for="goal">Set Your Amount</label>
                <input onClick={() => setIsSet(true)} onChange={handelChange}  className={styles.input} type='number' />
              { isSet && <button className={styles.button} onClick={handleClick}>Set</button>}
            </div>
            <div className={styles.links}>
            <Link className={styles.linkBtn}  href={"/expense/setAmount"}>.Back</Link>
            <Link className={styles.linkBtn}  href={"/expense/finalDetails"}>Next.</Link>
            </div>
         
        </div>
      )
}



export default SetAmount;