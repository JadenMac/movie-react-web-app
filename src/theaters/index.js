import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom"
import * as client from "./client";
import * as usersClient from "../users/client";
import {useSelector } from "react-redux";
import { BsFillCheckCircleFill, BsTrash3Fill, BsPencil, BsPlusCircleFill }
  from "react-icons/bs";
function TheaterTable() {
  const [theaters, setTheaters] = useState([]);
  const [theater, setTheater] = useState({ name: "", address: ""});
  const { currentUser } = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();


  const createTheater = async () => {
    try {
      const newTheater = await client.createTheater(theater);
      setTheaters([newTheater, ...theaters]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTheaters = async () => {
    const theaters = await client.findAllTheaters();
    setTheaters(theaters);
  };

  const selectTheater = async (theater) => {
    try {
      const t = await client.findTheaterById(theater._id);
      setTheater(t);
    } catch (err) {
      console.log(err);
    }
  };
  const updateTheater = async () => {
    try {
      const status = await client.updateTheater(theater);
      setTheaters(theaters.map((t) => (t._id === theater._id ? theater : t)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTheater = async (theater) => {
    try {
      await client.deleteTheater(theater);
      setTheaters(theaters.filter((t) => t._id !== theater._id));
    } catch (err) {
      console.log(err);
    }
  };

  const setAsFavorite = async (theater) => {
    try {
      const updatedUser = {...currentUser, theater: theater._id}
      await usersClient.updateUser(updatedUser);
    } catch (err) {
      console.log(err);
    }

    navigate("/profile");
  };


  useEffect(() => { fetchTheaters(); }, []);
  return (
    <div>
      <h1>Theater List</h1>
      <table className="table">
      {currentUser?.role === "ADMIN" && (
        <thead>

          <tr>
            <th>Theater Name</th>
            <th>Address</th>
          </tr>
          <tr>
            <td>
              <input value={theater.name} onChange={(e) => setTheater({ ...theater, name: e.target.value })}/>
              </td>
              <td>
              <input value={theater.address} onChange={(e) => setTheater({ ...theater, address: e.target.value })}/>
            </td>

    
            <td>
              <button className="btn ">
            <BsFillCheckCircleFill onClick={updateTheater}
      className="me-2 text-success fs-1 text" />
      </button>
      <button className="btn ">
    <BsPlusCircleFill onClick={createTheater}
      className="text-success fs-1 text" />
      </button>
            </td>
          </tr>
        </thead>
      )}
        <tbody>
          {theaters.map((theater) => (
            <tr key={theater._id}>

              <td>
              <Link to={`/profile/${theater._id}`}>
                {theater.name} </Link>
                </td>
              <td>{theater.address}</td>
              <td className="text-nowrap"> 
              <button className="btn btn-success me-2"
              onClick={() => setAsFavorite(theater)}>
      Set as Favorite
    </button>

    {currentUser?.role === "ADMIN" && (<>
              <button className="btn btn-warning me-2">
      <BsPencil onClick={() => selectTheater(theater)} />
    </button>
    
    <button className="btn btn-danger me-2">
      <BsTrash3Fill onClick={() => deleteTheater(theater)} />
    </button>
    </>
    )}</td>
    
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}
export default TheaterTable;