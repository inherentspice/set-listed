import { Dispatch, SetStateAction } from "react";
import ProfileService from "../../../services/home/profile";
import { ProfileCardData } from "../../../types/profile";

export default async function HandleEditHeroInformationSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    firstName: string,
    lastName: string,
    country: string,
    city: string,
    socials: string[],
    tagline: string,
    profileCard: ProfileCardData,
    setProfileCard: Dispatch<SetStateAction<ProfileCardData>>,
    handleEditProfileToggle: (id: string) => void,
    setErr: Dispatch<SetStateAction<boolean>>
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
