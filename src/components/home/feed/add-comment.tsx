import PostService from "../../../services/home/posts";
import { CommentData } from "../../../types/profile";
import { Dispatch, SetStateAction } from "react";

export default async function handleAddCommentSubmit(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  comment: string,
  viewingUser: string,
  postId: string,
  existingComments: CommentData[] | null,
  setExistingComments: Dispatch<SetStateAction<CommentData[] | null>>,
  setComment: Dispatch<SetStateAction<string>>
): Promise<void>{

  e.preventDefault();

  const formObject = {
    user: viewingUser,
    content: comment,
    post: postId
  }
  try {
    const addComment = await PostService.postComment(formObject);
    const updatedComments = existingComments ? existingComments.concat(addComment.data.comment) : [addComment.data.comment];
    setExistingComments(updatedComments);
    setComment("");
  } catch (err) {
    console.log(err);
  }
}
