import React from "react";
import { useState, useEffect } from "react";
import { storage, /* app, */ db } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { v4 } from "uuid";
import styles from "./FireStorage.module.css";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const FireStorage = ({ visible, url, name }) => {
  const [fileupload, setFileupload] = useState(null);
  const [buttonV, setButtonV] = useState(false);
  const [fileList, setFileList] = useState("");
  const locate = useLocation();
  const navigate = useNavigate();
  // const [document, setDocument] = useState([]);
  console.log(fileList);
  console.log(fileupload);

  const upload = async (e) => {
    console.log("entra");
    setFileupload(e.target.files[0]);
    const archivo = e.target.files[0];
    console.log(archivo);
    if (archivo === null) return;
    console.log("ifnull");
    if (archivo.type === "image/jpeg" || archivo.type === "image/png") {
      console.log("if2");
      const fileRef = ref(storage, `imagenes/${archivo.name + v4()}`);
      const respuesta = await uploadBytes(fileRef, archivo).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (url) => {
          console.log(url);
          setFileList((prev) => [...prev, url]);
        });
      });
      console.log(respuesta, "imagene");
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
      console.log(respuesta, "PDF");
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
    setButtonV(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const nombreArchivo = e.target.nombre.value + v4();
    console.log(nombreArchivo);
    let nameDB = locate.pathname === "/miPerfil" ? "imagenes" : "archivos";
    if (!nombreArchivo) {
      Swal.fire({
        text: "Porfavor, introduza un nombre",
        icon: "warning",
      });
      return;
    }
    const veracidad = await query(collection(db, "imagenes"), where("verifyname", "==", name));
    const obtenerveracidad = await getDocs(veracidad);
    const nombre = obtenerveracidad.docs.map((doc) => doc.id);
    console.log(nombre);
    if (nombre.length !== 0) {
      console.log("hola");
      const id = nombre[0];
      console.log(id);
      const ref = await doc(db, "imagenes", id);
      console.log(ref);
      console.log(fileList);
      const response = await updateDoc(ref, {
        nombre: nombreArchivo,
        url: fileList,
        verifyname: name,
      });

      Swal.fire({
        text: "Foto de perfil actualizada",
        icon: "success",
      });
    }
    if (nombre.length === 0) {
      console.log(nameDB);
      const filRef = doc(db, nameDB, nombreArchivo);
      await setDoc(filRef, { nombre: nombreArchivo, url: fileList, verifyname: name });
      if (nameDB === "archivos") return navigate(0);
      console.log("User document created in Firestore:", fileupload.name);
      Swal.fire({
        text: "Tu foto de perfil se a subido con extio",
        icon: "success",
      });
    }
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
        <input
          type="text"
          autocomplete="off"
          name="nombre"
          placeholder="nombra tu archivo"
          className={styles.input}
        />
        <button className={buttonV ? styles.button : styles.disabledButton}>Subir </button>
      </form>
    </>
  );
};

export default FireStorage;
