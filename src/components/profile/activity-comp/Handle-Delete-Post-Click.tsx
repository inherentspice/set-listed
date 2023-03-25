import { Dispatch, SetStateAction } from "react";
import PostService from "../../../services/home/posts";
import { PostData } from "../../../types/profile";

export default async function handleDeletePostClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    posts: PostData[],
    setPosts: Dispatch<SetStateAction<PostData[]>>,
    setErr: Dispatch<SetStateAction<boolean>>
  ): Promise<void> {
    try{
        e.preventDefault();
        const confirmDelete = confirm("Click OK if you actually want to delete this");
        if (confirmDelete) {
            await PostService.deletePost(id);
            const updatedPosts = posts.filter((post:any) => post.id !== id);
            setPosts(updatedPosts);
        }
    } catch(err) {
        setErr(true)
        return Promise.reject();
    }

  }
