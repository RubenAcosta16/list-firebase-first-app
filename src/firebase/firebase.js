// // En resumen todo esto es el import para la autenticacion y mas cosas, y abajo hay variables de entorno que saque de firebase

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // tiene que ver con apis de autentificacion
// import { getAuth } from "firebase/auth";
// import {
//   getStorage,
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   getBytes,
// } from "firebase/storage";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   getDocs,
//   doc,
//   getDoc,
//   query,
//   where,
//   setDoc,
//   deleteDoc,
// } from "firebase/firestore";

// // Your web app's Firebase configuration
// // seguridad .env
// const firebaseConfig = {
//   apiKey: "AIzaSyAeIxXK0WD6hAt4werCxox1wO8zju8UaVo",
//   authDomain: "tree-link-app-react-84895.firebaseapp.com",
//   projectId: "tree-link-app-react-84895",
//   storageBucket: "tree-link-app-react-84895.appspot.com",
//   messagingSenderId: "1064410188508",
//   appId: "1:1064410188508:web:fc831f3524d3b0ed258219",
// };
// // const firebaseConfig = {
// //   apiKey: process.env.REACT_APP_APIKEY,
// //   authDomain: process.env.REACT_APP_AUTHDOMAIN,
// //   projectId: process.env.REACT_APP_PROJECTID,
// //   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
// //   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
// //   appId: process.env.REACT_APP_APPID,
// // };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

// export async function userExists(uid) {
//   // busca
//   // database, coleccion "users", el documento
//   const docsRef = doc(db, "users", uid);

//   const res = await getDoc(docsRef);

//   console.log(res);
//   // devuelve 3 cosas, usamos exist
//   return res.exists();
// }

// // export async function existUsername(username) {
// //   const users = [];
// //   // nombre coleccion,cosa a buscar documento creo
// //   const docsRef = collection(db, "users");
// //   // el string de "==" es que busque una igualdad
// //   const q = query(docsRef, where("username", "==", username));

// //   const querySnapshot = await getDocs(q);

// //   querySnapshot.forEach((doc) => {
// //     users.push(doc.data());
// //   });

// //   return users.length > 0 ? users[0].uid : null;
// // }

// .----------------------------------------------------------
// setDoc registra usuarios

import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeIxXK0WD6hAt4werCxox1wO8zju8UaVo",
  authDomain: "tree-link-app-react-84895.firebaseapp.com",
  projectId: "tree-link-app-react-84895",
  storageBucket: "tree-link-app-react-84895.appspot.com",
  messagingSenderId: "1064410188508",
  appId: "1:1064410188508:web:fc831f3524d3b0ed258219",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// uid es el id del usuario, junto con display name y eso, google ya se lo puso a la cuenta desde antes, no nosotros, y lo usaremos

// para ver si existe el usuario, osea una vez que nos logeamos, si existe pues carga todo, sino nos deja hacer uno

// devolvera true o false
export async function userExists(uid) {
  // donde queremos buscar la refetencia, mandar llamar funcion que busca referencia
  // cuando buscas en un documento que ya sabes
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);

  // console.log(res);
  // devuelve si existe o no
  return res.exists();
}

export async function existsUsername(username) {
  // console.log(username)
  const users = [];
  // cuando buscas en varios documentos donde no sabes
  const docsRef = collection(db, "users");
  const q = query(collection(db, "users"), where("userName", "==", username));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  // console.log(users)

  return users.length > 0 ? users[0].uid : null;
}

// export async function existsUsername(username) {
//   const users = [];
//   const q = query(collection(db, "users"), where("username", "==", username));

//   const querySnapshot = await getDocs(q);

//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//     users.push(doc.data());
//   });
//   return users.length > 0 ? users[0].uid : null;
// }

export async function registerNewUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);

    // cuando no importa como se va llamar el objeto usa addDoc
    await setDoc(docRef, user);
  } catch (error) {}
}

export async function updateUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);

    // cuando no importa como se va llamar el objeto usa addDoc
    await setDoc(docRef, user);
  } catch (error) {}
}

export async function getUserInfo(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {}
}

export async function insertNewLink(link) {
  try {
    // para enviar datos, docRef recibe la coleccion creo y res envia los datos
    const docRef = collection(db, "links");
    // creo que envia los datos
    const res = await addDoc(docRef, link);
    return res;
  } catch (error) {
    console.log(error);
  }
}

// para cargar los links cuando carga la pagina en el dashboard
export async function getLinks(uid) {
  const links = [];
  try {
    const collectionRef = collection(db, "links");
    const q = query(collectionRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const link = { ...doc.data() };
      link.docId = doc.id;
      links.push(link);
    });

    return links;
  } catch (error) {
    console.log(error);
  }
}

export async function uptdatelink(docId, link) {
  try {
    const docRef = doc(db, "links", docId);
    const res = await setDoc(docRef, link);
    return res;
  } catch (error) {
    console.log(error);
  }
}

// creo que docRef, osea doc solo busca, y ya haces con eso despues lo que sea

export async function deleteLink(docId) {
  try {
    const docRef = doc(db, "links", docId);
    const res = await deleteDoc(docRef);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function setUserProfilePhoto(uid, file) {
  try {
    const imageRef = ref(storage, `images/${uid}`);
    const resUpload = await uploadBytes(imageRef, file);

    return resUpload;
  } catch (error) {
    console.log(error);
  }
}

export async function getProfilePhotoUrl(profilePicture) {
  try {
    const imageRef = ref(storage, profilePicture);

    const url = await getDownloadURL(imageRef);

    return url;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserPublicProfileInfo(uid) {
  const profileInfo = await getUserInfo(uid);

  const linksInfo = await getLinks(uid);

  return {
    profileInfo: profileInfo,
    linksInfo: linksInfo,
  };
}

export async function logout() {
  await auth.signOut();
}

