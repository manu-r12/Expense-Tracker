import React from 'react'
import styles from '../styles/login.module.css'
import Link from 'next/link'
import { Fade } from 'react-reveal'
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/database/firebase';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Login = () => {
    const router = useRouter()
    const handleOnSumbit = async (data) =>{
        data.preventDefault()
        const email = data.target[0].value
        const password = data.target[1].value 
        try{
             await signInWithEmailAndPassword(auth, email , password)
                router.push("/home/dashboard/insight")

        }catch(er){
            console.log(er)
        }
       
    }

  return (

  
     <div className={styles.container}>
   
      {/* <Fade right>
      <Image  className={styles.logo} width={300} height={300} src={"/logo.svg"}/>
      </Fade> */}
    <Fade top>
      <div className={styles.formContainer}>
          <form onSubmit={handleOnSumbit} className={styles.form}>
             <h1 className={styles.loginTItle}>Login</h1>
              <div className={styles.email}>
                <label htmlFor='email'>Email</label>
                <input  className={styles.input} type='email' id='email' />
              </div>
              <div className={styles.password}>
                <label htmlFor='password'>Password</label>
                <input  className={styles.input}  type='password' id='password' />
              </div>
              <button  className={styles.button} type='submit'>Sign in</button>
               <p className={styles.login}>Don't Have An Account?<Link className={styles.linkLogin} href={"/register"}>Register</Link></p>
          </form>

      </div>
      </Fade>
    </div>

  )
}

export default Login