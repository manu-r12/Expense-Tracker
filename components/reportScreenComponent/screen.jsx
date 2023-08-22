import React, { useEffect, useState } from 'react'
import styles from './screen.module.css'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import LDComponent from '../loadingComponent/ld';



export const ReportScreen = ({weeklyOrMonthly , prevExpensesArray, expnesesdata}) => {

  const [loading, setloading] = useState(true)  
  const [data , setData] = useState({})
 
  useEffect(() =>{
    if(prevExpensesArray){
      setloading(false)
      setData(prevExpensesArray.userExpensesArrayforGrap)
    }else{
      console.log("is there data: " , false)
    }
  
  }, [prevExpensesArray])
 

 
  return (
    <div>
 
  <div className={styles.reportScreen}> 
  <h1 className={styles.reportTitle}> {loading ? <LDComponent className={styles.reportTitle}/> : "Your Report"}</h1>

  {!loading  && <div className={styles.infoContainer}>
 
      <div className={styles.graph}>
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
    <div className={styles.expensesInformation}>
          <div>
            <h3>Created At : {prevExpensesArray.createdAt}</h3>
            {/* <h2>This {prevExpensesArray.expe == "Weekly" ? "Week": "Month"}</h2> */}
            <h3>You Saved : ${prevExpensesArray.totalSaved}</h3>
            <h3>You Spent : ${prevExpensesArray.totalSpent}</h3>
          </div>
    </div>

    </div>}
  </div>
    </div>
   

   
  )
}


