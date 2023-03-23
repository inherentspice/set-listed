import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { ProfileCardData } from "../../../types/profile";

export default async function HandleEditBackgroundSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUpload: File | null,
    profileCard: ProfileCardData,
    setProfileCard: Dispatch<SetStateAction<ProfileCardData>>,
    handleEditBackgroundToggle: (id: string) => void,
    setErr: Dispatch<SetStateAction<boolean>>
  ): Promise<void> {
      try{
          e.preventDefault();
          if (!imageUpload) {
              setErr(true);
              return;
            }
            const formData = new FormData();
            formData.append("image", imageUpload);
            const newImage = await ProfileService.editBackground(formData, profileCard.user);
            setProfileCard(newImage.data.profileCard);
            handleEditBackgroundToggle("");
      } catch(err) {
          setErr(true)
          return Promise.reject();
      }
  }
