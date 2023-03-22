import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthProvider from '../components/authProvider'

import {logout} from '../firebase/firebase'

const SignOutView = () => {
    useEffect(() => {}, []);
    const navigate = useNavigate();
  
    return <AuthProvider
    onUserLoggedIn={async () => {
      await logout();
      navigate("/login");
    }}
    onUserNotLoggedIn={() => {
      navigate("/login");
    }}
  ></AuthProvider>
}


export default SignOutView;