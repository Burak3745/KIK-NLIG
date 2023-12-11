import * as axios from '../axios'

export const getPostAction = (userId) => async (dispatch) => {
    const response = await axios.getPostList(userId)
    const { data } = response;
    dispatch({ type: "GET_POST", payload: data })
    return response;
}

export const createPostAction = (postData) => async (dispatch) => {
  const response = await axios.createPost(postData)
  const { data } = response;
  dispatch({ type: "CREATE_POST", payload: data })
  return response;
}

export const updatePostAction = (_id, updatedPost) => async (dispatch) => {
  const response = await axios.updatePost(_id, updatedPost)
  const { data } = response;
  dispatch({ type: "UPDATE_POST", payload: data })
  return response;
}

export const deletePostAction = (userId, _id) => async (dispatch) => {
  const response = await axios.deletePost(userId, _id)
  dispatch({ type: "DELETE_POST", payload: _id })
  return response;
}


export const getPostByIdAction = (_id) => async (dispatch) => {
  const response = await axios.getPostById(_id)
  const { data } = response;
  dispatch({ type: "GET_POST_BYID", payload: data })
  return response;
}