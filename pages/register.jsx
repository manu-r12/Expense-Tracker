
import React, { useContext } from 'react'
import styles from '../styles/register.module.css'
import Fade from 'react-reveal/Fade'
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '@/database/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { UserContext } from '@/context/CurrentUserContext';


const Register = () => {

  const router = useRouter()



  const handleOnSumbit = async (data) =>{
    data.preventDefault()
    const displayName = data.target[0].value
    const email = data.target[1].value
    const password = data.target[2].value
    try{
    const res  = await createUserWithEmailAndPassword(auth, email, password)
        
    await setDoc(doc(db, "users" , res.user.uid),{
      uid: res.user.uid,
      displayName,
      email,
    })    
      router.push("/expense/setGoal")


    }catch(er){
      console.log("Register Error",er)
    }
  
  }


  return (
    <div className={styles.container}>
     <Fade top>
     <Image  className={styles.logo} width={300} height={300} src={"/logo.svg"}/>
    <h1 className={styles.title}>Register Yourself</h1>
      <div className={styles.formContainer}>
          <form onSubmit={handleOnSumbit} className={styles.form}>
              <div className={styles.name}>
                <label htmlFor='name'>Name</label>
                <input className={styles.input}  type='text' id='name' />
              </div>
              <div className={styles.email}>
                <label htmlFor='email'>Email</label>
                <input  className={styles.input} type='email' id='email' />
              </div>
              <div className={styles.password}>
                <label htmlFor='password'>Password</label>
                <input  className={styles.input}  type='password' id='password' />
              </div>
              <button className={styles.button} type='submit'>Register</button>
               <p className={styles.login}>Already an user?<Link className={styles.linkLogin} href={"/login"}>Login</Link></p>
          </form>

      </div>
      </Fade>
    </div>
  )
}

export default Register