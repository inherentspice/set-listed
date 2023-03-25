import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { AboutData } from "../../../types/profile";


export async function handleAddAboutEditClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string,
    user: string,
    setAbout: Dispatch<SetStateAction<AboutData>>,
    handleExpandEditAboutToggle: () => void,
    setErr: Dispatch<SetStateAction<boolean>>
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
    }
  }
