import { Dispatch, SetStateAction } from "react";
import ConnectionService from "../../services/home/connection";


export default async function handleConnectionClick(
    user: string,
    viewingUser: string,
    setConnectionStatus: Dispatch<SetStateAction<string>>,
    setErr: Dispatch<SetStateAction<boolean>>
  ): Promise<void>{
    try {
      const formObject = {
        friendId: user
      };
      await ConnectionService.sendRequest(formObject, viewingUser);
      setConnectionStatus("Friend Request Pending");
      return Promise.resolve();
    } catch (err) {
      setErr(true);
      return Promise.reject(err);
    }
  }
