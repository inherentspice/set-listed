import axios from "axios";
import { AxiosResponse } from "axios";
import ProfileData, {AwardDataSend, ExperienceDataSend, PostData, ProfileCardData, ProfileCardDataSend, SkillDataSend} from "../../types/profile";

const baseUrl = "/profile";


const getOne = (id: string): Promise<AxiosResponse<ProfileCardData>> => {
  return axios.get(`profilecard/${id}`);
};

const getProfile = (id: string): Promise<AxiosResponse<ProfileData>> => {
  return axios.get(`${baseUrl}/${id}`);
};

const getProfileCard = (id: string) => {
  return axios.get(`${baseUrl}/profilecard/${id}`);
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

const editBackground = (formObject: FormData, id: string) => {
  return axios.put(`${baseUrl}/backgroundpicture/${id}`, formObject);
};

const editHero = (formObject: ProfileCardDataSend, id: string) => {
  return axios.put(`${baseUrl}/hero/${id}`, formObject);
};

const editProfilePic = (formObject: FormData, id: string) => {
  return axios.put(`${baseUrl}/profilepicture/${id}`, formObject);
};

const editAbout = (formObject: {content: string}, id: string) => {
  return axios.put(`${baseUrl}/about/${id}`, formObject);
};

const editAward = (formObject: {content: string}, id: string) => {
  return axios.put(`${baseUrl}/award/${id}`, formObject);
};

const editExperience = (formObject: ExperienceDataSend, id: string) => {
  return axios.put(`${baseUrl}/experience/${id}`, formObject);
};

const editFeatured = (formObject: {title: string, content: string}, id: string) => {
  return axios.put(`${baseUrl}/featured/${id}`, formObject);
};

const editFeaturedImage = (formObject: FormData, id: string) => {
  return axios.put(`${baseUrl}/featured/image/${id}`, formObject);
};

const deleteAward = (id: string) => {
  return axios.delete(`${baseUrl}/award/${id}`);
};

const ProfileService = {
  getOne,
  getProfile,
  getProfileCard,
  getProfilePosts,
  postFeatured,
  postExperience,
  postAward,
  postSkill,
  editBackground,
  editHero,
  editProfilePic,
  editAbout,
  editAward,
  editExperience,
  editFeatured,
  editFeaturedImage,
  deleteAward
};

export default ProfileService;
