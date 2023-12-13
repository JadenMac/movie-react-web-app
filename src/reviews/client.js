import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

const REVIEWS_API = process.env.REACT_APP_MOVIE_API_BASE;

export const updateReview = async (review) => {
    console.log(review)
    const response = await axios.put(`${REVIEWS_API}/reviews/${review._id}`, review);
    return response.data;
  };

export const findAllReviews = async () => {
  const response = await request.get(`${REVIEWS_API}/reviews`);
  return response.data;
};
export const createReview = async (userId, movieId, review) => {
  const response = await axios.post(
    `${REVIEWS_API}/users/${userId}/reviews/${movieId}`, review
  );
  return response.data;
};

export const findUserReviewOfMovie = async (userId, movieId) => {
    const response = await axios.get(`${REVIEWS_API}/users/${userId}/reviews/${movieId}`);
    console.log("fetching currentUser review of movie");
    console.log(response.data);
    return response.data;
  };

export const findMoviesUserReviewed = async (userId) => {
  const response = await axios.get(`${REVIEWS_API}/users/${userId}/reviews`);
  return response.data;
};
export const findUsersWhoReviewedMovie = async (movieId) => {
  const response = await axios.get(`${REVIEWS_API}/movies/${movieId}/reviews`);
  console.log(response.data);
  return response.data;
};