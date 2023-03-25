import { Dispatch, SetStateAction } from "react";
import PostService from "../../../services/home/posts";
import { PostData } from "../../../types/profile";

export default async function handleAddPostSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string,
    user: string,
    posts: PostData[],
    setPosts: Dispatch<SetStateAction<PostData[]>>,
    handleStartPostToggle: () => void,
    setErr: Dispatch<SetStateAction<boolean>>
  ): Promise<void> {
    try {
        e.preventDefault();
        const formData = { content, user};
        const newPost = await PostService.postPost(formData);
        const newPosts = posts.concat(newPost.data.post);
        setPosts(newPosts);
        handleStartPostToggle();

    } catch(err) {
        setErr(true);
        return Promise.reject();
    }

  }
