import React, { useContext, useEffect, useState, } from 'react'
import { UserContext } from '@/context/CurrentUserContext';
import { useRouter } from 'next/router';
import DetailsSection from '@/components/detailsSections/detailsSection';
import styles from './insight.module.css'
import PopUp from '@/components/popUpNotification/popUp';
import { getFullDate } from '@/lib/getDay';
import WarningNotification from '@/components/popUpNotification/warningNotification';
import SetUpPop from '@/components/popUpNotification/setUpPop';


const DashBoard =  () => {

  const router = useRouter()
  const [isThereUserDetaill, setIsThereUserDetaill]  = useState(false)
  
  const {
      currentUser,
      currentUserDetails,
      loading,
      isLogedIn,
      userArray,
      isItTimeShowReportWeeklyMonthly,
      isToadyNewDateToSetNewExpenses} = useContext(UserContext)
  
  console.log("details", currentUserDetails)

  // useEffect(() =>{
  //   let isEmpty = true;
  //   const obj =  currentUserDetails  
  //   for (const key in obj) {
  //           isEmpty = false;
  //           break; // Exit loop as soon as a key is found
  //       }

  //   setIsThereUserDetaill(isEmpty)
  // }, [])


    console.log(isItTimeShowReportWeeklyMonthly)
  const [isPopOpen , setIsPopOpen] = useState(false)

  const handelClick = () =>{
      router.push("/expense/setGoal")
  }
 


  return (

   <div className={styles.body}>
   { !loading &&   <div className={styles.pop}>
    <p><span className={styles.span}>⚠️</span>You have not set up Expenses Details Yet:<span onClick={handelClick} className={styles.linkbtn}>Click to Setup</span></p>
    </div>}
    {isPopOpen && <SetUpPop/>}
    {isPopOpen && <div className={styles.black}/> }
        {isToadyNewDateToSetNewExpenses && <PopUp animation={true} text={"Enter Your Today's Expenses"}/>}
        {!isToadyNewDateToSetNewExpenses && <PopUp text={"Today's Expenses Are Updated ✅"}/>}
        <div className={styles.detailsSection}> 
        <DetailsSection
          userExpensesArray={userArray}
          loadState={loading}
          userDetails = {currentUserDetails}
          user={currentUser}
          isTimeToShowReport={isItTimeShowReportWeeklyMonthly}
          />
         
        </div>
    
    </div>

 
 
  )
}

export default DashBoard