import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { initializeApp } from "firebase/app";

// Replace this with your own Firebase config
// The one below was the example from the course
const firebaseConfig = {
  apiKey: "AIzaSyBNQuE3=cEx4s3hfu9s-F11pXCeJlJL13o",
  authDomain: "full-stack-react-934cb.firebaseapp.com",
  projectId: "full-stack-react-934cd.appspot.com",
  storageBucket: "full-stack-react-934cb.appspot.com",
  messagingSenderId: "710941682797",
  appId: "1:710941682797"
};

const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
