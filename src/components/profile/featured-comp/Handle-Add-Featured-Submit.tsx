import React, { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { FeaturedData } from "../../../types/profile";

export default async function handleAddFeaturedSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    suppImageUpload: File | null, 
    description: string, 
    title: string,
    user: string,
    featured: FeaturedData[],
    setErr: Dispatch<SetStateAction<boolean>>,
    setFeatured: Dispatch<SetStateAction<FeaturedData[]>>,
    handleAddFeaturedToggle: () => void,


): Promise<void> {
      try{
        e.preventDefault();
        const formData = new FormData();
        if (!(suppImageUpload && description && title)) {
          setErr(true);
          return;
        }
        formData.append("image", suppImageUpload);
        formData.append("content", description);
        formData.append("title", title);
        formData.append("user", user);
        const newSuppImage = await ProfileService.postFeatured(formData);
        const newFeatureds = featured.concat(newSuppImage.data.featured);
        setFeatured(newFeatureds);
        handleAddFeaturedToggle(); 
      } catch(err) {
        setErr(true)
        return Promise.reject(err);
      }
    }
