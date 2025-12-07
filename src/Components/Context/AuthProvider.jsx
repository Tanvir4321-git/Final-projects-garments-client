import React, { useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,  } from 'firebase/auth';

import { Authcontext } from './Authcontext';
import { auth } from '../FirebaseConfiq';


const Goggleprovider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {

const [user,setuser]=useState()
const [loading,setloading]=useState(true)


    // Register
    const registerUser=(email,password)=>{
        setloading(true)
      return createUserWithEmailAndPassword(auth,email,password)
    }

// login 
const login = (email,password)=>{
    setloading(true)
    return signInWithEmailAndPassword(auth, email, password)
}

//goggle log in
const GoglleLogin=()=>{
    setloading(true)
 return   signInWithPopup(auth, Goggleprovider)
}
 // logout
 const logOut=()=>{
    setloading(true)
     return signOut(auth)

 }
 //update profiel
 const profileUpdate=(profile)=>{
   return updateProfile(auth.currentUser,profile)
   
 }


// current User
useEffect(()=>{
   const unsubscribe= onAuthStateChanged(auth ,(currentUser)=>{
      setuser(currentUser)
      setloading(false)
    })
    return()=>{
        unsubscribe()
    }
},[])


const authInfo={
registerUser,
login,
 GoglleLogin,
 logOut,
 user,setuser,
 loading,setloading,
 profileUpdate
}

    return (
        <Authcontext value={authInfo}>{children}</Authcontext>
    );
};

export default AuthProvider;