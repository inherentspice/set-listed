import PostService from "../../../services/home/posts";

export default async function handleDeletePostClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    posts: any,
    setPosts: any,
    setErr: any
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