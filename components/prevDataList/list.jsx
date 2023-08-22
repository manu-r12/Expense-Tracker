import React from 'react'
import styles from './list.module.css'

const List = ({date, saved, spent, title, createdDated}) => {
  return (
    <div>
        <h2 style={{marginBottom: "10px", color: "rgb(97, 75, 149)"}}>{title}</h2>
        <div className={styles.listComponent}>
            <p>Date : From {createdDated} To {date}</p>
            <p>You Saved:${saved}</p>
            <p>You Spent:${spent}</p>
        </div>
    </div>
   
  )
}

export default List