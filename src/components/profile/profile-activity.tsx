import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../../styles/profile-activity.css";
import Like from "../../media/icons/like.png";
import Dislike from "../../media/icons/dislike.png";
import { FakeUserData } from "../../dummy-data/fake-users";
import convertDate from "../../utilities/convert-date";
import { useParams } from "react-router-dom";
import CancelButton from "../../media/icons/cancel.png";
import Emoji from "../../media/icons/emoji.png";
import Picture from "../../media/icons/picture.png";
import Video from "../../media/icons/video.png";
import Document from "../../media/icons/document.png";
import Chart from "../../media/icons/chart.png";
import Visibility from "../../media/icons/visibility.png";
import Comments from "../../media/icons/comments.png";


export default function ProfileActivity() {
    const [expandedStartPost, setExpandedStartPost] = useState<null | number>(null);

    const { username } = useParams();
    const userIndex = FakeUserData.findIndex(x => x.username === username);

    function handleStartPostClick(id: number): void{
        setExpandedStartPost(id);
      }

      function handleStartPostClose(): void{
        setExpandedStartPost(null);
      }
    
      function ShowStartPost() {
        return ReactDOM.createPortal(
          <>
            <div className="expanded-profile-overlay-cont" key={FakeUserData[userIndex].id}></div>
            <div className="expanded-profile-overlay">
              <div className="expanded-profile-overlay-header-cont">
                <h2 className="expanded-start-post-title">Edit Your About Section</h2>
                <img className="start-post-cancel" src={CancelButton} onClick={() => handleStartPostClose()} />
              </div>
              <form className="start-post-user-form">
                  <div className="start-post-user-cont">
                    <img className="profile-picture-small" src={FakeUserData[userIndex].userProfilePicture} />
                    <img src={Visibility}/>
                    <select className="start-post-visibility">
                        <option value="public">Public</option>
                        <option value="connections">Connections Only</option>
                        <option value="innercircle">Inner Circle Only</option>
                        <option value="private">Only Me</option>
                    </select>
                  </div>
                  <textarea className="start-post-textarea" placeholder="What is on your mind?" rows={10} />
                  <div className="start-post-emoji-hashtag-cont">
                      <button className="hidden-btn" title="Add Emoji"><img className="start-post-add-emoji" src={Emoji}></img></button>
                      <div className="start-post-add-hashtag">Add Hashtag</div>
                  </div>
                  <div className="start-post-foot">
                      <div className="start-post-foot-multimedia-cont">
                          <button className="hidden-btn" title="Add Picture"><img className="start-post-foot-multimedia-item" src={Picture} /></button>
                          <button className="hidden-btn" title="Add Video"><img className="start-post-foot-multimedia-item" src={Video} /></button>
                          <button className="hidden-btn" title="Add Document"><img className="start-post-foot-multimedia-item" src={Document} /></button>
                          <button className="hidden-btn" title="Add Poll"><img className="start-post-foot-multimedia-item" src={Chart} /></button>
                      </div>
                      <div className="start-post-foot-submit-cont">
                          <img src={Comments}/>
                          <select>
                              <option value="public">Public</option>
                              <option value="connections">Connections</option>
                              <option value="innercircle">Inner Circle</option>
                              <option value="noone">Disable</option>
                          </select>
                          <button type="submit">Post</button>
                      </div>
                  </div>
              </form>
            </div>
          </>,
          document.body
        );
      }
    

    return(
        <div className="profile-activity-cont comp">
            <div className="profile-activity-header">
                <div className="profile-activity-header-left">
                    <div className="profile-activity-header-title">Activity</div>
                    <div className="profile-activity-header-followers">{FakeUserData[userIndex].userFollwers+" followers"}</div>
                </div>
                <div className="profile-activity-header-right">
                    <div className="profile-activity-start-post" onClick={() => handleStartPostClick(FakeUserData[userIndex].id)}>Start a Post</div>
                </div>
            </div>
            <div className="profile-activity-posts-cont">
                {FakeUserData[0].activity.map(item => {
                    return(
                        <div className="profile-activity-post-item" key={item.id}>
                        <div className="profile-activity-post-info">
                            <div className="profile-activity-post-author">{FakeUserData[userIndex].userFirstName+" "+FakeUserData[userIndex].userLastName}</div>
                            <div className="profile-activity-post-time">{"posted this | "+convertDate(item.date)}</div>
                        </div>
                        <div className="profile-activity-post-description">{item.description}</div>
                        <div className="profile-activity-post">
                            <img className="profile-activity-post-img" src={item.img} />
                            <div className="profile-activity-post-right">
                                <div className="profile-activity-post-title">{item.title}</div>
                                <div className="profile-activity-post-about">
                                    <div className="profile-activity-post-url">{item.url}</div>
                                    <div>|</div>
                                    <div className="profile-activity-post-read-time">{item.read+" read"}</div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-activity-post-likes">
                            <img className="profile-activity-post-like-img" src={Like} />
                            <div className="profile-activity-post-like-count">{item.likes}</div>
                            <img className="profile-activity-post-like-img" src={Dislike} />
                            <div className="profile-activity-post-like-count">{item.dislikes}</div>
                        </div>
                    </div>

                    );
                })}
            </div>
            <div className="profile-activity-show-all">Show all activity</div>
            {expandedStartPost && <ShowStartPost />}
        </div>
    );
}
