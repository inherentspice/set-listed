import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { AwardData } from "../../../types/profile";

export default async function handleAddAwardSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string,
    user: string,
    awards: AwardData[],
    setAwards: Dispatch<SetStateAction<AwardData[]>>,
    handleAddAwardsToggle: () => void,
    setErr: Dispatch<SetStateAction<boolean>>
  ): Promise<void>{
    try{
        e.preventDefault();
        const formData = { content, user }
        const newAward = await ProfileService.postAward(formData);
        const newAwards = awards.concat(newAward.data.award);
        setAwards(newAwards);
        handleAddAwardsToggle();
    } catch(err){
        setErr(true);
    }
  }
