import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { ExperienceData } from "../../../types/profile";

export default async function deleteExperience(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  id: string,
  experience: ExperienceData[],
  setExperience: Dispatch<SetStateAction<ExperienceData[]>>,
  handleEditExperienceClose: (id: string) => void,
  setErr: Dispatch<SetStateAction<boolean>>
) {
  e.preventDefault();
  try {
    await ProfileService.deleteExperience(id);
    const deletedExperienceState = experience.filter(experienceItem => experienceItem.id != id);
    setExperience(deletedExperienceState);
    handleEditExperienceClose("");
  } catch (err) {
    setErr(true);
  }
}
