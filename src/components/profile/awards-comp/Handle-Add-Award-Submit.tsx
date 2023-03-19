import ProfileService from "../../../services/home/profile";

export default async function handleAddAwardSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string,
    user: string,
    awards: any,
    setAwards: any,
    handleAddAwardsToggle: any,
    setErr: any
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