import '@/styles/globals.css'

import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {  UserProvider } from '@/context/CurrentUserContext'
import { auth, db } from '@/database/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'


export default function App({ Component, pageProps }) {

  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }

const router = useRouter()

  
  useEffect(() =>{
    const unsub =   onAuthStateChanged(auth, async (user) =>{
      if(user){
          const snap = await getDoc(doc(db, "users", user.uid))
          if(snap.exists){
              router.push("/home/dashboard/insight")
              console.log("first")
          }else{
            router.push("/")

          }

          
         
      }else{
        router.push("/")
      }
     
})
return () => {
 unsub()
}

  }, [])
  
   
        // if(currentUser){
        //   router.push("/home/dashboard")
        
        // }else{
        //   router.push("/login")
      
        // }
    

  


  return(

  <Provider store={store}>
  <UserProvider>
  <Component {...pageProps} />
  </UserProvider> 
  </Provider>)

}
