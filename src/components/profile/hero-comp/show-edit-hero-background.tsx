import React, {Dispatch, SetStateAction, useState} from "react";
import ErrorMessage from "../../error-message";
import ReactDOM from "react-dom";
import HandleEditBackgroundSubmit from "./handle-edit-background-submit";
import { ProfileCardData } from "../../../types/profile";

export default function ShowEditHeroBackground(props: {
    profileCard: ProfileCardData,
    handleEditBackgroundToggle: (id: string) => void,
    err: boolean,
    setProfileCard: Dispatch<SetStateAction<ProfileCardData>>,
    setErr: Dispatch<SetStateAction<boolean>>
}) {
    const [imageUpload, setImageUpload] = useState<File | null>(null);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>): void{
      if (e.target.files){
        setImageUpload(e.target.files[0]);
      }
    }

    console.log(props.profileCard);
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" key={props.profileCard.id} onClick={() => props.handleEditBackgroundToggle("")}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-profile-overlay-header-title">Edit Background Image</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="35" viewBox="0 96 960 960" width="35" className="profile-overlay-header-button" onClick={() => props.handleEditBackgroundToggle("")}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
          </div>
          <div className="edit-profile-hero-background">
            {imageUpload ? (
              <img src={URL.createObjectURL(imageUpload)} alt="" />
            ) : (
              <img src={props.profileCard.backgroundImage || "https://res.cloudinary.com/dhptcrsjc/image/upload/v1675955714/Set-Listed/default-background_wyziyb.png"} alt=""></img>
            )}
            <form className="edit-profile-hero-form">
              <label className="primary-button">
                <input className="hidden-image-input" type="file" onChange={handleImageChange}></input>
                Choose File
              </label>
            </form>
          </div>
          <div className="expanded-profile-overlay-submit">
            <button className="secondary-button" type="submit" onClick={(e)=>HandleEditBackgroundSubmit(e, imageUpload, props.profileCard, props.setProfileCard, props.handleEditBackgroundToggle, props.setErr)}>Save New Background</button>
          </div>
          {props.err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
  }
