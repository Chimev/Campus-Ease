import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"

export const useAuthStatus = () => {

    //we adding two hooks that we would use 
    //this is the defualt state of a user not yet logged in
    const [loggedIn, setLoggedIn] = useState(false);

    //this is the defualt state for a loading effect 
    //it true because we need time to fetch data from the database
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        const auth = getAuth();

        //this gives us the user and check if the user exist or not 
        //onAuthStateChange returns 2 value true and false
        //if exist then we shutdown the loading function
        onAuthStateChanged(auth, (user) => {
            if(user){
                setLoggedIn(true) 
            }
            
            setCheckingStatus(false)
        })
    }, [])

  return {loggedIn, checkingStatus}
}

