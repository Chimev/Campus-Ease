import { NavLink , Outlet, useNavigate } from "react-router-dom"
import "./Profile.scss"
import { getAuth } from "firebase/auth"


const link = ['saved', 'message', 'settings']

const Profile = () => {
    const auth = getAuth()
    const navigate = useNavigate()
    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }
  return (
    <div className="profile-container"> 
        <div className="left">
            <div className="menu">
                {link.map(links => <NavLink to={`/profile/${links}`} key={links} >{links}</NavLink>)}
                <div onClick={onLogout}>Sign Out</div>
            </div>
        </div>

        <div className="right">
            <Outlet/>
        </div>
    </div>
  )
}

export default Profile