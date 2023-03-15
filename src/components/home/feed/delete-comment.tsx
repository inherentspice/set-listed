import PostService from "../../../services/home/posts";
import { CommentData } from "../../../types/profile";
import { Dispatch, SetStateAction } from "react";

export default async function handleDeleteCommentClick(
  commentId: string,
  existingComments: CommentData[],
  setExistingComments: Dispatch<SetStateAction<CommentData[] | null>>
): Promise<void>{
  const confirmDelete = confirm("Click OK if you actually want to delete this");
  if (confirmDelete) {
    try {
      await PostService.deleteComment(commentId);
      const updatedComments = existingComments ? existingComments.filter((comm) => comm.id !== commentId) : [];
      setExistingComments(updatedComments);
    } catch (err) {
      console.log(err);
    }
  }
}
