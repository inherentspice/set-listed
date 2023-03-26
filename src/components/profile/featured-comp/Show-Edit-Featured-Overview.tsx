import { Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";
import { FeaturedData } from "../../../types/profile";
import shortenText from "../../../utilities/shorten-text";
import handleDeleteFeaturedItemClick from "./Handle-Delete-Featured-Item-Click";



export default function ShowEditFeaturedOverview(props:{
    handleEditFeaturedToggle: () => void,
    featured: FeaturedData[],
    handleEditFeaturedItemToggle: (id: string) => void,
    setFeatured: Dispatch<SetStateAction<FeaturedData[]>>,
    setErr: Dispatch<SetStateAction<boolean>>

}) {
    return ReactDOM.createPortal(
      <>
        <div className="expanded-profile-overlay-cont" onClick={() => props.handleEditFeaturedToggle()}></div>
        <div className="expanded-profile-overlay-overflow">
          <div className="expanded-profile-overlay-header-cont">
            <h2 className="expanded-profile-overlay-header-title">Edit Your Spotlight Section</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-overlay-header-button" onClick={() => props.handleEditFeaturedToggle()} ><path d="m330 768 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42Zm150 208q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
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
                    <button className="secondary-button" onClick={(e) => handleDeleteFeaturedItemClick(e, featuredPost.id, props.featured, props.setFeatured, props.handleEditFeaturedToggle, props.setErr)}>Remove</button>
                    <button className="secondary-button" onClick={() => props.handleEditFeaturedItemToggle(featuredPost.id)}>Edit Item</button>
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
