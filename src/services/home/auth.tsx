import axios from "axios";
import { AxiosResponse } from "axios";

type UserData = {
  user: string
}

type User = {
  id ?: string,
  email ?: string,
  password ?: string,
  confirmPassword ?: string,
}

const login = (user: User): Promise<AxiosResponse<UserData>> => {
  return axios.post<UserData>("/login", user);
};

const signup = (user: User): Promise<AxiosResponse<UserData>> => {
  return axios.post<UserData>("/signup", user);
};

const logout = (): Promise<AxiosResponse<UserData>> => {
  return axios.get<UserData>("/logout");
};

const checkSession = (): Promise<AxiosResponse<UserData>> => {
  return axios.get<UserData>("/check-session");
};

const ProfileCardService = {
  login,
  signup,
  logout,
  checkSession
};

export default ProfileCardService;
