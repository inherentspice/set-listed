import axios from "axios";
import { AxiosResponse } from "axios";
import { GigData, GigDataSend } from "../../types/gigs";

const baseUrl = "/gigs";

const getAllGigs = (): Promise<AxiosResponse<GigData[]>> => {
  return axios.get(`${baseUrl}/all`);
};

const postSkill = (formObject: GigDataSend) => {
  return axios.post(`${baseUrl}`, formObject);
};


const GigsService = {
  getAllGigs,
  postSkill,
};

export default GigsService;
