import axios from "axios";

const baseUrl = "/messaging";


const createRoom = (formObject: {userId: string, friendId: string}) => {
  return axios.post(`${baseUrl}/room`, formObject);
};

const MessagingService = {
  createRoom
};

export default MessagingService;
