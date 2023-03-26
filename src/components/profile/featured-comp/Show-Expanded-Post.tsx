import { Dispatch, ReactPortal, SetStateAction } from "react";
import ReactDOM from "react-dom";
import { FeaturedData } from "../../../types/profile";


export default function ShowExpandedPost(props:{
    featured: FeaturedData[],
    expandedPost: string,
    setExpandedPost: Dispatch<SetStateAction<string | null>>,

}): ReactPortal{
    const expandedPostData = props.featured.filter((featuredPost) => featuredPost.id === props.expandedPost)[0];

    function handleExpandedImageClose(): void{
        props.setExpandedPost(null);
      }

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
