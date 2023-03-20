import ProfileService from "../../../services/home/profile";

export default async function HandleEditBackgroundSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    imageUpload: File | null,
    profileCard: any,
    setProfileCard: any,
    handleEditBackgroundToggle: any,
    setErr: any
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
