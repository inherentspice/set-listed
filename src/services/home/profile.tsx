import axios from "axios";
import { AxiosResponse } from "axios";
import ProfileData, {ProfileCardData} from "../../types/profile";

const baseUrl = "/profilecard";


const getOne = (id: string): Promise<AxiosResponse<ProfileCardData>> => {
  return axios.get(`${baseUrl}/${id}`);
};

const getProfile = (id: string): Promise<AxiosResponse<ProfileData>> => {
  return axios.get(`/profile/${id}`);
};

const ProfileCardService = {
  getOne,
  getProfile
};

export default ProfileCardService;
