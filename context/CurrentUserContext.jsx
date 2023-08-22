const { createContext, useEffect, useState } = require("react");

import { auth, db } from "@/database/firebase";
import { ThemeContext } from "@emotion/react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export const UserContext = createContext()

const currentDates = new Date()
const currentDate = currentDates.getDate();
const currentYear = currentDates.getFullYear();
const currentMonth = currentDates.getMonth();
const humanReadableMonth = currentMonth + 1;
const dateFormated = `${currentDate}/${humanReadableMonth}/${currentYear}`
const dateFormatedTesting = `${currentDate}/${humanReadableMonth}/${currentYear}`


export const UserProvider = ({children}) =>{
    let len = 0 
    const [currentUser , setCurrentUser] = useState({})
    const [currentUserDetails , setCurrentUserDetails] = useState({})
    const [loading , setloading] = useState(false)
    const [isLogedIn, setIsLogedIn] = useState(false)
    const [userArray, setUserArray] = useState([])
    const [isToadyNewDateToSetNewExpenses , setIsToadyNewDateToSetNewExpenses] = useState(true)
    const [isItTimeShowReportWeeklyMonthly , setIsItTimeShowReportWeeklyMonthly] = useState(true)

    useEffect(() => {
        const unsub =   onAuthStateChanged(auth, async (user) =>{
                if(user){
                    // router.push("/home/dashboard/insight")
                    const snap = await getDoc(doc(db, "users", user.uid))
                    if(snap.exists){
                        setCurrentUser(snap.data())
                    }
                    const snap2 = await getDoc(doc(db, "details", user.uid))
                    if(snap2.exists){

           
                       if(snap2.data() != undefined){
                        setloading(!loading)
                        setCurrentUserDetails(snap2.data())
                        
                        if(snap2.data().dailySpentMoney.length != 0 ){
                         len = snap2.data().dailySpentMoney.length - 1
                        }
                        let isEmpty = true;
                        const obj = snap2.data().dailySpentMoney[0]
                        for (const key in obj) {
                                isEmpty = false;
                                break; // Exit loop as soon as a key is found
                            }
                        if(len >= 0 && !isEmpty){
                   
                        const prevDate =  snap2.data().dailySpentMoney[len].date
                        const dateCreatedAt = snap2.data().date
                        const long = snap2.data().time

                        /* 
                        TODO:
                    
                        */

                        if(dateFormated == prevDate){
                            setIsToadyNewDateToSetNewExpenses(!isToadyNewDateToSetNewExpenses)
                        }
                        const targetDateFormated = `${long + dateCreatedAt}/${humanReadableMonth}/${currentYear}`
                        if(dateFormated == targetDateFormated){
                            setIsItTimeShowReportWeeklyMonthly(!isItTimeShowReportWeeklyMonthly)
                        }
                       
                            const newAr = snap2.data().dailySpentMoney.map((d) =>{
                                return {
                                    name: d.date,
                                    spent: d.amountSpent,
                                    saved: d.amountSaved
                                }
                            })

                            setUserArray(newAr)}
                       }  
                    }
                }
               
        })
       return () => {
           unsub()
       }
   }, [])



                return (
                <UserContext.Provider
                    value={{currentUser,
                            currentUserDetails, 
                            loading, 
                            isLogedIn, 
                            userArray,
                            isItTimeShowReportWeeklyMonthly,
                            isToadyNewDateToSetNewExpenses
                            }}>
                {children}
                </UserContext.Provider>)
}