import {  RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./routes/layout/Layout"
import Homepage from "./routes/homepage/Homepage"
import AboutPage from "./routes/AboutPage/AboutPage";
import SignIn from "./routes/Signin/SignIn";
import ForgotPassword from "./routes/Signin/ForgotPassword";
import SignUp from "./routes/Signin/SignUp";
import Profile from "./routes/Profile/Profile";
import Settings from "./routes/Settings/Settings"
import Saved from "./routes/Saved/Saved"
import Message from "./routes/message/Message";
import { PrivateRoutes } from "./component/PrivateRoutes";
import ListPage from "./routes/listPage/ListPage";
import AddListing from "./component/addListing/AddListing";
import ListingPost from "./routes/listingPost/ListingPost";


const router = createBrowserRouter([
  {
    element : <Layout/>,
    path : '/',
    children : [
      {
        element: <Homepage/>,
        path: '/'
      },
      {
        element: <AboutPage/>,
        path: '/about'
      },
      {
        element: <SignIn/>,
        path: '/sign-in'
      },
      {
        element: <SignUp/>,
        path: '/sign-up'
      },
      {
        element : <ForgotPassword/>,
        path: '/forgot-password'
      },
      {
        element : <ListPage category={'Accommodation'} description={'Find Accomodation around campus'} img={"https://firebasestorage.googleapis.com/v0/b/campusease-4d7fb.appspot.com/o/Website%20Images%2FAccomodation.jpg?alt=media&token=41a56b69-ab46-4eb8-8ce3-081b3eb3ca9e"}/>,
        path: '/accomodation'
      },
      {
        element :  <ListPage category={'Service'} description={'Find Service provider around campus'} img={"https://firebasestorage.googleapis.com/v0/b/campusease-4d7fb.appspot.com/o/Website%20Images%2FService.png?alt=media&token=570bb5b3-46ee-4d05-8b50-662fa02e581e"}/>,
        path: '/service'
      },
      {
        element :  <ListPage category={'Property'} description={'Buy/Sell/Swap properties within campus'} img={"https://firebasestorage.googleapis.com/v0/b/campusease-4d7fb.appspot.com/o/Website%20Images%2FTrade.jpg?alt=media&token=302d5ae4-8a11-4e8c-a011-9823e43de075"}/>,
        path: '/property'
      },
      {
        element :  <ListPage category={'Roommate'} description={'Find roommate within campus'} img={"https://firebasestorage.googleapis.com/v0/b/campusease-4d7fb.appspot.com/o/Website%20Images%2FRoommate.jpg?alt=media&token=467d8e94-50d7-4318-b6e2-b6a90e40419b"}/>,
        path: '/roommate'
      },//check
      {
        path: '/profile',
        element: <PrivateRoutes/>,
        children: [
          {
            element: <Profile/>,
            path: '/profile',
            children: [
              {
                element: <Settings/>,
                path: 'settings'
              },
              {
                element: <Message/>,
                path: 'message'
              },
              {
                element: <Saved/>,
                path: 'saved'
              },
              {
                element: <ListingPost/>,
                path: 'listings'
              }
            ]
          }
        ]
      },
      {
        path: '/add-listing',
        element: <PrivateRoutes/>,
        children: [
          {
            element: <AddListing/>,
            path: '/add-listing'
          }
        ]
      },
    ],
  }
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
