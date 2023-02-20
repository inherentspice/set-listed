import axios from "axios";
import { PostDataSend } from "../../types/profile";

const baseUrl = "/profile";

const getFeed = (id: string) => {
  return axios.get(`/feed/${id}`);
};

const postPost = (formObject: PostDataSend) => {
  return axios.post(`${baseUrl}/post`, formObject);
};

const editPost = (formObject: {content: string}, id: string) => {
  return axios.put(`${baseUrl}/post/${id}`, formObject);
};

const PostService = {
  getFeed,
  postPost,
  editPost,
};

export default PostService;
