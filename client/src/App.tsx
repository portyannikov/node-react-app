import React, {FC, useContext, useEffect} from "react";
import { Context } from ".";
import LoginForm from "./components/LoginForm";
import {observer} from 'mobx-react-lite'

const App: FC = () => {

  const {store} = useContext(Context)
  useEffect(() => {
    if(localStorage.getItem('token')){
      store.checkAuth()
    }
  })

  if(!store.isAuth){
    return(
      <LoginForm />
    )
  }

  return (
    <div>
      <h1>{store.isAuth ? `User is authorized ${store.user.email}` : "LOG IN"}</h1>
      <button onClick={() => store.logout()}>Exit</button>
    </div>
  );
}

export default App;
