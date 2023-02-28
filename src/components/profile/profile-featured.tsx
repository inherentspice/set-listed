import React, { ReactPortal, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ArrowForward from "../../media/icons/arrow-forward.png";
import CancelButton from "../../media/icons/cancel.png";
import shortenText from "../../utilities/shorten-text";
import "../../styles/profiles/profile-featured.css";
import ProfileService from "../../services/home/profile";
import { FeaturedData } from "../../types/profile";
import ErrorMessage from "../error-message";


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

  function handleAddFeaturedClick(): void{
    setExpandedAddFeatured(true);
  }
  function handleEditFeaturedClick(): void{
    setExpandedEditFeaturedOverview(true);
  }

  function handleAddFeaturedClose(): void{
    setExpandedAddFeatured(false);
  }
  function handleEditFeaturedClose(): void{
    setExpandedEditFeaturedOverview(false);
  }

  function handleEditFeaturedItemClick(id: string): void{
    setExpandedEditFeaturedOverview(false);
    setExpandedEditFeaturedItem(id);
  }

  function handleEditFeaturedItemClose(): void{
    setExpandedEditFeaturedItem("");
  }

  function handleAddFeaturedSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, suppImageUpload: File | null, description: string, title: string): void{
    e.preventDefault();
    addFeatured(suppImageUpload, description, title)
      .then(() => {
      console.log("feature added");
    });
  }

  async function addFeatured(suppImageUpload: File | null, description: string, title: string) {
    const formData = new FormData();
    if (!(suppImageUpload && description && title)) {
      setErr(true);
      return;
    }
    formData.append("image", suppImageUpload);
    formData.append("content", description);
    formData.append("title", title);
    formData.append("user", props.user);
    try {
      const newSuppImage = await ProfileService.postFeatured(formData);
      const newFeatureds = featured.concat(newSuppImage.data.featured);
      setFeatured(newFeatureds);
      handleAddFeaturedClose();
    } catch (err) {
      setErr(true);
    }
  }

  function handleEditFeaturedPicSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    image: File | null,
    id: string
  ) {
    e.preventDefault();
    addFeaturedImageEdit(image, id)
      .then(() => {
        console.log("featured image changed");
      });
  }

  async function addFeaturedImageEdit(image: File | null, id: string) {
    const formData = new FormData();
    if (!image) {
      setErr(true);
      return;
    }
    formData.append("image", image);
    try {
      const editedImage = await ProfileService.editFeaturedImage(formData, id);
      const updatedFeatured = featured.map((feature) => {
        if (feature.id === editedImage.data.featured.id) {
          return editedImage.data.featured;
        } else {
          return feature;
        }
      });
      setFeatured(updatedFeatured);
      handleEditFeaturedItemClose();
    } catch (err) {
      setErr(true);
    }
  }

  function handleEditFeaturedSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title: string,
    content: string,
    id: string
  ) {
    e.preventDefault();
    addFeaturedEdit(title, content, id)
      .then(() => {
        console.log("featured post edited");
      });
  }

  async function addFeaturedEdit(
    title: string,
    content: string,
    id: string
  ) {
    const formData = {
      title,
      content,
    };
    try {
      const editedFeaturedItem = await ProfileService.editFeatured(formData, id);
      const updatedFeatured = featured.map((feature) => {
        if (feature.id === editedFeaturedItem.data.featured.id) {
          return editedFeaturedItem.data.featured;
        } else {
          return feature;
        }
      });
      setFeatured(updatedFeatured);
      handleEditFeaturedItemClose();
    } catch (err) {
      setErr(true);
    }
  }

  function handleDeleteFeaturedItemClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) {
    e.preventDefault();
    const confirmDelete = confirm("Click OK if you actually want to delete this");
    if (confirmDelete) {
      deleteFeatured(id)
        .then(() => {
          console.log("featured deleted");
        });
    }
  }

  async function deleteFeatured(id: string) {
    try {
      await ProfileService.deleteFeatured(id);
      const updatedFeatured = featured.filter((feature) => feature.id !== id);
      setFeatured(updatedFeatured);
      handleEditFeaturedClose();
    } catch (err) {
      setErr(true);
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
          {err && <ErrorMessage/>}
        </div>
      </>,
      document.body
    );
  }

  function ShowEditFeaturedOverview() {
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => handleEditFeaturedClose()}></div>
        <div className="expanded-profile-overlay-overflow">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-edit-about-title">Edit Your Featured Section</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => handleEditFeaturedClose()} />
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
                    <button className="remove-featured-item-btn" onClick={(e) => handleDeleteFeaturedItemClick(e, featuredPost.id)}>Remove this featured item</button>
                    <button onClick={() => handleEditFeaturedItemClick(featuredPost.id)}>Edit this featured item</button>
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
        <div className="expanded-profile-overlay-cont" onClick={() => handleEditFeaturedItemClose()}></div>
        <div className="expanded-profile-overlay-overflow">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-edit-about-title">Edit Your Featured Section</h2>
            <img className="start-post-cancel" src={CancelButton} onClick={() => handleEditFeaturedItemClose()} />
          </div>
          <div className="edit-profile-hero-pic">
            {imageUpload ? (
              <img src={URL.createObjectURL(imageUpload)} alt="" />
            ) : (
              <img src={featuredItem.image || ""} alt=""></img>
            )}
            <form className="edit-profile-hero-form">
              <label className="profile-add-label">
                <input className="upload-image-input" type="file" onChange={handleImageChange}></input>
              </label>
            </form>
            <button className="primary-button" type="submit" onClick={(e)=>handleEditFeaturedPicSubmit(e, imageUpload, featuredItem.id)}>Save New Featured Image</button>
          </div>
          <form className="edit-profile-hero-form">
            <label className="edit-profile-hero-form-item">Title:
              <input type="text" value={title} onChange={handleTitleChange}></input>
            </label>
            <label className="edit-profile-hero-form-item">Description:
              <textarea value={description} onChange={handleDescriptionChange}></textarea>
            </label>
            <button className="primary-button" type="submit" onClick={(e)=>handleEditFeaturedSubmit(e, title, description, featuredItem.id)}>Save Edited Feature Content</button>

          </form>
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
      <div className="featured-header">
        <h2>Featured</h2>
        <div className="profile-experience-header-buttons">
          {props.userProfile && <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-header-button" onClick={() => handleAddFeaturedClick()}><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"/></svg>}
          {props.userProfile && <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-header-button" onClick={() => handleEditFeaturedClick()}><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z" /></svg>}
        </div>
      </div>
      <div className="featured-post-cont">
        {featured.length <= 0 ? <p className="featured-no-featured-message">Feature your best content, videos, jokes, and more by clicking the add button above.</p> : featured
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
      {expandedEditFeaturedOverview && <ShowEditFeaturedOverview/>}
      {expandedEditFeaturedItem && <ShowEditFeaturedItem/>}
    </div>
  );
}
