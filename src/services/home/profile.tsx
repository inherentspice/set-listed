import axios from "axios";
import { AxiosResponse } from "axios";
import ProfileData, {PostData, ProfileCardData} from "../../types/profile";

const baseUrl = "/profile";


const getOne = (id: string): Promise<AxiosResponse<ProfileCardData>> => {
  return axios.get(`profilecard/${id}`);
};

const getProfile = (id: string): Promise<AxiosResponse<ProfileData>> => {
  return axios.get(`${baseUrl}/${id}`);
};

const getProfilePosts = (id: string): Promise<AxiosResponse<PostData>> => {
  return axios.get(`${baseUrl}/posts/${id}`);
};

const postFeatured = (formObject: FormData) => {
  return axios.post(`${baseUrl}/featured`, formObject);
};

const ProfileService = {
  getOne,
  getProfile,
  getProfilePosts,
  postFeatured,
};

export default ProfileService;
