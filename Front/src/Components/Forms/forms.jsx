import "./form.css";

import { useState } from "react";

function Form() {
  //Estados

  const [studentData, setStudentData] = useState({
    name: "",
    lastname: "",
    email: "",
    age: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    lastname: "",
    email: "",
    age: "",
  });

  const inputHandler = (ev) => {
    let value = ev.target.value;
    switch (ev.target.placeholder) {
      case "Name":
        setStudentData({ ...studentData, name: value });

        //validaciones
        if (/\d/.test(studentData.name))
          return setErrorMessage({
            ...errorMessage,
            name: "The name must not include numbers!",
          });
        if (studentData.name.length > 35)
          return setErrorMessage({
            ...errorMessage,
            name: "The length of the name must be less than 35 characters",
          });
        setErrorMessage({ ...errorMessage, name: "" });

        break;

      case "Last name":
        setStudentData({ ...studentData, lastname: value });

        //validaciones
        if (/\d/.test(studentData.lastname))
          return setErrorMessage({
            ...errorMessage,
            lastname: "The last name must not include numbers!",
          });
        if (studentData.lastname.length > 35)
          return setErrorMessage({
            ...errorMessage,
            lastname:
              "The length of the last name must be less than 35 characters",
          });
        setErrorMessage({ ...errorMessage, lastname: "" });

        break;
      case "Email":
        setStudentData({ ...studentData, email: value });

        //validaciones
        if (!/\S+@\S+\.\S+/.test(studentData.email))
          return setErrorMessage({
            ...errorMessage,
            email: "The email you entered is incorrect",
          });
        if (studentData.email.length > 35)
          return setErrorMessage({
            ...errorMessage,
            email: "The email exceeded the 35 available characters",
          });
        setErrorMessage({ ...errorMessage, email: "" });

        break;
      case "Age":
        setStudentData({ ...studentData, age: value });

        //validaciones
        if (studentData.age < 0)
          return setErrorMessage({
            ...errorMessage,
            age: "Age cannot be negative",
          });
        if (!/^[0-9]+$/.test(studentData.age))
          return setErrorMessage({
            ...errorMessage,
            age: "Please only enter numeric characters for the age!",
          });
        setErrorMessage({ ...errorMessage, age: "" });
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="Main">
        <div className="formBox">
          <h1 className="formTitle">Form</h1>

          <form>
            <input type="text" placeholder="Name" onChange={inputHandler} />
            <p className="errorText">{errorMessage.name}</p>

            <input
              type="text"
              placeholder="Last name"
              onChange={inputHandler}
            />
            <p className="errorText">{errorMessage.lastname}</p>

            <input type="text" placeholder="Email" onChange={inputHandler} />
            <p className="errorText">{errorMessage.email}</p>

            <input type="text" placeholder="Age" onChange={inputHandler} />
            <p className="errorText">{errorMessage.age}</p>

            <div>
              <select>
                <option>Courses</option>
                <option>1ero</option>
                <option>2do</option>
                <option>3ero</option>
              </select>
            </div>
            <p className="errorText">mensaje error</p>

            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
