import MessagingService from "../../../services/home/messaging";
import { useNavigate } from "react-router-dom";


export default async function HandleMessageClick(
    profileUser: string, 
    viewingUser: string,
    setErr: any
    
): Promise<void>{
    try {
        const navigate = useNavigate();
        const formObject = {
        userId: viewingUser,
        friendId: profileUser
      };
      await MessagingService.createRoom(formObject);
      navigate("/messaging");
      return Promise.resolve();
    } catch (err) {
      setErr(true);
      return Promise.reject(err);
    }
  }