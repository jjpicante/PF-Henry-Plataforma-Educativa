import "./form.css";

import { useState } from "react";
import { validate, validateSubmit } from "./validations";
import Navbar from "../NavBar/navBar";

function FormSubject() {
  //Estados
  const [subjectData, setSubjectData] = useState({
    subjectName: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    subjectName: "",
  });

  const inputHandler = (ev) => {
    setSubjectData({
      ...subjectData,
      [ev.target.name]: ev.target.value,
    });
    setErrorMessage(
      validate({
        ...subjectData,
        [ev.target.name]: ev.target.value,
      })
    );
  };

  const submitHandler = (ev) => {
    ev.preventDefault();

    if (validateSubmit(subjectData, errorMessage)) {
      alert("The form has been filled successfully");
    } else {
      for (const property in subjectData) {
        if (!subjectData[property])
          setErrorMessage({
            ...errorMessage,
            [property]: "This field is required!",
          });
      }
      alert(
        "Theres been a mistake, take a look a the form. **All fields are required!**"
      );
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="Main">
        <div className="formBox">
          <h1 className="formTitle">Add a subject</h1>

          <form onSubmit={submitHandler} autoComplete="off">
            <input
              type="text"
              placeholder="Subject name"
              name="subjectName"
              onChange={inputHandler}
              value={subjectData.subjectName}
            />
            <p className="errorText">{errorMessage.subjectName}</p>

            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default FormSubject;
