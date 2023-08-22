import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Welcome from '@/components/welcoem/wlecome'
import { UserContext, UserProvider } from '@/context/CurrentUserContext'
import { useRouter } from 'next/router'
import { useContext } from 'react'



export default function Home() {


  return (
    <div className={styles.container}>
      <Welcome/>
    </div>
  
  )
}
