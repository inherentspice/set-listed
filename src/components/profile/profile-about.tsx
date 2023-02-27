import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../../styles/profiles/profile-about.css";
import Edit from "../../media/icons/edit.png";
import CancelButton from "../../media/icons/cancel.png";
import { AboutData } from "../../types/profile";
import ProfileService from "../../services/home/profile";
import ErrorMessage from "../error-message";


export default function ProfileAbout(props: {about: AboutData[], userProfile: boolean}) {
  const [expandedEditAbout, setExpandedEditAbout] = useState<null | string>(null);
  const [about, setAbout] = useState<AboutData>(props.about[0]);
  const [err, setErr] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setErr(false);
    }, 5000);
  }, [err]);

  function handleEditAboutClick(id: string): void{
    setExpandedEditAbout(id);
  }

  function handleEditAboutClose(): void{
    setExpandedEditAbout(null);
  }

  function handleAddAboutEditSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    content: string
  ) {
    e.preventDefault();
    addAboutEdit(content, about.user)
      .then(() => {
        console.log("about edited");
      });
  }

  async function addAboutEdit(content: string, user: string) {
    const formData = {
      content
    };
    try {
      const editedAbout = await ProfileService.editAbout(formData, user);
      setAbout(editedAbout.data.about);
      handleEditAboutClose();
    } catch (err) {
      setErr(true);
    }
  }

  function ShowEditProfileAbout() {
    const [content, setContent] = useState<string>(about.content);

    function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>): void{
      setContent(e.target.value);
    }

    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" key={about.id} onClick={() => handleEditAboutClose()}></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-edit-about-title">Edit Your About Section</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => handleEditAboutClose()} />
          </div>
          <div className="edit-profile-about-body">
            <div className="edit-profile-about-explanation"></div>
            <form className="edit-profile-about-form">
              <textarea
                className="edit-profile-about-text-area"
                defaultValue={content}
                rows={10}
                cols={70}
                maxLength={2000}
                onChange={handleContentChange}
              ></textarea>
              <div className="expanded-profile-overlay-submit">
                <button className="expanded-profile-overlay-submit-btn" type="submit" onClick={(e) => handleAddAboutEditSubmit(e, content)}>Save</button>
              </div>
            </form>
            {err && <ErrorMessage/>}
          </div>
        </div>
      </>,
      document.body
    );
  }


  return(
    <div className="profile-about-cont comp">
      <div className="profile-about-title-cont">
        <h2 className="profile-about-title">About</h2>

        {props.userProfile && <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-about-edit" onClick={() => handleEditAboutClick(about.id)}><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z" /></svg>}
      </div>
      {about.content.length <=0 ? <p>Add a short bio about yourself by clicking the edit bio button above!</p> : <div className="profile-about-text">{about.content}</div> }
      {expandedEditAbout && <ShowEditProfileAbout />}
    </div>
  );
}
