import PostService from "../../../services/home/posts";

export default async function handleEditPostSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string,
    id: string,
    posts: any,
    setPosts: any,
    handleEditPostToggle: any,
    setErr: any

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