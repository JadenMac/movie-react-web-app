import * as client from "../users/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../users/reducer";

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signin = async () => {
    const user = await client.signin(credentials);
    dispatch(setCurrentUser(user));
    navigate("/profile");
  };
  return (
    <div className="container">
      <h1>Sign In</h1>
      <input className="form-control" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
      <input type="password" className="form-control" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
      <button className="btn btn-success" onClick={signin}> Sign In </button>
    </div>
  );
}
export default Login;