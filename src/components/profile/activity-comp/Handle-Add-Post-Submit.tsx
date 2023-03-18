import PostService from "../../../services/home/posts";

export default async function handleAddPostSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string,
    user: string,
    posts: any,
    setPosts: any,
    handleStartPostToggle: any,
    setErr: any
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
    }
    
  }