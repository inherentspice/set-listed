import axios from "axios";
import { PostDataSend } from "../../types/profile";

const baseUrl = "/profile";

const getFeed = (id: string) => {
  return axios.get(`/feed/${id}`);
};

const getComments = (id: string) => {
  return axios.get(`${baseUrl}/comment/${id}`);
};

const postPost = (formObject: PostDataSend) => {
  return axios.post(`${baseUrl}/post`, formObject);
};

const postComment = (formObject: {user: string, content: string, post: string}) => {
  return axios.post(`${baseUrl}/comment`, formObject);
}

const editPost = (formObject: {content: string}, id: string) => {
  return axios.put(`${baseUrl}/post/${id}`, formObject);
};

const modifyPostLikes = (formObject: {user: string}, id: string) => {
  return axios.put(`${baseUrl}/post/likes/${id}`, formObject);
};

const modifyCommentLikes = (formObject: {user: string}, id: string) => {
  return axios.put(`${baseUrl}/comment/likes/${id}`, formObject);
};

const deletePost = (id: string) => {
  return axios.delete(`${baseUrl}/post/${id}`);
};

const deleteComment = (id: string) => {
  return axios.delete(`${baseUrl}/comment/${id}`);
};

const PostService = {
  getFeed,
  getComments,
  postPost,
  postComment,
  editPost,
  deletePost,
  deleteComment,
  modifyPostLikes,
  modifyCommentLikes
};

export default PostService;
