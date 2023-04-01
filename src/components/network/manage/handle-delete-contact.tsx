import { Dispatch, SetStateAction } from "react";
import ConnectionService from "../../../services/home/connection";
import { User } from "../../../types/my-network";


export default async function handleDeleteContact(
  userId: string,
  friendId: string,
  setFriends: Dispatch<SetStateAction<User[] | undefined>>
): Promise<void>{
  const confirmDelete = confirm("Click OK if you actually want to delete this");
  if (confirmDelete) {
    try {
      const formObject = {
        friendId
      };
      await ConnectionService.deleteFriend(formObject, userId);
      setFriends(prevFriends => prevFriends?.filter(friend => friend.id !== friendId));
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
