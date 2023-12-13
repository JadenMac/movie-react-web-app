import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as client from "../tmdbService";
import { useSelector } from "react-redux";
import * as reviewsClient from "../reviews/client";



function Home() {

    const [popularMovies, setPopularMovies] = useState([]);
    const [moviesReviewed, setMoviesReviewed] = useState([]);

    const findPopular = async () => {
        const results = await client.fetchPopularMovies();
        setPopularMovies(results.results);
      };

      

      const { currentUser } = useSelector((state) => state.usersReducer);

      const fetchMoviesReviewed = async () => {
        try {
        const reviews = await reviewsClient.findMoviesUserReviewed(currentUser._id);
        if (reviews) {
            console.log(reviews);
            console.log("adding user info and movie info to review objects")
            for (let i=0; i<reviews.length; i++) {
              const movie = await client.fetchMovieById(reviews[i].tmdb_id);
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
        findPopular();
        if (currentUser) {
            fetchMoviesReviewed();
        }
      }, []);

    return (
        <div className="homepage-section container">
        <div className="row d-flex flex-wrap">
            <h1>Home</h1>
            {currentUser && (
                <>
                <h5 className='mb-4'>Welcome back {currentUser.username}!</h5>
            
            <div className='mb-4'>
            <h4>Movies You Reviewed Recently</h4>
            {moviesReviewed && (
                moviesReviewed.map((movie) => (

                    <div className="card " >
                      <Link to={`/details/${movie.id}`}>
                        <img className="card-img-top" src={client.movieImageUrl(movie)} />
                        <div className="card-body">
                        <h3 className="card-title">{movie.title}</h3>
                        </div>
                      </Link>
                    </div>
                  ))
            )}
            </div>
            </>

            )}


            {popularMovies && <h4 className='mt-4'>Popular Movies</h4>}
      {popularMovies &&
        popularMovies.map((movie) => (

          <div className="card " >
            <Link to={`/details/${movie.id}`}>
              <img className="card-img-top" src={client.movieImageUrl(movie)} />
              <div className="card-body">
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