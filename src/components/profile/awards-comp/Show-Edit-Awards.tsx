import React, {useState} from "react";
import ErrorMessage from "../../error-message";
import ReactDOM from "react-dom";
import { AwardData } from "../../../types/profile";
import handleEditAwardSubmit from "./Handle-Edit-Award-Submit";
import handleDeleteAwardSubmit from "./Handle-Delete-Award-Submit";


export default function ShowEditAwards(props: {awards:any, expandedEditAwards: any, handleEditAwardsToggle: any, err:boolean, setAwards:any, setErr:any}) {
    const expAward = props.awards.filter((award:any) => award.id === props.expandedEditAwards)[0];
    const [content, setContent] = useState<string>(expAward.content);

    function handleContentChange(e: React.ChangeEvent<HTMLInputElement>): void{
      setContent(e.target.value);
    }

    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => props.handleEditAwardsToggle("")}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-profile-overlay-header-title">Edit Your Award</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => props.handleEditAwardsToggle("")}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
          </div>
          <form className="expanded-profile-overlay-form">
            <div className="expanded-profile-overlay-form-item">
              <label>Award:</label>
              <input defaultValue={content} onChange={handleContentChange}></input>
            </div>
            <div className="expanded-profile-overlay-submit">
              <button
                className="secondary-button"
                type="submit"
                onClick={(e) => handleEditAwardSubmit(e, content, expAward.id, props.awards, props.setAwards, props.handleEditAwardsToggle, props.setErr)}
              >Save Edits</button>
              <button
                className="secondary-button"
                onClick={(e) => handleDeleteAwardSubmit(e, expAward.id, props.awards, props.setAwards, props.handleEditAwardsToggle, props.setErr)}
              >Delete Award</button>
            </div>
          </form>
          {props.err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
  }