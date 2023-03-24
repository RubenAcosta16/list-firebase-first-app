import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import AuthProvider from "../components/authProvider";
import DashBoardWrapper from "../components/dashboardWrapper";

import {
  getLinks,
  insertNewLink,
  uptdatelink,
  deleteLink,
} from "../firebase/firebase";

import Link from "../components/Link";

import style from "./css/dashBoardView.module.css";
import styleLinks from "../components/css/link.module.css";

const DashBoarfView = () => {
  const navigate = useNavigate();
  const inputTitle=useRef();
  const inputUrl=useRef();

  const [currentUser, setcurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  // como ya esta logeado de una vez cargar todo
  async function handleUserLoggedIn(user) {
    // navigate("/dashboard");
    setcurrentUser(user);

    setState(2);

    const resLinks = await getLinks(user.uid);

    console.log(resLinks)

    setLinks([...resLinks]);
  }
  console.log(links)
  // console.log(currentUser)
  function handleUserNotRegistered(user) {
    navigate("/login");
    // setcurrentUser(user);
    // setState(3);
  }

  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  if (state === 0) {
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

  function handleOnSubmit(e) {
    e.preventDefault();

    inputTitle.current.value=""
    inputUrl.current.value=""

    addLink();
  }

  function addLink() {
    if (title !== "" && url !== "") {
      const newLink = {
        id: uuidv4(),
        title,
        url,
        uid: currentUser.uid,
      };
      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setTitle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  }

  function handleOnChange(e) {
    const value = e.target.value;
    if (e.target.name === "title") {
      setTitle(value);
    }
    if (e.target.name === "url") {
      setUrl(value);
    }
  }

  async function handleDeleteLink(docId) {
    // console.log("de")
    await deleteLink(docId);
    const tmp = links.filter((link) => link.docId !== docId);

    setLinks([...tmp]);
  }

  async function handleUpdateLink(docId, title, url) {
    // console.log(docId,title,url)
    // console.log(links)
    const link = links.find((item) => item.docId === docId);
    console.log(link);
    link.title = title;
    link.url = url;

    console.log(link)

    await uptdatelink(docId, link);
  }

  // console.log(links[0]?.docId)

  console.log(links.docId)
  return (
    <DashBoardWrapper>
      <div>
        <h1>Dashboard</h1>

        <form
          className={style.entryContainer}
          action=""
          onSubmit={handleOnSubmit}
        >
          <label htmlFor="title">Title</label>
          <input
           ref={inputTitle}
            className="input"
            type="text"
            name="title"
            onChange={handleOnChange}
          />

          <label htmlFor="url">Url</label>
          <input
           ref={inputUrl}
            className="input"
            type="text"
            name="url"
            onChange={handleOnChange}
          />

          <input className="btn" type="submit" value="Create new link" />
        </form>

        <div className={styleLinks.linksContainer}>
          {links?.map((link) => (
            // <div key={link.id}><a href={link.url}>{link.title}</a></div>
            <Link
              key={link.id}
              docId={link.docId}
              url={link.url}
              title={link.title}
              onDelete={handleDeleteLink}
              onUpdate={handleUpdateLink}
            />
          ))}
        </div>
      </div>
    </DashBoardWrapper>
  );
};

export default DashBoarfView;

// 1:44:43
// libreria para instalar id unico

// 1:47:41
