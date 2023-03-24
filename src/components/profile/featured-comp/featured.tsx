import React, { ReactPortal, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ArrowForward from "../../media/icons/arrow-forward.png";
import CancelButton from "../../media/icons/cancel.png";
import shortenText from "../../../utilities/shorten-text";
import "../../styles/profiles/profile-featured.css";
import ProfileService from "../../../services/home/profile";
import { FeaturedData } from "../../../types/profile";
import ErrorMessage from "../../error-message";


export default function ProfileFeatured(props: {featured: FeaturedData[], user: string, userProfile: boolean}) {

  const [featureIndex, setFeatureIndex] = useState(0);
  const [expandedPost, setExpandedPost] = useState<null | string>(null);
  const [err, setErr] = useState<boolean>(false);
  const [featured, setFeatured] = useState<FeaturedData[]>(props.featured);

  const [expandedAddFeatured, setExpandedAddFeatured] = useState<boolean>(false);
  const [expandedEditFeaturedOverview, setExpandedEditFeaturedOverview] = useState<boolean>(false);
  const [expandedEditFeaturedItem, setExpandedEditFeaturedItem] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setErr(false);
    }, 5000);
  }, [err]);

  function handleAddFeaturedToggle(): void{
    setExpandedAddFeatured(!expandedAddFeatured);
  }

  function handleEditFeaturedToggle(): void{
    setExpandedEditFeaturedOverview(!expandedEditFeaturedOverview);
  }

  function handleEditFeaturedItemToggle(id: string): void{
    setExpandedEditFeaturedOverview(false);
    setExpandedEditFeaturedItem(expandedEditFeaturedItem == "" ? id : "");
  }

  async function handleAddFeaturedSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    suppImageUpload: File | null, 
    description: string, 
    title: string
    ): Promise<void> {
      try{
        e.preventDefault();
        const formData = new FormData();
        if (!(suppImageUpload && description && title)) {
          setErr(true);
          return;
        }
        formData.append("image", suppImageUpload);
        formData.append("content", description);
        formData.append("title", title);
        formData.append("user", props.user);
        const newSuppImage = await ProfileService.postFeatured(formData);
        const newFeatureds = featured.concat(newSuppImage.data.featured);
        setFeatured(newFeatureds);
        handleAddFeaturedToggle(); 
      } catch(err) {
        setErr(true)
        return Promise.reject(err);
      }
    }

  async function handleEditFeaturedPicSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    image: File | null,
    id: string
  ): Promise<void> {
    try {
      e.preventDefault();
      const formData = new FormData();
      if (!image) {
        setErr(true);
        return;
      }
      formData.append("image", image);
      const editedImage = await ProfileService.editFeaturedImage(formData, id);
      const updatedFeatured = featured.map((feature) => {
        if (feature.id === editedImage.data.featured.id) {
          return editedImage.data.featured;
        } else {
          return feature;
        }
      });
      setFeatured(updatedFeatured);
      handleEditFeaturedItemToggle("");
    } catch(err) {
      setErr(true);
      return Promise.reject(err);
    }
  }
    
  async function handleEditFeaturedSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title: string,
    content: string,
    id: string
  ): Promise<void> {
    try {
      e.preventDefault();
      const formData = {
        title,
        content,
      };
      const editedFeaturedItem = await ProfileService.editFeatured(formData, id);
      const updatedFeatured = featured.map((feature) => {
        if (feature.id === editedFeaturedItem.data.featured.id) {
          return editedFeaturedItem.data.featured;
        } else {
          return feature;
        }
      });
      setFeatured(updatedFeatured);
      handleEditFeaturedItemToggle("");

    } catch(err) {
      setErr(true);
      return Promise.reject(err);
    }
  }

  async function handleDeleteFeaturedItemClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ): Promise<void> {
    try{
      e.preventDefault();
      const confirmDelete = confirm("Click OK if you actually want to delete this");
      if (confirmDelete) {
        await ProfileService.deleteFeatured(id);
        const updatedFeatured = featured.filter((feature) => feature.id !== id);
        setFeatured(updatedFeatured);
        handleEditFeaturedToggle();
      }  
    } catch(err) {
      setErr(true);
      return Promise.reject(err);
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
        <div className="expanded-profile-overlay-cont" onClick={() => handleAddFeaturedToggle()} ></div>
        <div className="expanded-profile-overlay">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-profile-overlay-header-title">Add to Your Spotlight Section</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => handleAddFeaturedToggle()}><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
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
              <button className="secondary-button" type="submit" onClick={(e) => handleAddFeaturedSubmit(e, suppImageUpload, description, title)}>Upload New Spotlight Item</button>
            </div>
          </form>
          {err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
  }

  function ShowEditFeaturedOverview() {
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => handleEditFeaturedToggle()}></div>
        <div className="expanded-profile-overlay-overflow">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-profile-overlay-header-title">Edit Your Spotlight Section</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => handleEditFeaturedToggle()} ><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
          </div>
          <div className="edit-featured-cont">
            {featured.map((featuredPost) => {
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
                    <button className="secondary-button" onClick={(e) => handleDeleteFeaturedItemClick(e, featuredPost.id)}>Remove</button>
                    <button className="secondary-button" onClick={() => handleEditFeaturedItemToggle(featuredPost.id)}>Edit Item</button>
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

  function ShowEditFeaturedItem() {
    const featuredItem = featured.filter((item) => item.id === expandedEditFeaturedItem)[0];
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
        <div className="expanded-profile-overlay-cont" onClick={() => handleEditFeaturedItemToggle("")}></div>
        <div className="expanded-profile-overlay-overflow">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-profile-overlay-header-title">Edit Your Spotlight Section</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => handleEditFeaturedItemToggle("")} />
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
                <button className="primary-button" type="submit" onClick={(e)=>handleEditFeaturedPicSubmit(e, imageUpload, featuredItem.id)}>Save</button>
              </div>
            </div>

            <form className="edit-feature-item-form-content">
              <label className="expanded-feature-item-form-title">
                <input type="text" value={title} onChange={handleTitleChange}></input>
              </label>
              <label className="expanded-feature-item-form-textarea">
                <textarea className="featured-post-textarea" value={description} onChange={handleDescriptionChange} rows={16}></textarea>
              </label>
              <button className="primary-button" type="submit" onClick={(e)=>handleEditFeaturedSubmit(e, title, description, featuredItem.id)}>Save Edited Spotlight Content</button>

            </form>
          </div>
          
          {err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
  }


  function handleNextClick(): void{
    setFeatureIndex(prevState => {
      let nextIndex = prevState + 1;
      if (nextIndex >= Math.ceil(featured.length / 3)) {
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
    const expandedPostData = featured.filter((featuredPost) => featuredPost.id === expandedPost)[0];
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" key={expandedPostData.id}></div>
        <div className="expanded-post">
          <div className="expanded-profile-overlay-header-cont">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={handleExpandedImageClose} ><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
          </div>
          <img src={expandedPostData.image} alt=""/>
          <div className="expanded-text">
            <h1>{expandedPostData.title}</h1>
            <p>{expandedPostData.content}</p>
          </div>
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
      <div className="profile-section-header">
        <h2 className="featured-header-title">Spotlight</h2>
        <div className="profile-experience-header-buttons">
          {props.userProfile && <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-header-button" onClick={() => handleAddFeaturedToggle()}><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"/></svg>}
          {props.userProfile && <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-header-button" onClick={() => handleEditFeaturedToggle()}><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z" /></svg>}
        </div>
      </div>
      <div className="featured-post-cont">
        {featured.length <= 0 ? <p className="featured-no-featured-message">Spotlight your best content, videos, jokes, and more by clicking the add button above.</p> : featured
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
      {featured.length <= 3 ? "" : <img className="arrow-button" src={ArrowForward} alt="" onClick={handleNextClick}></img>}

      {/* if featured post is clicked, this expands the post */}
      {expandedPost && <ShowExpandedPost/>}
      {expandedAddFeatured && <ShowAddFeatured/>}
      {expandedEditFeaturedOverview && <ShowEditFeaturedOverview/>}
      {expandedEditFeaturedItem && <ShowEditFeaturedItem/>}
    </div>
  );
}
