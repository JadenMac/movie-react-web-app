import * as client from "../tmdbService"
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Details() {
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState([]);
    const [director, setDirector] = useState(null);

    const { id } = useParams();

    const fetchMovie = async (id) => {
        const result = await client.fetchMovieById(id);
        setMovie(result);
      };

      const fetchMovieCredits = async (id) => {
        const result = await client.fetchMovieCreditsById(id);
        console.log(result)
        setCredits(result);
        findDirector(result);

      };

      const findDirector = (credits) => {
        console.log(credits)
        credits.crew.forEach((crewMember) => {
          if (crewMember.job === "Director") {
            setDirector(crewMember);
            console.log("found director")
            return;
          }
        })
      }


      useEffect(() => {
        fetchMovie(id);
        fetchMovieCredits(id);
      }, [id]);


    return (
        <div className="container">
          
          <div className="row">
        {movie && (
          <>
          
  
            <h1 className="row">{movie.title}</h1>
            <div className="row">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <img  className="w-100" src={client.movieImageUrl(movie)} />
            </div>
  
            <div className=" col-6 col-sm-4" >{movie.overview}</div>
            
        {director && (
          <div className="col-4 col-sm-3 m-1" >
            <div className="mb-1">
            Directed by: {" " + director.name}
            </div>
            <div className="mb-1 mt-2">
            Release Date: {" " + movie.release_date}
            </div>
            <div className="mb-1 mt-2">
            Runtime: {" " + movie.runtime + " min"}
            </div>

            </div>
        )
        }

        </div>
        </>) }


      {/* <pre>{JSON.stringify(movie, null, 2)}</pre> */}
      </div>
      </div>


    )
}
export default Details;