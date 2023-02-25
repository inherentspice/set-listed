import axios from "axios";

const baseUrl = "/messaging";


const createRoom = (formObject: {userId: string, friendId: string}) => {
  return axios.post(`${baseUrl}/room`, formObject);
};

const getMessages = (id: string) => {
  return axios.get(`${baseUrl}/${id}`);
};

const getRooms = (id: string) => {
  return axios.get(`${baseUrl}/room/all/${id}`);
};

const MessagingService = {
  getMessages,
  getRooms,
  createRoom
};

export default MessagingService;
