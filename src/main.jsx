import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import SchoolContextProvider from "./hooks/Context/SchoolContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SchoolContextProvider>
    <App />
    </SchoolContextProvider>
  </React.StrictMode>,
)
