import React from "react";
import { useState, useEffect } from "react";
import { storage, app } from "../../config/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const FireStorage = () => {
  const [fileupload, setFileupload] = useState(null);
  const [fileList, setFileList] = useState([]);

  const fileslist = ref(storage, "PDF/");

  const upload = async () => {
    if (fileupload === null) return;
    if (fileupload.type === "image/jpeg") {
      const fileRef = ref(storage, `Image/${fileupload.name}`);
      const respuesta = await uploadBytes(fileRef, fileupload);

      if (respuesta) return alert("yes, yes, yes image");
    }
    if (
      fileupload.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const fileRef = ref(storage, `Words/${fileupload.name + v4()}`);
      const respuesta = await uploadBytes(fileRef, fileupload);
      if (respuesta) return alert("yes, yes, yes word");
    }
    if (fileupload.type === "application/pdf") {
      console.log(fileupload);
      const fileRef = ref(storage, `PDF/${fileupload.name + v4()}`);
      const respuesta = await uploadBytes(fileRef, fileupload).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (url) => {
          setFileList((prev) => [...prev, url]);
        });
      });
      console.log(respuesta, "hechoderecho");
    } else {
      console.log(fileupload.type);
    }
  };
  //!esto es por si se quiere hacer un form, pero habria que cambiar la config de firebase
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const nombreArchivo = e.target.nombre.value;
  //   const coleccionref = app.firestore().collection("archivos");
  //   const document = coleccionref.doc(nombreArchivo).set({ nombre: nombreArchivo, url: fileList });
  // };

  useEffect(() => {
    listAll(fileslist).then((response) => {
      response.items.forEach((items) => {
        getDownloadURL(items).then((url) => {
          setFileList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          setFileupload(e.target.files[0]);
        }}
      ></input>
      <button onClick={upload}>Upload file</button>
      <hr></hr>
      {fileList.map((e, index) => {
        return (
          <a key={index} href={e} target="_blank" rel="noopener noreferrer">
            {fileupload ? fileupload.name : ""}
          </a>
        );
      })}
      {console.log("hola")}
    </>
  );
};

export default FireStorage;
