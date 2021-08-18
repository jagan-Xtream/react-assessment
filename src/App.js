import { useRef, useState } from "react";
import "./App.css";

function App() {
  const emailRegex = useRef(/\S+@\S+\.\S+/);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [details, setDetails] = useState([]);

  const testRegex = (str) => emailRegex.current.test(str);

  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const element = e.target;
    const value = element.value;
    switch (element.id) {
      case "username":
        setUsername(value);
        setUsernameError("");
        break;
      case "email":
        setEmail(value);
        if (testRegex(value)) setEmailError("");
        break;
      case "password":
        setPassword(value);
        setPasswordError("");
        break;
      default:
        break;
    }
  };

  const handleBlur = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const element = e.target;
    const value = element.value;
    switch (element.id) {
      case "username":
        if (!value) setUsernameError("*username cannot be empty");
        else setUsernameError("");
        break;
      case "email":
        if (!value) setEmailError("*email cannot be empty");
        else {
          if (!testRegex(value)) setEmailError("*Not a valid Email");
          else setEmailError("");
        }
        break;
      case "password":
        if (!value) setPasswordError("*password cannot be empty");
        else setPasswordError("");
        break;
      default:
        break;
    }
  };

  const isFormInValid = () =>
    emailError ||
    usernameError ||
    passwordError ||
    !username ||
    !email ||
    !password;

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFormInValid()) alert("Enter Valid Details");
    else {
      setDetails([...details, { name: username, email: email }]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="login">
          <h1> Log In </h1>
          
          <label for="username"  >
            <p> <b>USER NAME</b> </p>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!usernameError && <p class="error"> {usernameError} </p>}
          </label>
          <label for="email">
            <p> <b>EMAIL ID</b> </p>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!emailError && <p class="error"> {emailError} </p>}
          </label>
          <label for="password">
            <p><b>PASSWORD</b> </p>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {!!passwordError && <p class="error"> {passwordError} </p>}
          </label>
          
          <div>
            <button type="submit" disabled={isFormInValid()} className="sub">
              {" "}
              Submit{" "}
            </button>
          </div>
        </div>
      </form>
      {details.length > 0 && (
        <table class="table">
          <thead>
            <tr>
              <th> name </th>
              <th> email </th>
            </tr>
          </thead>
          <tbody>
            {details.map(({ name, email }) => (
              <tr>
                {" "}
                <td> {name} </td> <td> {email} </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
