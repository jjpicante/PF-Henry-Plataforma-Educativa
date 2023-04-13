import "./form.css";

import { useState } from "react";
import { validate, validateSubmit } from "./validations";
import Navbar from "../NavBar/navBar";

function Form() {
  //Estados
  const [studentData, setStudentData] = useState({
    name: "",
    lastname: "",
    email: "",
    age: "",
    course: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    lastname: "",
    email: "",
    age: "",
    course: "",
  });

  const inputHandler = (ev) => {
    setStudentData({
      ...studentData,
      [ev.target.name]: ev.target.value,
    });
    setErrorMessage(
      validate({
        ...studentData,
        [ev.target.name]: ev.target.value,
      })
    );
  };

  const submitHandler = (ev) => {
    ev.preventDefault();

    if (!studentData.course)
      setErrorMessage({
        ...errorMessage,
        course: "You have to choose a course",
      });
    if (validateSubmit(studentData, errorMessage)) {
      alert("The form has been filled successfully");
      console.log(studentData);
    } else {
      alert("Theres been a mistake, take a look a the form");
    }
  };

  const courseHandler = (ev) => {
    setStudentData({ ...studentData, course: ev.target.value });
    setErrorMessage({ ...errorMessage, course: "" });
  };

  return (
    <>
    <Navbar></Navbar>
      <div className="Main">
        <div className="formBox">
          <h1 className="formTitle">Form</h1>

          <form onSubmit={submitHandler} autoComplete="off">
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={inputHandler}
              value={studentData.name}
            />
            <p className="errorText">{errorMessage.name}</p>

            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              onChange={inputHandler}
            />
            <p className="errorText">{errorMessage.lastname}</p>

            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={inputHandler}
            />
            <p className="errorText">{errorMessage.email}</p>

            <input
              type="text"
              name="age"
              placeholder="Age"
              onChange={inputHandler}
            />
            <p className="errorText">{errorMessage.age}</p>

            <div>
              <select onChange={courseHandler}>
                <option value="">Courses</option>
                <option value="1ero">1ero</option>
                <option value="2do">2do</option>
                <option value="3ero">3ero</option>
                <option value="4to">4to</option>
                <option value="5to">5to</option>
                <option value="6to">6to</option>
              </select>
            </div>
            <p className="errorText">{errorMessage.course}</p>

            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
