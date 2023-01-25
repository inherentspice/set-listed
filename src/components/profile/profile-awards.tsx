import Add from "../../media/icons/add.png";
import Edit from "../../media/icons/edit.png";
import { FakeUserData } from "../../dummy-data/fake-users";
import { useParams } from "react-router-dom";

export default function ProfileAwards() {
  const { username } = useParams();
  const userIndex = FakeUserData.findIndex(x => x.username === username);

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
        {FakeUserData[userIndex].awards.map(award => {
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
