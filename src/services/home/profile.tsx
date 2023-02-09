import axios from "axios";
import { AxiosResponse } from "axios";
import ProfileData, {PostData, ProfileCardData} from "../../types/profile";

const baseUrl = "/profilecard";


const getOne = (id: string): Promise<AxiosResponse<ProfileCardData>> => {
  return axios.get(`${baseUrl}/${id}`);
};

const getProfile = (id: string): Promise<AxiosResponse<ProfileData>> => {
  return axios.get(`/profile/${id}`);
};

const getProfilePosts = (id: string): Promise<AxiosResponse<PostData>> => {
  return axios.get(`profile/posts/${id}`);
}

const ProfileCardService = {
  getOne,
  getProfile,
  getProfilePosts
};

export default ProfileCardService;
