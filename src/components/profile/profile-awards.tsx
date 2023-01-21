import Add from "../../media/icons/add.png";
import Edit from "../../media/icons/edit.png";
import { FakeUserData } from "../../dummy-data/fake-users";

export default function ProfileAwards() {
  return (
    <div className="profile-cont comp">
      <div className="editable-comp-header">
        <h2>Awards & Achievements</h2>
        <div className="profile-experience-header-buttons">
          <img className="profile-experience-header-btn" src={Add} />
          <img className="profile-experience-header-btn" src={Edit} />
        </div>
      </div>
      <div className="awards-cont">
        {FakeUserData.awards.map(award => {
          return (
          <div className="award-cont" key={award.id}>
            <h4>{award.title}</h4>
          </div>
          );
        })}
      </div>
    </div>
  );
}
