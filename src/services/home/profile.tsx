import axios from "axios";
import { AxiosResponse } from "axios";
import Profile, {ProfileCardData} from "../../types/profile";

const baseUrl = "/profilecard";


const getOne = (id: string): Promise<AxiosResponse<ProfileCardData>> => {
  return axios.get(`${baseUrl}/${id}`);
};

const getProfile = (id: string): Promise<AxiosResponse<Profile>> => {
  return axios.get(`/profile/${id}`);
};

const ProfileCardService = {
  getOne,
  getProfile
};

export default ProfileCardService;
