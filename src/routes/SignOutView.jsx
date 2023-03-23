import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthProvider from '../components/authProvider'

import {logout} from '../firebase/firebase'

const SignOutView = () => {
    useEffect(() => {}, []);
    const navigate = useNavigate();

    async function handleUserLoggedIn(user) {
      await logout();
      navigate("/login");
    }
  
    function handleUserNotRegistered(user) {
      navigate("/login");
    }
  
    function handleUserNotLoggedIn() {
      navigate("/login");
    }


  
    return <AuthProvider
    onUserLoggedIn={handleUserLoggedIn}
    onUserNotRegistered={handleUserNotRegistered}
    onUserNotLoggedIn={handleUserNotLoggedIn}
  ></AuthProvider>
}


export default SignOutView;