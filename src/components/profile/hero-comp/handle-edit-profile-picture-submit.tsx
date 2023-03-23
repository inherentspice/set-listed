import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { ProfileCardData } from "../../../types/profile";

export default async function handleEditProfilePictureSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUpload: File | null,
    setErr: Dispatch<SetStateAction<boolean>>,
    profileCard: ProfileCardData,
    setProfileCard: Dispatch<SetStateAction<ProfileCardData>>,
    handleEditProfilePictureToggle: (id: string) => void
): Promise<void> {
      try{
        e.preventDefault();
        if (!imageUpload) {
            setErr(true);
            return;
        }
        const formData = new FormData();
        formData.append("image", imageUpload);
        const newImage = await ProfileService.editProfilePic(formData, profileCard.user);
        setProfileCard(newImage.data.profileCard);
        handleEditProfilePictureToggle("");
      } catch(err) {
          setErr(true)
          return Promise.reject();
      }
  }
