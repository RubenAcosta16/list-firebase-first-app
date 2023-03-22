import AuthProvider from "../components/authProvider";

import DashBoardWrapper from "../components/dashboardWrapper";

import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import {
  getProfilePhotoUrl,
  setUserProfilePhoto,
  updateUser,
} from "../firebase/firebase";

const EditProfileView = () => {
  const navigate = useNavigate();
  const [currentUser, setcurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [profileUrl, setProfileUrl] = useState(null);
  const fileRef = useRef();

  async function handleUserLoggedIn(user) {
    console.log(user);
    // console.log(user)
    // navigate("/dashboard");
    setcurrentUser(user);

    // esto es para actualizar la foto de perfil una vez que se inicia sesion efectivamente
    const url = await getProfilePhotoUrl(user.profilePicture);
    setProfileUrl(url);

    setState(2);
  }
  // console.log(currentUser)

  function handleUserNotRegistered(user) {
    navigate("/login");
    // setcurrentUser(user);
    // setState(3);
  }

  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  // lo que hace es ocultar el input type input y cuando le des click al otro boton te ejecuta este
  function handleOpenFilePicker() {
    //si existe
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  async function handleChangeFile(e) {
    // propiedad nueva de input, en vez de value
    // es una areglo
    const files = e.target.files;

    // es para acceder a la info de una archivo
    // parece ser que esta en javascript
    const fileReader = new FileReader();

    // si existe filereader, files tiene algo, y si ese algo tiene una archivo
    if (fileReader && files && files.length > 0) {
      // convierte ese archivo en un blob, creo que en bytes o texto nose
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;
        // ya debe tener la imagen codificada hasta este punto

        const res = await setUserProfilePhoto(currentUser.uid, imageData);
        // console.log(res);

        // si hay una respuesta es porque si logre subir mi imagen
        if (res) {
          const tmpUser = { ...currentUser };
          // es la direccion de donde esta guardada la foto de perfil
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setcurrentUser({ ...tmpUser });

          const url = await getProfilePhotoUrl(currentUser.profilePicture);

          setProfileUrl(url);
        }
      };
    }
  }

  // console.log(currentUser.userName)

  if (state !== 2) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        Loading...
      </AuthProvider>
    );
  }

  return (
    <DashBoardWrapper>
      <div>
        <h2>Edit Profile Info</h2>
        <div>
          <div>
            <img src={profileUrl} alt="" width={300} />
          </div>
          {/* desmadre para elegir la imagen */}
          <div>
            <button onClick={handleOpenFilePicker}>
              Choose new profile picture
            </button>
            <input
              ref={fileRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleChangeFile}
            />
          </div>
        </div>
      </div>
    </DashBoardWrapper>
  );
};

export default EditProfileView;

// 2:40:52
