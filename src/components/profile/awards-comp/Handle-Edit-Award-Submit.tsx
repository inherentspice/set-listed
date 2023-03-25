import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { AwardData } from "../../../types/profile";

export default async function handleEditAwardSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string,
    id: string,
    awards: AwardData[],
    setAwards: Dispatch<SetStateAction<AwardData[]>>,
    handleEditAwardsToggle: (id: string) => void,
    setErr: Dispatch<SetStateAction<boolean>>
  ): Promise<void>{
      try{
        e.preventDefault();
        const formData = { content };
        const editedAward = await ProfileService.editAward(formData, id);
        const editedIndex = awards.map(function(award:any) {return award.id;}).indexOf(editedAward.data.award.id);
        const editedAwards = awards;
        editedAwards.splice(editedIndex, 1, editedAward.data.award);
        setAwards(editedAwards);
        handleEditAwardsToggle("");

      } catch(err) {
          setErr(true);
      }
  }
