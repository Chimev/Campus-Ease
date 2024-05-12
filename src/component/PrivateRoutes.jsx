import { Outlet, Navigate} from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"

export const PrivateRoutes = () => {
    const  {loggedIn, checkingStatus} = useAuthStatus();

    if(checkingStatus){
        return <h3>Loading...</h3>
    }
// checking if the user is logged in to show the children page
//  if user is not logged in; the Navigate will redirect the user to sign in page
  return loggedIn ? <Outlet/> : <Navigate to="/sign-in" />
}


//basically the useAuthStatus compliments this components
//so check between them to know whatsup

