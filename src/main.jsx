import React, { useMemo, createContext, useState } from 'react';
import ReactDOM from "react-dom/client";
import { Flowbite } from 'flowbite-react';

import './styles/main.css'
import Router from './utils/Router.jsx'
import { AuthAPI } from './api/AuthAPI';

export const MySession = createContext();

let user_session = document.cookie.split('; ').find(row => row.startsWith('MEPMLsession=')) || null
user_session = user_session ? JSON.parse(user_session.split('=')[1]) : null

function App() {

  const [session, setSession] = useState( user_session || { 
    user : { 
      name : "null" , 
      email : null, 
      id : null 
    },
    type : null,
    token : null
  })
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
