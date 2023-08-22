import Link from 'next/link';
import styles from './set.module.css'
import {  useSelector } from 'react-redux';
import { getAmount, getLimit, getTime } from '@/reducers/ExpenseSelectors';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/database/firebase';
import { useContext } from 'react';
import { UserContext } from '@/context/CurrentUserContext';
import { useRouter } from 'next/router';
import { getFullDate } from '@/lib/getDay';


const FinalDetails = () =>{
    
    const {dateFormated} = getFullDate();
    //console.log("dateFormated", dateFormated)
    const goal = useSelector(getTime)
    const amount = useSelector(getAmount)
    const limit = useSelector(getLimit)
    const {currentUser} = useContext(UserContext)
    const router = useRouter()

    const monthlyOrWeekly = () =>{
        if(goal == 7){
            return "Weekly"
        }else{
            return "Monthly"
        }
    }

    const getGoal = monthlyOrWeekly()

    const handleClick = async () =>{

        await setDoc(doc(db, "details" , currentUser.uid),{
            date:dateFormated,
            time: goal,
            amountOfMoneySave: amount,
            dailyLimit: limit,
            dailySpentMoney: [],
            previousData: []
          })  

          router.push("/home/dashboard/insight")


    }

    return (
        <div className={styles.container}>
              <h2 className={styles.title}>You are all set </h2>
            <div className={styles.inputContainer}>
             <div className={styles.details}>
                    <p>Your Goal:</p>
                    <p>{getGoal}</p>
                    <p>Amount of money you intend to save at end :</p>
                    <p>{amount}</p>
                    <p>Daily Limit:</p>
                    <p>{limit}</p>
                  
             </div>
             </div>
             
             <Link style={{
                margin: "20px"
             }} className={styles.linkBtn} href={"/expense/setLimit"}>.Back</Link>
             <button className={styles.button} onClick={handleClick}>Go To DashBoard</button>
        </div>
      )
}
export default FinalDetails;