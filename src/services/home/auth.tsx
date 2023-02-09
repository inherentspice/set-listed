import axios from "axios";
import { AxiosResponse } from "axios";
import UserData, {User} from "../../types/header";

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

const AuthService = {
  login,
  signup,
  logout,
  checkSession
};

export default AuthService;
