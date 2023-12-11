
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation} from "react-router-dom";
import * as client from "../tmdbService";

function Search() {
  const {search} = useParams();
  const [searchResults, setSearchResults] = useState(null);
  const [searchText, setSearchText] = useState(search);
  const { pathname } = useLocation();

  console.log(searchText)
  const navigate = useNavigate();

  const searchForMovies = async (text) => {
    if (text) {
    const results = await client.fullTextSearch(text);
    setSearchResults(results.results);
    console.log(search)
    if (pathname === "/search"){
      console.log("in /search")
      navigate(`./${searchText}`)
    }
    else {
      console.log(pathname)
      console.log("not in /search")
      navigate(`../search/${searchText}`)
    }
    }
  };

  useEffect(() => {
    searchForMovies(searchText);
  }, []);

  return (
    <div className="movie-search-section row justify-content-center">
    

      <h1 className="text-center">Search for Movies</h1>

      <div className="input-group w-75 ">
        
      <input
        value={searchText}
        className="form-control"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="input-group-append">
      <button
        className="btn btn-primary"
        onClick={() => searchForMovies(searchText)}
      >
        Search
      </button>
      </div>
      </div>
      <div className="row d-flex flex-wrap">
      {searchResults &&
        searchResults.map((movie) => (

   

          <div className="card m-2" >
            <Link to={`/details/${movie.id}`}>
              <img className="card-img-top" src={client.movieImageUrl(movie)} />
              <div class="card-body">
              <h3 className="card-title">{movie.title}</h3>
              </div>
            </Link>
          </div>
        ))}
        </div>
      {/* <pre>{JSON.stringify(searchResults, null, 2)}</pre> */}
    </div>


  );
}

export default Search;
