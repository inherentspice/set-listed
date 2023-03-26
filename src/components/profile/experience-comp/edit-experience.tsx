import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { ExperienceData } from "../../../types/profile";

export default async function addExperienceEdit(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  title: string,
  venue: string,
  description: string,
  dateStart: string,
  dateEnd: string,
  location: string,
  id: string,
  user: string,
  experience: ExperienceData[],
  setExperience: Dispatch<SetStateAction<ExperienceData[]>>,
  handleEditExperienceClose: () => void,
  setErr: Dispatch<SetStateAction<boolean>>
) {
  e.preventDefault();
  const formData = {
    title,
    venue,
    content: description,
    dateStart,
    dateEnd,
    location,
    user
  };
  try {
    const editedExperience = await ProfileService.editExperience(formData, id);
    const editedIndex = experience.map(function(exp) {return exp.id;}).indexOf(editedExperience.data.experience.id);
    const editedExperienceState = experience;
    editedExperienceState.splice(editedIndex, 1, editedExperience.data.experience);
    setExperience(editedExperienceState);
    handleEditExperienceClose();
  } catch (err) {
    setErr(true);
  }
}
