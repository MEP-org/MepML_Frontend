import React, { useMemo, createContext, useState } from 'react';
import ReactDOM from "react-dom/client";
import { Flowbite } from 'flowbite-react';

import './styles/main.css'
import Router from './utils/Router.jsx'

export const MySession = createContext();

function App() {

  const sessionObj = JSON.parse(localStorage.getItem("session")) || { 
    user : { name : "null" , email : null, id : null },
    type : null,
    token : null 
  }

  const [session, setSession] = useState(sessionObj)
  const value = useMemo(() => ({ session, setSession }), [session, setSession])

  return (
    <>
      <Flowbite>
        <MySession.Provider value={value}>
          <Router />
        </MySession.Provider>
      </Flowbite>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)
