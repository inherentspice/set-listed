import PostService from "../../../services/home/posts";
import { CommentData } from "../../../types/profile";
import { Dispatch, SetStateAction } from "react";


export default async function handleLikeCommentClick(
  commentId: string,
  userId: string,
  existingComments: CommentData[],
  setExistingComments: Dispatch<SetStateAction<CommentData[] | null>>
): Promise<void>{
  try {
    const formObject = {
      user: userId
    };
    await PostService.modifyCommentLikes(formObject, commentId);
    if (existingComments) {
      const initialCommentInfo = existingComments.filter((comm) => comm.id === commentId);
      const isLiking = initialCommentInfo[0].likes.indexOf(userId);
      isLiking === -1 ?
        initialCommentInfo[0].likes.push(userId) :
        initialCommentInfo[0].likes.splice(isLiking, 1);
      const updatedLikesArray = existingComments
        .filter((comm) => comm.id !== commentId)
        .concat(initialCommentInfo);
      setExistingComments(updatedLikesArray)
      }
  } catch (err) {
    console.log(err);
  }
}
