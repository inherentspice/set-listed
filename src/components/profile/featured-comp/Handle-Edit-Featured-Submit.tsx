import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { FeaturedData } from "../../../types/profile";

export default async function handleEditFeaturedSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title: string,
    content: string,
    id: string,
    featured: FeaturedData[],
    setFeatured:Dispatch<SetStateAction<FeaturedData[]>>,
    handleEditFeaturedItemToggle:(id: string) => void,
    setErr: Dispatch<SetStateAction<boolean>>,

  ): Promise<void> {
    try {
      e.preventDefault();
      const formData = {
        title,
        content,
      };
      const editedFeaturedItem = await ProfileService.editFeatured(formData, id);
      const updatedFeatured = featured.map((feature) => {
        if (feature.id === editedFeaturedItem.data.featured.id) {
          return editedFeaturedItem.data.featured;
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
