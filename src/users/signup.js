import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../users/reducer";

function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    try {
      const user = await client.signup(credentials);
      dispatch(setCurrentUser(user));
      navigate("/profile");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="container">
      <h1>Sign Up</h1>
      {error && <div>{error}</div>}
      <input
        value={credentials.username}
        type="text"
        className="form-control"
        onChange={(e) => setCredentials({
          ...credentials,
          username: e.target.value })} />
      <input
        value={credentials.password}
        type="password"
        className="form-control"
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value })} />
      <button className="btn btn-success" onClick={signup}>
        Sign Up
      </button>
    </div>


  );
}
export default Signup;