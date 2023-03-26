import React, {Dispatch, SetStateAction, useState} from "react";
import ReactDOM from "react-dom";
import ErrorMessage from "../../error-message";
import handleAddFeaturedSubmit from "./Handle-Add-Featured-Submit";
import { FeaturedData } from "../../../types/profile";


export default function ShowAddFeatured( props: {
    handleAddFeaturedToggle: () => void,
    err: boolean,
    user: string,
    featured: FeaturedData[],
    setErr: Dispatch<SetStateAction<boolean>>,
    setFeatured: Dispatch<SetStateAction<FeaturedData[]>>,

}) {
    const [title, setTitle] = useState<string>("");
    const [suppImageUpload, setSuppImageUpload] = useState<File | null>(null);
    const [description, setDescription] = useState<string>("");

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>): void{
      setTitle(e.target.value);
    }

    function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>): void{
      setDescription(e.target.value);
    }
    function handleSuppImageChange(e: React.ChangeEvent<HTMLInputElement>): void{
      if (e.target.files){
        setSuppImageUpload(e.target.files[0]);
      }
    }

    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => props.handleAddFeaturedToggle()} ></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-profile-overlay-header-title">Add to Your Spotlight Section</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => props.handleAddFeaturedToggle()}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
          </div>
          <form className="start-post-user-form">
            <label className="profile-add-label">
              Title:
              <input type="text" value={title} onChange={handleTitleChange} />
            </label>
            <label className="profile-add-label">
              <textarea className="profile-add-textarea" placeholder="Give a brief description here.." value={description} rows={10} cols={60} onChange={handleDescriptionChange} />
            </label>
            <label className="primary-button">
              Add Supplementary Image
              <input className="hidden-image-input" type="file" onChange={handleSuppImageChange} />
            </label>
            <div className="expanded-profile-overlay-submit">
              <button className="secondary-button" type="submit" onClick={(e) => handleAddFeaturedSubmit(e, suppImageUpload, description, title, props.user, props.featured, props.setErr, props.setFeatured, props.handleAddFeaturedToggle)}>Upload New Spotlight Item</button>
            </div>
          </form>
          {props.err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
  }
