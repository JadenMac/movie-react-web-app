import * as client from "../users/client";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { setCurrentUser } from "../users/reducer";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const dispatch = useDispatch();
  // const { currentUser } = useSelector((state) => state.usersReducer);
  // console.log(currentUser)
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/login");
  };

  const navigate = useNavigate();
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const save = async () => {
    await client.updateUser(account);
  };

  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }

  }, []);

  console.log(account);

  return (
    <div className="w-50 container">
      <h1>Account</h1>

      {!account && (
    <div className="">
      <div className="">
        <h5 className="">Cannot Access</h5>
      </div>
      <div className="">
        <p>Please sign in or register in order to access this content.</p>
      </div>
      <div className="">
      <Link to="../login"> 
        <button type="button" className="btn btn-primary m-2">Sign in</button>
        </Link>
        <Link to="../register"> 
        <button type="button" className="btn btn-secondary m-2"> Register</button>
        </Link>
      </div>
    </div>
)}

      {account && ( 
        <div>
          <div>
          {"User: " + account.username}
          </div>

          {!id && (
<>
          <label for="editPassInput">Password</label>
          <input value={account.password}
          className="form-control"
          id="editPassInput"
          type="password"
            onChange={(e) => setAccount({ ...account,
              password: e.target.value })}/>

<label for="editFirstNameInput">First Name</label>
          <input value={account.firstName}
          className="form-control"
          id="editFirstNameInput"
            onChange={(e) => setAccount({ ...account,
              firstName: e.target.value })}/>

<label for="editLasttNameInput">Last Name</label>
          <input value={account.lastName}
          className="form-control"
          id="editLasttNameInput"
            onChange={(e) => setAccount({ ...account,
              lastName: e.target.value })}/>

<label for="editDOBInput">Date of Birth</label>
          <input value={account.dob}
          className="form-control"
          id="editDOBInput"
            onChange={(e) => setAccount({ ...account,
              dob: e.target.value })}/>

<label for="editEmailInput">Email</label>
          <input value={account.email}
          className="form-control"
          id="editEmailInput"
            onChange={(e) => setAccount({ ...account,
              email: e.target.value })}/>

<label for="editUserTypeInput">User Type</label>
          <select 
          className="form-select"
          id="editUserTypeInput"
          onChange={(e) => setAccount({ ...account,
              role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button className="btn btn-md btn-primary w-50" onClick={save}>
     Save
  </button>
  <button className="btn btn-md btn-danger w-50" onClick={signout}>
    Signout
  </button>
  </>
  )

          }

  <Link to="/admin/users" className="btn btn-warning w-100">
    Users
  </Link>
        </div>
      )}
    </div>
  );
}
export default Profile;