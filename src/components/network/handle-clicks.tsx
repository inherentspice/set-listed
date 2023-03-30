import { Dispatch, SetStateAction } from "react";
import ConnectionService from "../../services/home/connection";
import { User } from "../../types/my-network";


export async function handleAcceptClick(
  senderId: string,
  id: string,
  pending: User[] | undefined,
  setPending: Dispatch<SetStateAction<User[] | undefined>>
): Promise<void>{
  try {
    const formObject = {
      senderId
    };
    if (pending) {
      await ConnectionService.acceptRequest(formObject, id);
      const updatedPending = pending.filter((friend) => friend.id !== senderId);
      setPending(updatedPending);
      return Promise.resolve();
    }
  } catch (err) {
    console.log(err);
    return Promise.reject();
  }
}

export async function handleIgnoreClick(
  senderId: string,
  id: string,
  pending: User[],
  setPending: Dispatch<SetStateAction<User[] | undefined>>
): Promise<void>{
  try {
    const formObject = {
      senderId
    };
    if (pending) {
      await ConnectionService.declineRequest(formObject, id);
      const updatedPending = pending.filter((friend) => friend.id !== senderId);
      setPending(updatedPending);
      return Promise.resolve();
    }
  } catch (err) {
    console.log(err);
    return Promise.reject();
  }
}
