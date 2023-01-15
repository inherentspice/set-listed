import axios from "axios";
import { AxiosResponse } from "axios";

const baseUrl = "/home/profilecard";

interface ProfileCardData {
  data: object,
  url: string,
  status: number,
}

const getOne = (id: string): Promise<AxiosResponse<ProfileCardData>> => {
  return axios.get(`${baseUrl}/${id}`);
};

const ProfileCardService = {
  getOne,
};

export default ProfileCardService;
