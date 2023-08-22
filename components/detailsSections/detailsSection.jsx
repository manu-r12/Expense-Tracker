import React, { useDebugValue, useEffect } from 'react'
import styles from './details.module.css'
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import Image from 'next/image';
import MailIcon from '@mui/icons-material/Mail';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { signOut } from 'firebase/auth';
import { auth, db } from '@/database/firebase';
import { useRouter } from 'next/router';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {getFullDate } from '@/lib/getDay';
import PopUp from '../pop/PopUp';
import { useState } from 'react';
import LDComponent from '../loadingComponent/ld';
import { Toast } from 'react-hot-toast';
import List from '../prevDataList/list';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { ReportScreen } from '../reportScreenComponent/screen';



const DetailsSection = ({user, userDetails, loadState, userExpensesArray, isTimeToShowReport}) => {

  const [isPopUpOpen, setPopUpOpen] = useState()
  
  const router = useRouter()
  const currentDate = new Date();
  const now = currentDate.getUTCDay()
  const date = currentDate.getDate()
  const monthly = 28
  const weekly = 7

  if(!userDetails){
      window.location.reload()
  }

  console.log("user", userDetails.time)

  const data = userExpensesArray
  
  const handelOnClick = () =>{
      setPopUpOpen(!isPopUpOpen)
  }

  const {dateFormated} = getFullDate()
  var totalSaved = 0
  var totalSpent  = 0
  console.log(isTimeToShowReport)


     //after once a user saw his report we will delete the thr expenses details for that month or week
     //after showig the report then we'll delelte tbe data
     //if it is time then show the weekly and monthly report 
     //we will use a seprate page like a pop notification 

      useEffect(() =>{
        if(!isTimeToShowReport && userExpensesArray.length > 0){
          console.log("Just checking if it works")
          console.log("the array i wanna use:", userExpensesArray)
          for(let i = 0; i < userExpensesArray.length  ; i++){
            totalSpent = totalSpent + parseInt(userExpensesArray[i].saved)
            totalSaved = totalSaved + parseInt(userExpensesArray[i].spent)
          }
        const update = async () =>{
          const userDetailsArrayRef = doc(db, "details", user.uid);
          await updateDoc(userDetailsArrayRef, {
            previousData: arrayUnion({
              createdAt: dateFormated,
              totalSaved,
              totalSpent,
              expensesperDay: {
               dailySpentMOney:  userDetails.dailySpentMoney,
                timeGoal:   userDetails.time,
                dateAtCreated: userDetails.date
              },
              userExpensesArrayforGrap: userExpensesArray

            })

          });

          // after stroring all daily spent money array in previous data array  
          await updateDoc(userDetailsArrayRef, {
            dailySpentMoney: []

          })
        }
         user.uid && update()
    }}, [])

    
    // previous data 
    const prevDataArray = userDetails.previousData || []
    const len = prevDataArray.length
    const latestData =  prevDataArray[len - 1]


  return (
    <section>
       {!isTimeToShowReport && <ReportScreen prevExpensesArray={latestData}/>}
       {!isTimeToShowReport  && <div className={styles.black}/> }
          <div className={styles.details}>
            <div className={styles.detailsBox}>
              {loadState && <button onClick={handelOnClick} className={styles.addBtn}>Add<AddBoxSharpIcon/></button> }
              {!loadState && <LDComponent/>}
            </div>
          </div>
       <h1 className={styles.h1}>Expense Tracker</h1>
      <div className={styles.container}>

       {isPopUpOpen && <PopUp currentUser={user} currentUserDetails={userDetails} closeOrOpen={handelOnClick} /> }
       {isPopUpOpen && <div className={styles.black}/> }
       <div className={styles.userMenu}>
            <div className={styles.UserInfo}>
             <div className={styles.pfp}>
                 <Image width={160} height={160} alt='Profile-logo' src={"/profile.svg"}/>
               </div>
               <div className={styles.about}>
                   <p className={styles.p}><span><InsertEmoticonIcon/></span>: {user.displayName}</p>
                   <p className={styles.p}><span><MailIcon/></span>: {user.email}</p>
                
               </div>
               <div className={styles.signOutDiv}>
               <button className={styles.btn} onClick={ async () =>{
                     await signOut(auth).then(() => {
                             console.log("Sign-out successful.")
                             router.push("/login")
                         }).catch((error) => {
                           console.log(error)
                         });
                 }} >Sign Out</button>
               </div>
          </div>
       </div>


       <div className={styles.graphAndDetails}>
           <div className={styles.graph}>
               <p className={styles.p}>Graph</p>
               <ResponsiveContainer width="100%" height="100%">
             <AreaChart
               width={500}
               height={450}
               data={data}
               margin={{
                 top: 10,
                 right: 30,
                 left: 0,
                }}>
          <CartesianGrid strokeDasharray="3 2" />
          <XAxis dataKey="name" />
          <YAxis dataKey="spent" />
          <Tooltip />
          <Area type="monotone" dataKey="spent" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
         </ResponsiveContainer>
            </div>
        
        </div>
        <div className={styles.prevDataSection}>
        <h1 className={styles.prevtitle}>Previous Data</h1>
          <div className={styles.prevDataList}>
              {prevDataArray && prevDataArray.map(data =>{
              if(userDetails.time == monthly){
                return <List 
                createdDated={data.userDetails.date || null}
                title={"Monthly"}
                saved={data.totalSaved}
                spent={data.totalSpent}
                date={data.createdAt}/>
              }
              if(userDetails.time == weekly){
                return <List 
                createdDated={data.expensesperDay.date || null}
                title={"Weekly"}
                saved={data.totalSaved}
                spent={data.totalSpent}
                date={data.createdAt}/>
              }
           
            })}
          </div>
        </div>
    </div>
    </section>
  )
}

export default DetailsSection