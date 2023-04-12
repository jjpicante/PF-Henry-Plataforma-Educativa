import "./form.css";

function Form() {
  return (
    <>
      <div className="Main">
        <div className="formBox">
          <h1 className="formTitle">Form</h1>

          <form>
            <div className="nameBox">
              <input type="text" placeholder="Name" />
            </div>
            <p className="errorText">mensaje error</p>

            <div className="nameBox">
              <input type="text" placeholder="Last name" />
            </div>
            <p className="errorText">mensaje error</p>

            <div className="nameBox">
              <input type="text" placeholder="Email" />
            </div>
            <p className="errorText">mensaje error</p>

            <div className="nameBox">
              <input type="text" placeholder="Age" />
            </div>
            <p className="errorText">mensaje error</p>

            <div>
              <select>
                <option>Courses</option>
                <option>1ero</option>
                <option>2do</option>
                <option>3ero</option>
              </select>
            </div>
            <p className="errorText">mensaje error</p>

            <div className="send">
              <input
                className="submitButton"
                type="submit"
                placeholder="Send"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
