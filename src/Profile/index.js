import * as client from "../users/client";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { setCurrentUser } from "../users/reducer";
import { useDispatch, useSelector } from "react-redux";
import * as followsClient from "../follows/client";
import * as theaterClient from "../theaters/client";
import * as reviewsClient from "../reviews/client";
import * as tmdbClient from "../tmdbService";

function Profile() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [following, setFollowing] = useState([]);
  const [followingUser, setFollowingUser] = useState(false);
  const [theater, setTheater] = useState(null);
  const [moviesReviewed, setMoviesReviewed] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.usersReducer);
  // console.log(currentUser);

  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
    
  };

  const userFollows = async (followed_id ) => {
    const userFollowing = await followsClient.findUsersFollowedByUser(currentUser._id);
    if (userFollowing) {
      userFollowing.forEach((follow) => {if (follow.followed._id === account._id) {
        // console.log("current user follows this account");
        setFollowingUser(true);
      }}
      )
    }
  }

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/login");
  };

  const navigate = useNavigate();

  const fetchTheater = async () => {
    if (account && account.theater) {
      try {
        const theater = await theaterClient.findTheaterById(account.theater);
        setTheater(theater);
      }
      catch(error) {
        
      }
    }
    else {
      setTheater(null);
    }
  };

  const fetchAccount = async () => {
    try {
    const account = await client.account();
    setAccount(account);
    if (account) {
      fetchFollowing(account._id);
      fetchTheater();
    }
    }
    catch(error) {

    }
  };

  const fetchFollowing = async (userId) => {
    const following = await followsClient.findUsersFollowedByUser(userId);
    setFollowing(following);
  };

  const followUser = async () => {
    followsClient.createUserFollowsUser(currentUser._id, account._id);
    console.log("followed user")
    setFollowingUser(true);
  };

  const unfollowUser = async () => {
    followsClient.deleteUserFollowsUser(currentUser._id, account._id);
    console.log("unfollowed user")
    setFollowingUser(false);
  };
  

  const save = async () => {
    await client.updateUser(account);
  };



  const fetchMoviesReviewed = async () => {
    try {
    const reviews = await reviewsClient.findMoviesUserReviewed(currentUser._id);
    if (reviews) {
        // console.log(reviews);
        // console.log("adding user info and movie info to review objects");
        for (let i=0; i<reviews.length; i++) {
          const movie = await tmdbClient.fetchMovieById(reviews[i].tmdb_id);
          reviews[i] = movie;
        }
    setMoviesReviewed(reviews);
  }
}
catch(error) {
    console.log(error);
}
}

  useEffect(() => {
    if (id) {
      findUserById(id);

    } else {
      fetchAccount();
      
    }

  }, [id]);

  useEffect(() => {
    if (account) {
      console.log("fetching user following")
      console.log(account)
      fetchFollowing(account._id);
      userFollows(account._id);
      console.log(followingUser);
    }

    if (account) {
      fetchTheater();
      fetchMoviesReviewed();
      
    }
  }, [account]);



  return (
    <div className=" container profile-section">
      
      <h1 className=" ">Account</h1>

      <div className="">
      {!account && (
    <div className="">
      <div className="">
        <h5 className="">Cannot Access</h5>
      </div>
      <div className="">
        <p>Please sign in or sign up in order to access this content.</p>
      </div>
      <div className="">
      <Link to="../login"> 
        <button type="button" className="btn btn-primary m-2">Sign In</button>
        </Link>
        <Link to="../register"> 
        <button type="button" className="btn btn-secondary m-2"> Sign Up</button>
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

{/* <label for="editDOBInput">Date of Birth</label>
          <input value={new Date(account.dob)}
          className="form-control"
          type="date"
          id="editDOBInput"
            onChange={(e) => setAccount({ ...account,
              dob: e.target.value})}/> */}

<label for="editEmailInput">Email</label>
          <input value={account.email}
          className="form-control"
          id="editEmailInput"
            onChange={(e) => setAccount({ ...account,
              email: e.target.value })}/>

<label for="editUserTypeInput">User Type</label>
          <select 
          className="form-select mb-4"
          id="editUserTypeInput"
          disabled
          >
            <option value={`${currentUser.role}`}>{currentUser.role}</option>
          </select>

          {account?.role === "ADMIN" && (
            <>
          <label for="editAdminPosInput">Admin Position</label>
          <input value={account.position}
          className="form-control mb-2"
          id="editAdminPosInput"
            onChange={(e) => setAccount({ ...account,
              position: e.target.value })}/>
          </>
          )}


          

          <button className="btn btn-md btn-primary w-25 m-1" onClick={save}>
     Save
  </button>
  <button className="btn btn-md btn-danger w-25 m-1" onClick={signout}>
    Signout
  </button>
  </>
  )
          }
          {id && account?.role === "ADMIN" && (
            <>
          <label for="editAdminPosInput">Admin Position</label>
          <input value={account.position}
          className="form-control mb-2"
          id="editAdminPosInput"
          disabled
            onChange={(e) => setAccount({ ...account,
              position: e.target.value })}/>
          </>
          )}

          {id && !currentUser && (<Link to="../register"> 
          <button className="btn btn-md btn-success w-25" >
     Follow
  </button>
        </Link>)}
          {id && currentUser && <>{!followingUser ? 
          (<button className="btn btn-md btn-success w-25" onClick={followUser}>
     Follow
  </button>) 
  :
   (<button className="btn btn-md btn-danger w-25" onClick={unfollowUser}>
     Unfollow
  </button>)}</>}

{currentUser?.role === "ADMIN" && (
        <Link to="/admin/users" className="btn btn-warning w-25 m-1">
          Users
        </Link>
      )}

      
      <h2>User's Favorite Theater</h2>
      {theater &&
      <div className="card" >
  <div className="card-body bg-light">
    <h5 className="card-title">{theater.name}</h5>
    <p className="card-text">Address: {theater.address}</p>
  </div>
</div>
}

      {currentUser &&
      <Link to="/theaters" className="btn btn-warning w-25 m-1">
          View Theaters
        </Link>
}
    

    
      <h2 className="mt-3">Following</h2>
      {following &&
      <div className="list-group">
        {following.map((follows) => (
          <Link
            key={follows.followed._id}
            className="list-group-item"
            to={`/profile/${follows.followed._id}`}
          >
            @
            {follows.followed.username}
          </Link>
        ))}
      </div>
}

<h2 className="mt-3">Movies Reviewed</h2>
<div className="row d-flex flex-wrap">
{moviesReviewed && (
                moviesReviewed.map((movie) => (

                    <div className="card w-50" >
                      <Link to={`/details/${movie.id}`}>
                        <img className="card-img-top" src={tmdbClient.movieImageUrl(movie)} />
                        <div className="card-body">
                        <h3 className="card-title">{movie.title}</h3>
                        </div>
                      </Link>
                    </div>
                  ))
            )}
            </div>
      
      </div>
      )}
    </div>
    </div>
  );
}
export default Profile;