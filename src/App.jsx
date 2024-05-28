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
        element : <ListPage category={'Accommodation'} description={'Find Accomodation around campus'} img={"./Accomodation.jpg"}/>,
        path: '/accomodation'
      },
      {
        element :  <ListPage category={'Service'} description={'Find Service provider around campus'} img={"./Service.png"}/>,
        path: '/service'
      },
      {
        element :  <ListPage category={'Property'} description={'Buy/Sell/Swap properties within campus'} img={"./Trade.jpg"}/>,
        path: '/property'
      },
      {
        element :  <ListPage category={'Roommate'} description={'Find roommate within campus'} img={"./Roommate.jpg"}/>,
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
