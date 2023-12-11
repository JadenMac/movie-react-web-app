import './App.css';
import "./Vendors/bootstrap-5.1.3-dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle';
import "./Vendors/fontawesome-free-6.4.2-web/css/all.css"

import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Home from "./Home"
import Profile from "./Profile"
import Details from "./Details"
import Search from "./Search"
import Login from "./Login"
import MovieAppNav from "./MovieAppNav";
import Signup from './users/signup';
import UserTable from './users/table';
import store from "./store";
import { Provider } from "react-redux";


function App() {

  return (
    <Provider store={store}>
    <HashRouter>
      <div>
      <MovieAppNav />
            <Routes>
               <Route path="/"         element={<Navigate to="/home"/>}/>
               <Route path="/home"         element={<Home/>}/>
               <Route path="/search"    element={<Search/>}/>
               <Route path="/search/:search"    element={<Search/>}/>
               <Route path="/details/:id"    element={<Details/>}/>
               <Route path="/login/*" element={<Login/>}/>
               <Route path="/register" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/admin/users" element={<UserTable />} />
            </Routes>
      </div>
      </HashRouter>
      </Provider>
  );
}

export default App;
