import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { ExperienceData } from "../../../types/profile";

export default async function addExperience(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  title: string,
  venue: string,
  description: string,
  dateStart: string,
  dateEnd: string,
  location: string,
  user: string,
  experience: ExperienceData[],
  setExperience: Dispatch<SetStateAction<ExperienceData[]>>,
  handleAddExperienceClose: () => void,
  setErr: Dispatch<SetStateAction<boolean>>
) {
  e.preventDefault();
  const formData = {
    title,
    content: description,
    venue,
    dateStart,
    dateEnd,
    location,
    user
  };
  try {
    const newExperience = await ProfileService.postExperience(formData);
    const newExperienceState = experience;
    newExperienceState.push(newExperience.data.experience);
    setExperience(newExperienceState);
    handleAddExperienceClose();
  } catch (err) {
    setErr(true);
  }
}
