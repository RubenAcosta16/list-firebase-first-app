// import { useNavigate } from "react-router-dom";
// import AuthProvider from "../components/authProvider";
// import { useState } from "react";

import AuthProvider from "../components/authProvider";

import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";
import { existsUsername, updateUser } from "../firebase/firebase";

import style from './css/choose-username.module.css'

const ChooseUsernameView = () => {
  // const navigate = useNavigate();
  // const [state, setState] = useState(0);
  // const [currentUser, setCurrentUser] = useState({})
  // const [username, setUsername] = useState("")

  // function handleUserLoggedIn(user) {
  //   navigate("/dashboard");
  // }

  // function handleUserNotRegistered(user) {
  //   // navigate("/choose-username");
  //   setCurrentUser(user)
  //   setState(3);
  // }

  // function handleUserNotLoggedIn() {
  //   navigate("/login");
  // }

  // if (state == 4) {
  //   return (
  //     <div>
  //       <button onClick={handleOnClick}>Login With Google</button>
  //     </div>
  //   );
  // }

  // function handleInputUsername(e){
  //   setUsername(e.target.value)
  // }

  // function handleContinue(){
  //   if(username!==""){
  //       // const exists=await
  //   }
  // }

  // if (state == 3) {
  //   return <div>
  //       <h1>Bienvenido {currentUser.displayName}</h1>
  //       <p>Para terminar el proceso elige un nombre de usuario</p>
  //       <div>
  //           {/* onInput es igual a onChance */}
  //           <input type="text" onChange={handleInputUsername}/>
  //       </div>
  //       <div>
  //           <button onClick={handleContinue}>Continuar</button>
  //       </div>
  //   </div>;
  // }
  // return (
  //   <AuthProvider
  //     onUserLoggedIn={handleUserLoggedIn}
  //     onUserNotRegistered={handleUserNotRegistered}
  //     onUserNotLoggedIn={handleUserNotLoggedIn}
  //   ></AuthProvider>
  // );
  const navigate = useNavigate();

  const [state, setState] = useState(0);
  const [currentUser, setcurrentUser] = useState({});

  const [userName, setUserName] = useState("");

  function handleUserLoggedIn(user) {
    navigate("/dashboard");
  }

  function handleUserNotRegistered(user) {
    // navigate("/choose-username");
    setcurrentUser(user);
    setState(3);
  }

  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  //
  //

  function handleInputUserName(e) {
    // const tmp=e.target.value.toLowerCase()
    setUserName(e.target.value);
    // console.log(tmp)
    // console.log(userName);
  }

  async function handleContinue() {
    if (userName !== "") {
      console.log(userName);
      const exist = await existsUsername(userName);

      if (exist) {
        setState(5);
      } else {
        const tmp = { ...currentUser };
        // es para que el usuario no vuelva pasar por esta vista
        tmp.userName = userName;
        tmp.processCompleted = true;
        // console.log(userName);

        await updateUser(tmp);
        setState(6);
      }
    }
  }

  if (state === 3 || state === 5) {
    return (
      <div className={style.chooseUsernameContainer}>
        <h1>Bienvenido {currentUser.displayName}</h1>
        <p>Para terminar el proceso elige un nombre de usuario</p>
        {state === 5 ? <p>El nombre de usuario ya existe, escoge otro </p> : ""}

        <div>
          <input type="text" className="input" onChange={handleInputUserName} />
        </div>
        <div>
          <button className="btn" onClick={handleContinue}>Continuar</button>
        </div>
      </div>
    );
  }

  if (state === 6) {
    return (
      <div className={style.chooseUsernameContainer}>
        <h1>Felicidades! ya puedes ir a dashboard para empezar</h1>
        <Link to="/dashboard">Continuar</Link>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    ></AuthProvider>
  );
};

export default ChooseUsernameView;
