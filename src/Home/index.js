import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as client from "../tmdbService";



function Home() {

    const [popularMovies, setPopularMovies] = useState([])

    const findPopular = async () => {
        const results = await client.fetchPopularMovies();
        setPopularMovies(results.results);
      };

    useEffect(() => {
        findPopular();
      }, []);

    return (
        <div className="homepage-section m-2">
        <div className="row d-flex flex-wrap">
            <h1>Home</h1>
            {popularMovies && <h2>Popular</h2>}
      {popularMovies &&
        popularMovies.map((movie) => (

          <div className="card " >
            <Link to={`/details/${movie.id}`}>
              <img className="card-img-top" src={client.movieImageUrl(movie)} />
              <div class="card-body">
              <h3 className="card-title">{movie.title}</h3>
              </div>
            </Link>
          </div>
        ))}
        </div>
        </div>
    )

}

export default Home;