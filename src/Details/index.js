import * as client from "../tmdbService";
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewsClient from "../reviews/client";
import * as usersClient from "../users/client";

function Details() {
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState([]);
    const [director, setDirector] = useState(null);
    const [currentUserReview, setCurrentUserReview] = useState(null);
    const [reviews, setReviews] = useState([]);
    const { currentUser } = useSelector((state) => state.usersReducer);

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

      // const findUserById = async (id) => {
      //   const user = await client.findUserById(id);
      //   return user;
      // };

      // const fetchMovieById = async (id) => {
      //   const result = await client.fetchMovieById(id);
      //   return result
      // };

    

      const saveReview = async () => {
        //if the user has not entered a rating, do nothing
        if (currentUserReview && currentUserReview.rating) {
          try {
            const userReview = await reviewsClient.findUserReviewOfMovie(currentUser._id, id, currentUserReview);

            //if the user has already reviewed the movie, update the existing review
            if (userReview) {
              updateReview();
            }
            //else create a new review
            else {
              const userReview = await reviewsClient.createReview(currentUser._id, id, currentUserReview);
              console.log(userReview);
            }   
            fetchCurrentUserReview();       
          }
          catch(error) {
            console.log(error);
          }   
        }      
      }

      const fetchCurrentUserReview = async (id) => {
        const userReview = await reviewsClient.findUserReviewOfMovie(currentUser._id, id);
        setCurrentUserReview(userReview);
        console.log(currentUserReview);
      }

      const fetchReviews = async (id) => {
        try {
        const reviews = await reviewsClient.findUsersWhoReviewedMovie(id);
        if (reviews) {
          console.log(reviews);
          console.log("adding user info and movie info to review objects")
          for (let i=0; i<reviews.length; i++) {
            const review = reviews[i];
            const movie = await client.fetchMovieById(id);
            const user = await usersClient.findUserById(review.user);
            reviews[i] = {...review, userInfo: user, movieInfo: movie};

          }
        setReviews(reviews);
      }
      }
      catch(error) {
        console.log(error)
      }
        console.log(reviews);
      }


      const updateReview = async () => {
        try {
          const status = await reviewsClient.updateReview(currentUserReview);
          const newReview = {...currentUserReview, userInfo: currentUser, movieInfo: movie }
          setReviews(reviews.map((r) => (r._id === newReview._id ? newReview : r)));
        } catch (err) {
          console.log(err);
        }
      };


      useEffect(() => {
        fetchMovie(id);
        fetchMovieCredits(id);
        fetchReviews(id);
        if (currentUser) {
          fetchCurrentUserReview(id);
        }
      }, [id, currentUser]);


    return (
        <div className="container">
          
          <div className="row">
        {movie && (
          <>
          
  
            <h1 className="row">{movie.title}</h1>
            <div className="row">
            <div className=" mb-2 col-12 col-sm-8 col-md-6 col-lg-4">
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

        {currentUser && (
          <div className="mt-4">
            <h4>Your Review</h4>
          <div className="form-group">
            <label htmlFor="review-rating-input" className=" mt-2">Rating out of 10</label>
            <input id="review-rating-input" className="form-control mb-2 w-25" 
            type="number" min="1" max="10" 
            value={currentUserReview?.rating}
            onChange={(e) => setCurrentUserReview({ ...currentUserReview, rating: e.target.value })}></input>

            <label htmlFor="review-description-input " className=" mt-2">Review Text</label>
            <textarea id="review-description-input" rows="3" className="form-control mb-2" type="text"
            value={currentUserReview?.description}
            onChange={(e) => setCurrentUserReview({ ...currentUserReview, description: e.target.value })}></textarea>


            <button className="btn btn-success m-2" onClick={saveReview}>Save Your Review</button>
          </div>
          </div>
        )}


        <div>
          <h4>User Reviews</h4>
          <div className="row d-flex flex-wrap">
      {reviews &&
        reviews.map((review) => (

          <div className="card w-50 m-2" >
            <Link to={`/profile/${review.userInfo._id}`}>
              <div class="card-body">
                <h5>@{review.userInfo.username}</h5>
              <h5 className="card-title">{review.rating} / 10</h5>
              <h6>Review Text:</h6>
              <p className="card-text">{review.description}</p>
              </div>
            </Link>
          </div>
        ))}
        </div>
        </div>

        </div>
        </>) }


      {/* <pre>{JSON.stringify(movie, null, 2)}</pre> */}
      </div>
      </div>


    )
}
export default Details;