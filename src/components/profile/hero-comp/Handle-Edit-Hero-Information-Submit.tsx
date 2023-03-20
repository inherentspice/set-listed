import ProfileService from "../../../services/home/profile";

export default async function HandleEditHeroInformationSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    firstName: string,
    lastName: string,
    country: string,
    city: string,
    socials: string[],
    tagline: string,
    profileCard: any,
    setProfileCard: any,
    handleEditProfileToggle: any,
    setErr: any
    ): Promise<void> {
        try{
            e.preventDefault();
            const formData = { 
                firstName,
                lastName,
                country,
                city,
                socials,
                tagline,
            };
            const editedHero = await ProfileService.editHero(formData, profileCard.user);
            setProfileCard(editedHero.data.profileCard);
            handleEditProfileToggle("");
        } catch(err) {
            setErr(true)
            return Promise.reject();
        }
    }