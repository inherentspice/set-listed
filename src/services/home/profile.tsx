import axios from "axios";
import { AxiosResponse } from "axios";
import ProfileData, {AwardDataSend, ExperienceDataSend, PostData, ProfileCardData, SkillDataSend} from "../../types/profile";

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

const postExperience = (formObject: ExperienceDataSend) => {
  return axios.post(`${baseUrl}/experience`, formObject);
};

const postAward = (formObject: AwardDataSend) => {
  return axios.post(`${baseUrl}/award`, formObject);
};

const postSkill = (formObject: SkillDataSend) => {
  return axios.post(`${baseUrl}/skill`, formObject);
};

const ProfileService = {
  getOne,
  getProfile,
  getProfilePosts,
  postFeatured,
  postExperience,
  postAward,
  postSkill
};

export default ProfileService;
