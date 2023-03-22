import { useRef, useState, useEffect } from "react";

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

  return (
    <div>
      <div>
        <div>
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
              <button onClick={handleEditTitle}>Edit</button>

              {currentTitle}
            </>
          )}
        </div>

        <div>
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
              <button onClick={handleEditUrl}>Edit</button>
              {currentUrl}
            </>
          )}
        </div>

        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {/* <a href={url}>{title}</a> */}
    </div>
  );
};

export default Link;
