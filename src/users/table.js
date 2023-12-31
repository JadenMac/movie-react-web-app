import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import * as client from "./client";
import { BsFillCheckCircleFill, BsTrash3Fill, BsPencil, BsPlusCircleFill }
  from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ username: "", password: "", role: "USER" });
  const { currentUser } = useSelector((state) => state.usersReducer);
  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => { fetchUsers(); }, []);
  return (

    <div>
      <h1>User List</h1>
      {(!currentUser || currentUser?.role !== "ADMIN") && (
        <>
        <div className="">
        <h5 className="">Cannot Access</h5>
      </div>
      <div className="">
        <p>Please sign in as an ADMIN user in order to access this content.</p>
      </div>
      </>
      )}
      {currentUser?.role === "ADMIN" && (
      <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
          <tr>
            
              <td>
              <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
            </td>
            <td>
              <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
              </td>
            <td>
              <input value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })}/>
            </td>
            <td>
              <input value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })}/>
            </td>
            <td>
              <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </td>
            <td>
              <button className="btn">
            <BsFillCheckCircleFill onClick={updateUser}
      className="me-2 text-success fs-1 text" />
      </button>
      <button className="btn">
    <BsPlusCircleFill onClick={createUser}
      className="text-success fs-1 text" />
      </button>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>

              <td>
              <Link to={`/profile/${user._id}`}>
                {user.username} </Link>
                </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td className="text-nowrap"> <button className="btn btn-warning me-2">
      <BsPencil onClick={() => selectUser(user)} />
    </button>
    
    <button className="btn btn-danger me-2">
      <BsTrash3Fill onClick={() => deleteUser(user)} />
    </button></td>
    
            </tr>))}
        </tbody>
      </table>
      </div>
      )}

    </div>
  );
}
export default UserTable;