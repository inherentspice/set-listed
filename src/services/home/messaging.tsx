import axios from "axios";

const baseUrl = "/messaging";


const createRoom = (formObject: {userId: string, friendId: string}) => {
  return axios.post(`${baseUrl}/room`, formObject);
};

const getRoom = (id: string) => {
  return axios.get(`${baseUrl}/room/${id}`);
};

const getRooms = (id: string) => {
  return axios.get(`${baseUrl}/room/all/${id}`);
};

const MessagingService = {
  getRoom,
  getRooms,
  createRoom
};

export default MessagingService;
