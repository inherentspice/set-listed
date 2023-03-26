import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { SkillData } from "../../../types/profile";

export default async function handleDeleteSkillSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    skills: SkillData[],
    setSkills: Dispatch<SetStateAction<SkillData[]>>,
    setErr: Dispatch<SetStateAction<boolean>>,
    
  ): Promise<void> {
    try{
    e.preventDefault();
    const confirmDelete = confirm("Click OK if you actually want to delete this");
    if (confirmDelete) {
        await ProfileService.deleteSkill(id);
        const deletedSkillsState = skills.filter(skill => skill.id != id);
        setSkills(deletedSkillsState);  
    }
  } catch(err) {
    setErr(true)
  }
}
