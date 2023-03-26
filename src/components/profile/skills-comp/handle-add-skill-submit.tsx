import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { SkillData } from "../../../types/profile";

export default async function handleAddSkillSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string,
    user: string,
    skills: SkillData[],
    setSkills: Dispatch<SetStateAction<SkillData[]>>,
    handleAddSkillToggle: () => void,
    setErr: Dispatch<SetStateAction<boolean>>,
    
  ): Promise<void> {
    try {
        e.preventDefault();
        const formData = { 
            content, 
            user 
        };
        const newSkill = await ProfileService.postSkill(formData);
        const newSkills = skills;
        newSkills.push(newSkill.data.skill);
        setSkills(newSkills);
        handleAddSkillToggle();
    } catch(err) {
        setErr(true);
    }
}
