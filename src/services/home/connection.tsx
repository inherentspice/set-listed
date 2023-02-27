import axios from "axios";

const baseUrl = "/network";

const getConnections = (id: string) => {
  return axios.get(`${baseUrl}/getConnections/${id}`);
};

const sendRequest = (formObject: {friendId: string}, id: string) => {
  return axios.put(`${baseUrl}/sendRequest/${id}`, formObject);
};

const acceptRequest = (formObject: {senderId: string}, id: string) => {
  return axios.put(`${baseUrl}/acceptRequest/${id}`, formObject);
};

const declineRequest = (formObject: {senderId: string}, id: string) => {
  return axios.put(`${baseUrl}/declineRequest/${id}`, formObject);
};

const deleteFriend = (formObject: {friendId: string}, id: string) => {
  return axios.put(`${baseUrl}/deleteFriend/${id}`, formObject);
};

const ConnectionService = {
  getConnections,
  sendRequest,
  acceptRequest,
  declineRequest,
  deleteFriend
};

export default ConnectionService;
