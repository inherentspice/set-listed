import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { FeaturedData } from "../../../types/profile";

export default async function handleEditFeaturedPictureSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    image: File | null,
    id: string,
    featured: FeaturedData[],
    setFeatured: Dispatch<SetStateAction<FeaturedData[]>>,
    handleEditFeaturedItemToggle: (id: string) => void,
    setErr: Dispatch<SetStateAction<boolean>>
  ): Promise<void> {
    try {
      e.preventDefault();
      const formData = new FormData();
      if (!image) {
        setErr(true);
        return;
      }
      formData.append("image", image);
      const editedImage = await ProfileService.editFeaturedImage(formData, id);
      const updatedFeatured = featured.map((feature) => {
        if (feature.id === editedImage.data.featured.id) {
          return editedImage.data.featured;
        } else {
          return feature;
        }
      });
      setFeatured(updatedFeatured);
      handleEditFeaturedItemToggle("");
    } catch(err) {
      setErr(true);
      return Promise.reject(err);
    }
  }
