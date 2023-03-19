import ProfileService from "../../../services/home/profile";

export default async function handleDeleteAwardSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    awards: any,
    setAwards: any,
    handleEditAwardsToggle: any,
    setErr: any

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