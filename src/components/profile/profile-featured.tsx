import React, { ReactPortal, useState } from "react";
import ReactDOM from "react-dom";
import Add from "../../media/icons/add.png";
import Edit from "../../media/icons/edit.png";
import ArrowForward from "../../media/icons/arrow-forward.png";
import CancelButton from "../../media/icons/cancel.png";
import shortenText from "../../utilities/shorten-text";
import "../../styles/profile-featured.css";
import ProfileService from "../../services/home/profile";
import { FeaturedData } from "../../types/profile";


export default function ProfileFeatured(props: {featured: FeaturedData[], user: string}) {

  const [featureIndex, setFeatureIndex] = useState(0);
  const [expandedPost, setExpandedPost] = useState<null | string>(null);

  const [expandedAddFeatured, setExpandedAddFeatured] = useState<boolean>(false);
  const [expandedEditFeatured, setExpandedEditFeatured] = useState<boolean>(false);

  function handleAddFeaturedClick(): void{
    setExpandedAddFeatured(true);
  }
  function handleEditFeaturedClick(): void{
    setExpandedEditFeatured(true);
  }

  function handleAddFeaturedClose(): void{
    setExpandedAddFeatured(false);
  }
  function handleEditFeaturedClose(): void{
    setExpandedEditFeatured(false);
  }

  function handleAddFeaturedSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, suppImageUpload: File | null, description: string, title: string): void{
    e.preventDefault();
    addFeatured(suppImageUpload, description, title)
      .then(() => {
      console.log("feature added");
    }).catch((err) => {
      console.log(err);
    });
  }

  async function addFeatured(suppImageUpload: File | null, description: string, title: string) {
    const formData = new FormData();
    if (suppImageUpload && description && title) {
      formData.append("image", suppImageUpload);
      formData.append("content", description);
      formData.append("title", title);
      formData.append("user", props.user);
      try {
        const newSuppImage = await ProfileService.postFeatured(formData);
        console.log(newSuppImage);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("missing content");
    }
  }

  function ShowAddFeatured() {
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
        <div className="expanded-profile-overlay-cont" onClick={() => handleAddFeaturedClose()} ></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-edit-about-title">Add to Your Featured Section</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => handleAddFeaturedClose()} />
          </div>
          <form className="start-post-user-form">
            <label className="profile-add-label">
              Title:
              <input type="text" value={title} onChange={handleTitleChange} />
            </label>
            <label className="profile-add-label">
              Description:
              <textarea className="profile-add-textarea" placeholder="" value={description} rows={10} onChange={handleDescriptionChange} />
            </label>
            <label className="profile-add-label">
              Add Supplementary Image:
              <input className="upload-image-input" type="file" onChange={handleSuppImageChange} />
            </label>
            <button className="primary-button" type="submit" onClick={(e) => handleAddFeaturedSubmit(e, suppImageUpload, description, title)}>Upload New Featured Item</button>
          </form>
        </div>
      </>,
      document.body
    );
  }

  function ShowEditFeatured() {
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => handleEditFeaturedClose()}></div>
        <div className="expanded-profile-overlay-overflow">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-edit-about-title">Edit Your Featured Section</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => handleEditFeaturedClose()} />
          </div>
          <div className="edit-featured-cont">
            {props.featured.map((featuredPost) => {
              return (
                <div className="edit-featured-item-cont" key={featuredPost.id}>
                  <div className="edit-featured-item">
                    <img className="edit-featured-img" src={featuredPost.image} alt=""/>
                    <div className="edit-featured-info-cont">
                      <h4>{featuredPost.title}</h4>
                      {featuredPost.content.length <= 150 ?
                      <p>{featuredPost.content}</p> :
                      <p>{shortenText(featuredPost.content, 150)}</p>}
                    </div>
                  </div>
                  <div className="remove-featured-item">
                    <button className="remove-featured-item-btn">Remove this featured item</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>,
      document.body
    );
  }


  function handleNextClick(): void{
    setFeatureIndex(prevState => {
      let nextIndex = prevState + 1;
      if (nextIndex >= Math.ceil(props.featured.length / 3)) {
        nextIndex = 0;
      }
      return nextIndex;
    });
  }

  function handlePostClick(id: string | undefined): void{
    if (id) {
      setExpandedPost(id);
    }
  }

  // Uses createPortal to insert new div into the body

  function ShowExpandedPost(): ReactPortal{
    const expandedPostData = props.featured.filter((featuredPost) => featuredPost.id === expandedPost)[0];
    return ReactDOM.createPortal(
      <>
        <div className="expanded-post-cont" key={expandedPostData.id}></div>
        <div className="expanded-post">
          <img src={expandedPostData.image} alt=""/>
          <div className="expanded-text">
            <h4>{expandedPostData.title}</h4>
            <p>{expandedPostData.content}</p>
          </div>
          <img src={CancelButton} alt="" onClick={handleExpandedImageClose} className="close-button"></img>
        </div>
      </>,
      document.body
    );
  }

  function handleExpandedImageClose(): void{
    setExpandedPost(null);
  }

  return (
    <div className="profile-cont comp">
      <div className="editable-comp-header">
        <h2>Featured</h2>
        <div className="profile-experience-header-buttons">
          <img className="profile-experience-header-btn" src={Add} onClick={() => handleAddFeaturedClick()} />
          <img className="profile-experience-header-btn" src={Edit} onClick={() => handleEditFeaturedClick()}/>
        </div>
      </div>
      <div className="featured-post-cont">
        {props.featured
        .filter((featuredPost, index) => index >= featureIndex && index < featureIndex + 3)
        .map((featuredPost) => {
          return (
            <div className="featured-post" key={featuredPost.id} onClick={() => handlePostClick(featuredPost.id)}>
              <img src={featuredPost.image} alt=""/>
              <h4>{featuredPost.title}</h4>
              {featuredPost.content.length <= 150 ?
              <p>{featuredPost.content}</p> :
              <p>{shortenText(featuredPost.content, 150)}</p>}
            </div>
          );
        })}
      </div>
      <img className="arrow-button" src={ArrowForward} alt="" onClick={handleNextClick}></img>

      {/* if featured post is clicked, this expands the post */}
      {expandedPost && <ShowExpandedPost/>}
      {expandedAddFeatured && <ShowAddFeatured/>}
      {expandedEditFeatured && <ShowEditFeatured/>}
    </div>
  );
}
