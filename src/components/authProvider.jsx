// import { useEffect, useState } from "react";

// import {
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithPopup,
// } from "firebase/auth";
// import { auth, userExists } from "../firebase/firebase";

import { useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExists,
} from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const authProvider = ({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // setCurrentState(1)
  //   // el 2do parametro es un callback, creo que algo que devuelve
  //   onAuthStateChanged(auth, async (user) => {

  //     if (user) {
  //       const isRegistered = await userExists(user.uid);
  //       if (isRegistered) {
  //         //TODO  redirigir a dashboard
  //         // solo se pone la ruta y ya
  //         onUserLoggedIn(user);
  //       } else {
  //         //TODO redirigir a choose username
  //         onUserNotRegistered(user);
  //       }
  //     } else {
  //       onUserNotLoggedIn();
  //     }
  //   });
  // }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // hasta aqui es si solo sie estamos logeados, pero no si nuestro usuario esta
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          const userInfo = await getUserInfo(user.uid);
          if (userInfo.processCompleted) {
            onUserLoggedIn(userInfo);
          } else {
            onUserNotRegistered(userInfo);
          }
          //TODO redirigir a dashboard
        } else {
          //TODO redirigir a choose-username
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            // vacio por ahora porque se define aun
            profilePicture: "",
            username: "",
            processCompleted: false,
          });
          navigate("/choose-username");
        }

        // console.log(user.displayName)
      } else {
        onUserNotLoggedIn();
        console.log("no hay nadie autenticado");
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);

  return <div>{children}</div>;
};

export default authProvider;

// 1:27:50
