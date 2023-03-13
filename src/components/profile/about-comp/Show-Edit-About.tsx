import ErrorMessage from "../../error-message";
import ReactDOM from "react-dom";
import React, {useState} from "react";
import { AboutData } from "../../../types/profile";
import { handleAddAboutEditClick } from "./Handle-Add-About-Edit-Click";


export default function ShowEditAbout(props: {about:AboutData, setAbout:any, content:string, err: boolean, setContent: any, handleExpandEditAboutToggle: any, setErr: any}) {

    function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>): void{
      props.setContent(e.target.value);
    }

    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" key={props.about.id} onClick={() => props.handleExpandEditAboutToggle()}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-profile-overlay-header-title">Edit Your About Section</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => props.handleExpandEditAboutToggle()}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
          </div>
          <div className="edit-profile-about-body">
            <p className="edit-profile-about-explanation">Give a brief description about yourself below so everyone else can get to know you.</p>
            <form className="edit-profile-about-form">
              <textarea
                className="edit-profile-about-text-area"
                defaultValue={props.content}
                rows={10}
                cols={70}
                maxLength={2000}
                onChange={handleContentChange}
              ></textarea>
              <div className="expanded-profile-overlay-submit">
                <button className="secondary-button" type="submit" onClick={(e) => handleAddAboutEditClick(e, props.content, props.about.user, props.setAbout, props.handleExpandEditAboutToggle, props.setErr)}>Save</button>
              </div>
            </form>
            {props.err && <ErrorMessage/>}
          </div>
        </div>
      </>,
      document.body
    );
  }
