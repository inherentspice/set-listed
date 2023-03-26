import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { FeaturedData } from "../../../types/profile";

export default async function handleDeleteFeaturedItemClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    featured: FeaturedData[],
    setFeatured: Dispatch<SetStateAction<FeaturedData[]>>,
    handleEditFeaturedToggle: () => void,
    setErr: Dispatch<SetStateAction<boolean>>
  ): Promise<void> {
    try{
      e.preventDefault();
      const confirmDelete = confirm("Click OK if you actually want to delete this");
      if (confirmDelete) {
        await ProfileService.deleteFeatured(id);
        const updatedFeatured = featured.filter((feature) => feature.id !== id);
        setFeatured(updatedFeatured);
        handleEditFeaturedToggle();
      }  
    } catch(err) {
      setErr(true);
      return Promise.reject(err);
    }
  }
