import { Dispatch, SetStateAction } from "react";
import PostService from "../../../services/home/posts";
import { PostData } from "../../../types/profile";

export default async function handleEditPostSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string,
    id: string,
    posts: PostData[],
    setPosts: Dispatch<SetStateAction<PostData[]>>,
    handleEditPostToggle: (id: string) => void,
    setErr: Dispatch<SetStateAction<boolean>>
  ): Promise<void> {
    try{
      e.preventDefault();
      const formData = {content};
      const editedPost = await PostService.editPost(formData, id);
      const updatedPosts = posts.map((post:any) => {
        if (post.id === editedPost.data.post.id) {
          return editedPost.data.post;
        } else {
          return post;
        }
      });
      setPosts(updatedPosts);
      handleEditPostToggle(id);

    } catch(err) {
      setErr(true);
      return Promise.reject();
    }
  }
