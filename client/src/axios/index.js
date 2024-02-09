import axios from "axios";

const HTTP = axios.create({
  baseURL: "https://kiknlig.onrender.com",
});

  export const GenresGet = async () =>
  await HTTP.get("/api/genres");


  /**********/

  export const Login = async (formData) =>
  await HTTP.post("/users/signin", formData);

  export const Signup = async (formData) =>
  await HTTP.post("/users/signup", formData);

  export const ProfileGet = async (email) =>
  await HTTP.get(`/users/profile/get/${email}`);

  export const ProfileUpdate = async (userData) =>
  await HTTP.post("/users/profile/update", userData);

  export const PasswordUpdate = async (formData) =>
  await HTTP.post("/users/password/update", formData);

  /************************************************* */

  export const UserGet = async () =>
  await HTTP.get(`/users/get`);

  export const UserUpdate = async (id, updatedUser) =>
  await HTTP.put(`/users/${id}`, updatedUser);

  export const getIdUser = async (id) =>  
  await  HTTP.get(`/users/${id}`)

  export const deleteUser = async (id) =>
  await HTTP.delete(`/users/${id}`);

  /*************************************************** */

  export const getPostsPage = async (userId, pageParam, options = {}) =>
  await HTTP.get(`/posts/list/${userId}/${pageParam}`, options);

  export const createPost = async (formData) =>
  await HTTP.post("/posts", formData);
  
  export const getPostList = async (userId) =>
  await HTTP.get(`/posts/list/${userId}`);

  export const getPostById = async (_id) =>  
  await  HTTP.get(`/posts/single/${_id}`)

  export const deletePost = async (userId,_id) =>
  await HTTP.delete(`/posts/${userId}/${_id}`);

  export const updatePost = async (_id, updatedPost) =>
  await HTTP.put(`/posts/${_id}`, updatedPost);
  
  /*************************************************** */
  
  export const createMovie = async (formData) =>
  await HTTP.post("/movie", formData);
  
  export const getMovie = async () =>
  await HTTP.get("/movie");

  export const getIdMovie = async (id) =>  
  await HTTP.get(`/movie/${id}`)

  export const getSortedMovies = async (sortBy, sortOrder) =>
  await HTTP.get(`/movie/${sortBy}/${sortOrder}`);

  export const deleteMovie = async (id) =>
  await HTTP.delete(`/movie/${id}`);

  export const updateMovie = async (id, updatedMovie) =>
  await HTTP.put(`/movie/${id}`, updatedMovie);

  export const likeMovie = async (id, userid) =>
  await HTTP.put(`/movie/like/${id}`, userid);

  export const unlikeMovie = async (id, userid) =>
  await HTTP.put(`/movie/unlike/${id}`, userid);

  export const dislikeMovie = async (id, userid) =>
  await HTTP.put(`/movie/dislike/${id}`, userid);

  export const undislikeMovie = async (id, userid) =>
  await HTTP.put(`/movie/undislike/${id}`, userid);
  
  export const updateActorMovie = async (id, updateActorMovie) =>
  await HTTP.put(`/movie/updateallactor/${id}`, updateActorMovie);

  export const deleteActorMovie = async (id) =>
  await HTTP.delete(`/movie/deleteallactor/${id}`);

  export const torrentMovie = async (id) =>
  await HTTP.get(`/movie/torrent/${id}`);

  /*************************************************** */

  export const createSeries = async (formData) =>
  await HTTP.post("/series", formData);
  
  export const getSeries = async () =>
  await HTTP.get("/series");

  export const getIdSeries = async (id) =>  
  await  HTTP.get(`/series/${id}`)

  export const deleteSeries = async (id) =>
  await HTTP.delete(`/series/${id}`);

  export const updateSeries = async (id, updatedSeries) =>
  await HTTP.put(`/series/${id}`, updatedSeries);

  export const deleteAllSeries = async (id) =>
  await HTTP.delete(`/series/alldeleteseries/${id}`);

  /******************************************************** */

  export const createActors = async (formData) =>
  await HTTP.post("/actors", formData);
  
  export const getActors = async () =>
  await HTTP.get("/actors");

  export const getIdActors = async (id) =>  
  await  HTTP.get(`/actors/${id}`)

  export const deleteActors = async (id) =>
  await HTTP.delete(`/actors/${id}`);

  export const updateActors = async (id, updatedActors) =>
  await HTTP.put(`/actors/${id}`, updatedActors);




