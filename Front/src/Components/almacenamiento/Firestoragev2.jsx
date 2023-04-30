import React from "react";
import { useState, useEffect } from "react";
import { storage, /* app, */ db } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { v4 } from "uuid";
import styles from "./FireStorage.module.css";
import Swal from "sweetalert2";

const FireStorage = ({ visible, url, name }) => {
  const [fileupload, setFileupload] = useState(null);
  const [fileList, setFileList] = useState("");
  // const [document, setDocument] = useState([]);
  console.log(name);

  console.log(fileupload);

  const upload = async (e) => {
    setFileupload(e.target.files[0]);
    const archivo = e.target.files[0];
    console.log(archivo);
    if (archivo === null) return;
    console.log("ifnull");
    if (archivo.type === "image/jpeg") {
      console.log("if2");
      const fileRef = ref(storage, `Image/${archivo.name}`);
      const respuesta = await uploadBytes(fileRef, archivo);

      if (respuesta) return console.log("logrado", fileRef);
    }
    if (
      archivo.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const fileRef = ref(storage, `Words/${archivo.name + v4()}`);
      const respuesta = await uploadBytes(fileRef, archivo);
      if (respuesta) return console.log("logrado", fileRef);
    }
    if (archivo.type === "application/pdf") {
      console.log("ifpDF");
      const fileRef = ref(storage, `PDF/${archivo.name + v4()}`);
      const respuesta = await uploadBytes(fileRef, archivo).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (url) => {
          setFileList((prev) => [...prev, url]);
        });
      });
      console.log(respuesta, "hechoderecho");
    }
    if (archivo.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      console.log("ifEXCEL");
      const fileRef = ref(storage, `Excel/${archivo.name}`);
      const respuesta = await uploadBytes(fileRef, archivo).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (url) => {
          setFileList((prev) => [...prev, url]);
        });
      });
      console.log(respuesta, "hechoexelecho");
    } else {
      console.log("else");
      console.log(archivo.type);
    }
    console.log("terminatodo");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const nombreArchivo = e.target.nombre.value;
    if (!nombreArchivo) {
      Swal.fire({
        text: "Porfavor, introduza un nombre",
        icon: "warning",
      });
      return;
    }
    const filRef = doc(db, "archivos", nombreArchivo);
    await setDoc(filRef, { nombre: nombreArchivo, url: fileList, verifyname: name });
    console.log("User document created in Firestore:", fileupload.name);
    //!una vez arreglado el tema de que al hacer f5 se te deslogue, esto se agrega
    //!para que automaticamente te devuelva a la url en la que estes y asi se pueda ver el archivo
    // window.location = url.pathname;
  };

  // useEffect(() => {
  //   async function documentos() {
  //     const documentlist = await getDocs(collection(db, "archivos"));
  //     setDocument(documentlist.docs.map((doc) => doc.data()));
  //     console.log(documentlist.docs.map((doc) => doc.data()));
  //   }
  //   documentos();
  // }, []);

  function verify() {}

  return (
    <>
      <form onSubmit={submitHandler} className={visible === true ? styles.form : styles.none}>
        <input type="file" onChange={upload} className={styles.input} />
        <input type="text" name="nombre" placeholder="nombra tu archivo" className={styles.input} />
        <button className={styles.button}>Enviar </button>
      </form>
      {/* <div>
        {document.map((e, index) => {
          return (
            <a
              key={index}
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.documentList}
            >
              {e.nombre !== undefined ? e.nombre : "HOLa"}
            </a>
          );
        })}
      </div> */}
    </>
  );
};

export default FireStorage;
