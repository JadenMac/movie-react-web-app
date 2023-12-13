
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "../users/client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../users/reducer";
import {useEffect} from "react";



function MovieAppNav(){
    const { currentUser } = useSelector((state) => state.usersReducer);
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/login");
      };


      const fetchAccount = async () => {
        try {
          console.log("nav fetching account");
        const account = await client.account();
        dispatch(setCurrentUser(account));
        console.log(currentUser);
        }
        catch(error) {
    
        }
      };


    //   if (!currentUser ) {
    //     try {
    //         const account = fetchAccount();
    //         if (account) {
    //             dispatch(setCurrentUser(account));
    //         }
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    //   }
    //   console.log(currentUser);

    useEffect(() => {
        if (!currentUser) {
          fetchAccount();
    
        }
    
      }, [currentUser]);

      

    return (

    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark justify-content-between">
        <div className="d-flex navbar-brand app-name-with-icon p-3">
                
                <i className="fa-solid fa-film fa-3x"></i>
                <h3 className="p-2">The Movie Browser</h3>
            </div>

  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
<ul className="navbar-nav ">
<li className="nav-item">
<Link className={`nav-link ${pathname.includes("home") && "active"}`} to="../home">Home</Link>
</li>
<li className="nav-item">
<Link className={`nav-link ${pathname.includes("search") && "active"}`} to="../search">Search</Link>
</li>

<li className="nav-item">
<Link className={`nav-link ${pathname.includes("profile") && "active"}`} to="../profile">Profile</Link>
</li>



{!currentUser &&
(
<>
<li className="nav-item">
<Link className={`nav-link ${pathname.includes("login") && "active"}`} to="../login">Login</Link>
</li>

<li className="nav-item">
<Link className={`nav-link ${pathname.includes("register") && "active"}`} to="../register">Sign Up</Link>
</li>
</>)

}

{currentUser && 
    <li className="nav-item">
<Link className={`nav-link ${pathname.includes("logout") && "active"}`} onClick={signout} to="../login">Logout</Link>
</li>
}

</ul>
</div>
</nav>

    )
}
export default MovieAppNav;

