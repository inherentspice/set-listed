import ProfileService from "../../../services/home/profile";

export default async function handleEditAwardSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string,
    id: string,
    awards: any,
    setAwards: any,
    handleEditAwardsToggle: any,
    setErr: any
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