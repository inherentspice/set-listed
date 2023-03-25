import { Dispatch, SetStateAction } from "react";
import PostService from "../../../services/home/posts";

export default async function handleLikePostClick(
  id: string,
  viewingUser: string,
  setErr: Dispatch<SetStateAction<boolean>>,
  ): Promise<void> {
    try{
      const formObject = {user: viewingUser};
      const updatedLikes = await PostService.modifyPostLikes(formObject, id);
      console.log(updatedLikes);

    } catch(err) {
      setErr(true)
      return Promise.reject();
    }
  }
