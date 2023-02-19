import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../../styles/profile-about.css";
import Edit from "../../media/icons/edit.png";
import CancelButton from "../../media/icons/cancel.png";
import { AboutData } from "../../types/profile";
import ProfileService from "../../services/home/profile";


export default function ProfileAbout(props: {about: AboutData[]}) {
  const [expandedEditAbout, setExpandedEditAbout] = useState<null | string>(null);
  const [about, setAbout] = useState<AboutData>(props.about[0]);

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
      }).catch((err) => {
        console.log(err);
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
      console.log(err);
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
          </div>
        </div>
      </>,
      document.body
    );
  }


  return(
    <div className="profile-about-cont comp">
      <div className="profile-about-title-cont">
        <div className="profile-about-title">About</div>
        <img className="profile-about-edit" src={Edit} onClick={() => handleEditAboutClick(about.id)} />
      </div>
      <div className="profile-about-text">{about.content}</div>
      {expandedEditAbout && <ShowEditProfileAbout />}
    </div>
  );
}
