// import { useEffect, useState } from "react";

// import {
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithPopup,
// } from "firebase/auth";
// import { auth, userExists } from "../firebase/firebase";

// // sirve para redirigir creo
// import { useNavigate } from "react-router-dom";

// import AuthProvider from "../components/authProvider";

// hay algunas funciones de firebase asi que ni intentes entenderlas, solo copia

import { useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userExists } from "../firebase/firebase";

import { useNavigate } from "react-router-dom";

import AuthProvider from "../components/authProvider";

import style from "./css/loginView.module.css";

const LoginView = () => {
  // // pa redirigir
  // const navigate = useNavigate();

  // // const [currentUser, setCurrentUser] = useState(null)
  // // dependiendo del numero se cambiara la interfaz
  // const [state, setCurrentState] = useState(0);
  // // state0: inicializado
  // // 1:loading
  // // 2:login completo
  // // 3:login sin registro
  // // 4:no hay nadie logeado

  // // es para ver si el usuario esta logeado, se ejecuta al cargar la pagina
  // // useEffect(() => {
  // //     setCurrentState(1)
  // //     // el 2do parametro es un callback, creo que algo que devuelve
  // //     onAuthStateChanged(auth,async (user)=>{
  // //         if (user) {
  // //             const isRegistered=await userExists(user.uid)
  // //             if(isRegistered){
  // //                 //TODO  redirigir a dashboard
  // //                 // solo se pone la ruta y ya
  // //                 navigate("/dashboard")
  // //                 setCurrentState(2)

  // //             }else{
  // //                 //TODO redirigir a choose username
  // //                 navigate("/choose-username")
  // //                 setCurrentState(3)
  // //                 console.log(user.displayName)
  // //             }

  // //         }else{
  // //             setCurrentState(4)
  // //             console.log("No hay nadie autenticado")
  // //         }
  // //     });
  // // }, [navigate])

  // // es para ver si ya estas registrado
  // async function handleUserStateChanged(user) {}

  // async function handleOnClick() {
  //   const googleProvider = new GoogleAuthProvider();

  //   await signInWithGoogle(googleProvider);

  //   async function signInWithGoogle(googleProvider) {
  //     try {
  //       const res = await signInWithPopup(auth, googleProvider);
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

  // // function handleUserLoggedIn(user) {
  // //   navigate("/dashboard");
  // // }

  // // function handleUserNotRegistered(user) {
  // //   navigate("/choose-username");
  // // }

  // // function handleUserNotLoggedIn() {
  // //   setCurrentState(4);
  // // }

  // // if(state==1){
  // //     return <div>Loading...</div>
  // // }
  // // if(state==2){
  // //     return <div>Autenticado y registrado</div>
  // // }
  // // if(state==3){
  // //     return <div>Estas autenticado pero sin registro</div>
  // // }
  // if (state == 4) {
  //   return (
  //     <div>
  //       <button onClick={handleOnClick}>Login With Google</button>
  //     </div>
  //   );
  // }
  // return (
  //   <AuthProvider
  //     onUserLoggedIn={handleUserLoggedIn}
  //     onUserNotRegistered={handleUserNotRegistered}
  //     onUserNotLoggedIn={handleUserNotLoggedIn}
  //   >
  //     <div>Loading...</div>
  //   </AuthProvider>
  // );

  // solo aqui existe user, junto con sus propiedades

  const navigate = useNavigate();

  // const [currentUser, setCurrentUser] = useState(null);

  const [state, setCurrentState] = useState(0);
  // // state0: inicializado
  // // 1:loading
  // // 2:login completo
  // // 3:login sin registro
  // // 4:no hay nadie logeado
  // // 5:existe username
  //  // 6: nuevo username, click para continuar
  //  // 7: username no existe

  // useEffect(() => {
  //   setCurrentState(1);
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       // hasta aqui es si solo sie estamos logeados, pero no si nuestro usuario esta
  //       const isRegistered = await userExists(user.uid);
  //       if (isRegistered) {
  //         //TODO redirigir a dashboard
  //         navigate("/dashboard");
  //         setCurrentState(2);
  //       } else {
  //         //TODO redirigir a choose-username
  //         navigate("/choose-username");
  //         setCurrentState(3);
  //       }

  //       // console.log(user.displayName)
  //     } else {
  //       setCurrentState(4);
  //       console.log("no hay nadie autenticado");
  //     }
  //   });
  // }, [navigate]);

  async function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);

    async function signInWithGoogle(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleUserLoggedIn(user) {
    navigate("/dashboard");
  }

  function handleUserNotRegistered(user) {
    navigate("/choose-username");
  }

  function handleUserNotLoggedIn() {
    setCurrentState(4);
  }

  // // if(state===1){
  // //   return <div>Loading...</div>
  // // }

  // if(state===2){
  //   return <div>Autenticado y registrado</div>
  // }

  // if(state===3){
  //   return <div>Autenticado sin registro</div>
  // }

  if (state === 4) {
    return (
      <div className={style.loginView}>
        <h1>Link Tree</h1>
        <button className={style.provider} onClick={handleOnClick}>Login with Google</button>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Loading...</div>
    </AuthProvider>
  );
};

export default LoginView;
