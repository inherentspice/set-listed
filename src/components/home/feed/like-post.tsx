import PostService from "../../../services/home/posts";
import { PostData } from "../../../types/profile";
import { Dispatch, SetStateAction } from "react";


export default async function handleLikePostClick(
  id: string,
  viewingUser: string,
  post: PostData,
  setPost: Dispatch<SetStateAction<PostData>>
): Promise<void>{
  try {
    const formObject = {
      user: viewingUser
    };
    await PostService.modifyPostLikes(formObject, id);
    const isLiked = post.likes.indexOf(viewingUser);
    if (isLiked !== -1) {
      const updatedPost = {...post};
      updatedPost.likes.splice(isLiked, 1);
      setPost(updatedPost);
    } else {
      const updatedPost = {...post};
      updatedPost.likes.push(viewingUser);
      setPost(updatedPost);
    }
  } catch (err) {
    console.log(err);
  }
}
