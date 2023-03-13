import ProfileService from "../../../services/home/profile";


export async function handleAddAboutEditClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string,
    user: string,
    // need to pass these babies as props
    setAbout: any,
    handleExpandEditAboutToggle: any,
    setErr: any
  ): Promise<void> {
    try{
        e.preventDefault();
        const formData = {content};
        const editedAbout = await ProfileService.editAbout(formData, user);
        setAbout(editedAbout.data.about);
        handleExpandEditAboutToggle();
    } catch (err) {
        setErr(true);
        return Promise.reject();
        console.log(err);
    }
  }
