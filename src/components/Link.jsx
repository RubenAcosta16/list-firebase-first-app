// import { useRef, useState, useEffect } from "react";

// import style from "./css/link.module.css";

// const Link = ({ docId, title, url, onDelete, onUpdate }) => {
//   // para saber el dato actual para cambiar
//   const [currentTitle, setCurrentTitle] = useState(title);
//   const [currentUrl, setCurrentUrl] = useState(url);

//   const [editTitle, setEditTitle] = useState(false);
//   const [editUrl, setEditUrl] = useState(false);

//   const titleRef = useRef(null);
//   const urlRef = useRef(null);

//   //   todo esto es para que puedas escribir sin tener que dar otro click, osea ya esta enfocado
//   // osea le agrega el focus y ya al input
//   // y para ver si pierde el focus el input se usa onBlur, y aqui se ejecutan cosas como actualizar
//   useEffect(() => {
//     // si existe la referencia
//     if (titleRef.current) {
//       titleRef.current.focus();
//     }
//   }, [editTitle]);

//   useEffect(() => {
//     // si existe la referencia
//     if (editUrl.current) {
//       urlRef.current.focus();
//     }
//   }, [editUrl]);

//   // es true para cuando sea asi hacer una interfaz diferente
//   function handleEditTitle() {
//     setEditTitle(true);
//   }



//   function handleChangeTitle(e) {
//     setCurrentTitle(e.target.value);
//   }



//   function handleBlurTitle(e) {
//     setEditTitle(false);
//     onUpdate(docId, currentTitle, currentUrl);

//     console.log(currentTitle)
//   }
// // 


//   function handleEditUrl() {
//     setEditUrl(true);
//   }

//   function handleChangeUrl(e) {
//     setCurrentUrl(e.target.value);
//   }


//   function handleBlurUrl(e) {
//     setEditUrl(false);
//     onUpdate(docId, currentTitle, currentUrl);
//     console.log(currentUrl)
//   }

//   function handleDelete() {
//     onDelete(docId);
//   }
//   // console.log(docId, title)

//   // console.log(docId)

//   return (

//     <div className={style.link}>
//       <div className={style.linkInfo}>
//         <div className={style.linkTitle}>
//           {editTitle ? (
//             <>
//               <input
//                 ref={titleRef}
//                 onBlur={handleBlurTitle}
//                 onChange={handleChangeTitle}
//                 value={currentTitle}
//               />
//             </>
//           ) : (
//             <>
//               <button onClick={handleEditTitle} className={style.btnEdit}>
//                 <span className="material-icons">edit</span>
//               </button>
//               {currentTitle}
//             </>
//           )}
//         </div>
//         <div className={style.linkUrl}>
//           {editUrl ? (
//             <>
//               <input
//                 ref={urlRef}
//                 onBlur={handleBlurUrl}
//                 onChange={handleChangeUrl}
//                 value={currentUrl}
//               />
//             </>
//           ) : (
//             <>
//               <button onClick={handleEditUrl} className={style.btnEdit}>
//                 <span className="material-icons">edit</span>
//               </button>
//               {currentUrl}
//             </>
//           )}
//         </div>
//       </div>
//       <div className={style.linkActions}>
//         <button onClick={handleDelete} className={style.btnDelete}>
//           <span className="material-icons">delete</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Link;


// codigo antiguo


import { useRef, useState, useEffect } from "react";

import style from "./css/link.module.css";

const Link = ({ docId, title, url, onDelete, onUpdate }) => {
  // para saber el dato actual para cambiar
  const [currentTitle, setTitle] = useState(title);
  const [currentUrl, setUrl] = useState(url);

  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  const refTitle = useRef(null);
  const refUrl = useRef(null);

  useEffect(() => {
    if (refTitle.current) {
      refTitle.current.focus();
    }
  }, [editTitle]);

  useEffect(() => {
    if (refUrl.current) {
      refUrl.current.focus();
    }
  }, [editUrl]);

  async function handleRemoveLink() {
    await onDelete(docId);
    // onDeleteLink(docId);
  }

  function handleEditTitle() {
    setEditTitle(true);
  }

  function handleEditUrl() {
    setEditUrl(true);
  }

  function handleOnBlurTitle(e) {
    setEditTitle(false);
    onUpdate(docId, e.target.value, currentUrl);
  }
  function handleOnBlurUrl(e) {
    setEditUrl(false);
    onUpdate(docId, currentTitle, e.target.value);
  }

  function handleOnChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleOnChangeUrl(e) {
    setUrl(e.target.value);
  }

  return (
    <div className={style.link}>
      <div className={style.linkInfo}>
        <div className={style.linkTitle}>
          {editTitle ? (
            <>
              <input
                ref={refTitle}
                onBlur={handleOnBlurTitle}
                onChange={handleOnChangeTitle}
                value={currentTitle}
              />
            </>
          ) : (
            <>
              <button onClick={handleEditTitle} className={style.btnEdit}>
                <span className="material-icons">edit</span>
              </button>
              {currentTitle}
            </>
          )}
        </div>
        <div className={style.linkUrl}>
          {editUrl ? (
            <>
              <input
                ref={refUrl}
                onBlur={handleOnBlurUrl}
                onChange={handleOnChangeUrl}
                value={currentUrl}
              />
            </>
          ) : (
            <>
              <button onClick={handleEditUrl} className={style.btnEdit}>
                <span className="material-icons">edit</span>
              </button>
              {currentUrl}
            </>
          )}
        </div>
      </div>
      <div className={style.linkActions}>
        <button onClick={handleRemoveLink} className={style.btnDelete}>
          <span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
          }
export default Link;
