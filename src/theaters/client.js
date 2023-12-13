import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_MOVIE_API_BASE;
export const THEATERS_API = `${BASE_API}/theaters`;

  export const updateTheater = async (theater) => {
    console.log(theater)
    const response = await axios.put(`${THEATERS_API}/${theater._id}`, theater);
    return response.data;
  };

  export const findAllTheaters = async () => {
    const response = await axios.get(`${THEATERS_API}`);
    return response.data;
  };
  
  export const createTheater = async (theater) => {
    const response = await axios.post(`${THEATERS_API}`, theater);
    return response.data;
  };

  export const findTheaterById = async (id) => {
    const response = await axios.get(`${THEATERS_API}/${id}`);
    return response.data;
  };
  
  export const deleteTheater = async (theater) => {
    const response = await axios.delete(
      `${THEATERS_API}/${theater._id}`);
    return response.data;
  };




  