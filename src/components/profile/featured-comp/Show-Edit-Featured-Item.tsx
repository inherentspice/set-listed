import { Dispatch, SetStateAction, useState } from "react";
import ReactDOM from "react-dom";
import ErrorMessage from "../../error-message";
import { FeaturedData } from "../../../types/profile";
import CancelButton from "../../../media/icons/cancel.png";
import handleEditFeaturedPictureSubmit from "./Handle-Edit-Featured-Picture-Submit";
import handleEditFeaturedSubmit from "./Handle-Edit-Featured-Submit";

export default function ShowEditFeaturedItem(props:{
  featured: FeaturedData[],
  expandedEditFeaturedItem: string,
  handleEditFeaturedItemToggle: (id: string) => void,
  err: boolean,
  setFeatured: Dispatch<SetStateAction<FeaturedData[]>>,
  setErr: Dispatch<SetStateAction<boolean>>


}) {
    const featuredItem = props.featured.filter((item) => item.id === props.expandedEditFeaturedItem)[0];
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [title, setTitle] = useState<string>(featuredItem.title);
    const [description, setDescription] = useState<string>(featuredItem.content);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>): void{
      if (e.target.files){
        setImageUpload(e.target.files[0]);
      }
    }

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>): void{
      setTitle(e.target.value);
    }

    function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>): void{
      setDescription(e.target.value);
    }

    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => props.handleEditFeaturedItemToggle("")}></div>
        <div className="expanded-profile-overlay-overflow">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-profile-overlay-header-title">Edit Your Spotlight Section</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => props.handleEditFeaturedItemToggle("")} />
          </div>
          <div className="edit-featured-item-body">
            <div className="edit-featured-item-picture">
              {imageUpload ? (
                <img src={URL.createObjectURL(imageUpload)} alt="" />
              ) : (
                <img src={featuredItem.image || ""} alt=""></img>
              )}
              <div className="edit-feature-item-picture-buttons">
                <form className="edit-feature-item-form">
                  <label className="primary-button">
                    <input className="hidden-image-input" type="file" onChange={handleImageChange}></input>
                    Upload
                  </label>
                </form>
                <button className="primary-button" type="submit" onClick={(e)=>handleEditFeaturedPictureSubmit(e, imageUpload, featuredItem.id, props.featured, props.setFeatured, props.handleEditFeaturedItemToggle, props.setErr)}>Save</button>
              </div>
            </div>

            <form className="edit-feature-item-form-content">
              <label className="expanded-feature-item-form-title">
                <input type="text" value={title} onChange={handleTitleChange}></input>
              </label>
              <label className="expanded-feature-item-form-textarea">
                <textarea className="featured-post-textarea" value={description} onChange={handleDescriptionChange} rows={16}></textarea>
              </label>
              <button className="primary-button" type="submit" onClick={(e)=>handleEditFeaturedSubmit(e, title, description, featuredItem.id, props.featured, props.setFeatured, props.handleEditFeaturedItemToggle, props.setErr)}>Save Edited Spotlight Content</button>

            </form>
          </div>
          
          {props.err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
  }
