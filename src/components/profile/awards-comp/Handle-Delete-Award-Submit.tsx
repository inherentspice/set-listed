import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { AwardData } from "../../../types/profile";

export default async function handleDeleteAwardSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    awards: AwardData[],
    setAwards: Dispatch<SetStateAction<AwardData[]>>,
    handleEditAwardsToggle: (id: string) => void,
    setErr: Dispatch<SetStateAction<boolean>>

  ): Promise<void> {
      try {
        e.preventDefault();
        const confirmDelete = confirm("Click OK if you actually want to delete this");
        if (confirmDelete) {
            await ProfileService.deleteAward(id);
            const deletedAwardsState = awards.filter((award:any) => award.id != id);
            setAwards(deletedAwardsState);
            handleEditAwardsToggle("");
        }
      } catch(err){
          setErr(true);
      }
  }
