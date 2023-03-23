import { useRef, useState, useEffect } from "react";

import style from './css/link.module.css'

const Link = ({ docId, title, url, onDelete, onUpdate }) => {
  // para saber el dato actual para cambiar
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);

  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  const titleRef = useRef(null);
  const urlRef = useRef(null);

  //   todo esto es para que puedas escribir sin tener que dar otro click, osea ya esta enfocado
  // osea le agrega el focus y ya al input
  // y para ver si pierde el focus el input se usa onBlur, y aqui se ejecutan cosas como actualizar
  useEffect(() => {
    // si existe la referencia
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [editTitle]);

  useEffect(() => {
    // si existe la referencia
    if (editUrl.current) {
      urlRef.current.focus();
    }
  }, [editUrl]);

  // es true para cuando sea asi hacer una interfaz diferente
  function handleEditTitle() {
    setEditTitle(true);
  }

  function handleEditUrl() {
    setEditUrl(true);
  }

  function handleChangeTitle(e) {
    setCurrentTitle(e.target.value);
  }

  function handleChangeUrl(e) {
    setCurrentUrl(e.target.value);
  }

  function handleBlurTitle(e) {
    setEditTitle(false);
    onUpdate(docId, currentTitle, currentUrl);
  }

  function handleBlurUrl(e) {
    setEditUrl(false);
    onUpdate(docId, currentTitle, currentUrl);
  }

  function handleDelete() {
    onDelete(docId);
  }
  // console.log(docId, title)

  // console.log(docId)

  return (
    <div className={style.link}>
      <div className={style.linkInfo}>
        <div className={style.linkTitle}>
          {editTitle ? (
            <>
              {/* el onBlur se ejcuta cuando pierde el focus */}
              <input
                ref={titleRef}
                value={currentTitle}
                onChange={handleChangeTitle}
                onBlur={handleBlurTitle}
              />
            </>
          ) : (
            <>
              <button className={style.btnEdit} onClick={handleEditTitle}> <span className="material-icons">edit</span></button>

              {currentTitle}
            </>
          )}
        </div>

        <div className={style.linkUrl}>
          {editUrl ? (
            <>
              <input
                ref={urlRef}
                value={currentUrl}
                onChange={handleChangeUrl}
                onBlur={handleBlurUrl}
              />
            </>
          ) : (
            <>
              <button className={style.btnEdit} onClick={handleEditUrl}> <span className="material-icons">edit</span></button>
              {currentUrl}
            </>
          )}
        </div>

      </div>
        <div className={style.linkActions}>
          <button className={style.btnDelete} onClick={handleDelete}><span className="material-icons">delete</span></button>
        </div>
    </div>
  );
};

export default Link;
