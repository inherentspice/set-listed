import { UserConnections } from "../../dummy-data/connections";
import "../../styles/profiles/profile-potential-connections.css";

export default function ProfilePotentialFriends() {
  return (
    <div className="profile-explore-cont comp">
      <h2>People you may know</h2>
      {UserConnections.map(user => {
        return (
          <div className="profile-info-cont">
            <img src={user.img} alt="" className="profile-picture-small"></img>
            <div className="profile-text-info-cont">
              <p className="profile-name">{user.name}</p>
              <p className="profile-tag">{user.tagLine}</p>
              <button className="primary-button">Connect</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
