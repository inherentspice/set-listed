import { useEffect, useState } from "react";
import { AwardData } from "../../../types/profile";
import "../../../styles/profiles/profile-awards.css";
import ShowAddAwards from "./Show-Add-Awards";
import ShowEditAwards from "./Show-Edit-Awards";


export default function ProfileAwards(props: {awards: AwardData[], user: string, userProfile: boolean}) {

  const [expandedAddAwards, setExpandedAddAwards] = useState<boolean>(false);
  const [expandedEditAwards, setExpandedEditAwards] = useState<string | null>(null);
  const [err, setErr] = useState<boolean>(false);
  const [awards, setAwards] = useState<AwardData[]>(props.awards);

  useEffect(() => {
    setTimeout(() => {
      setErr(false);
    }, 5000);
  }, [err]);

  function handleAddAwardsToggle(): void{
    setExpandedAddAwards(!expandedAddAwards);
  }
  function handleEditAwardsToggle(id: string): void{
    setExpandedEditAwards(expandedEditAwards == null ? id : null);
  }

  return (
    <div className="profile-cont comp">
      <div className="profile-section-header">
        <h2 className="awards-header-title">Awards & Achievements</h2>
        {props.userProfile && <div className="profile-experience-header-buttons">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-header-button" onClick={() => handleAddAwardsToggle()}><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"/></svg>
        </div>}
      </div>
      <div className="awards-cont">
        {awards.length <=0 ? <p>You haven't added any awards yet.</p> : awards.map(award => {
          return (
          <div className="award-cont" key={award.id}>
            <h4>{award.content}</h4>
            {props.userProfile && <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-section-body-button" onClick={() => handleEditAwardsToggle(award.id)}><path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>}
          </div>
          );
        })}
      </div>
      {expandedAddAwards && <ShowAddAwards handleAddAwardsToggle={handleAddAwardsToggle} err={err} user={props.user} awards={awards} setAwards={setAwards} setErr={setErr}/>}
      {expandedEditAwards && <ShowEditAwards awards={awards} expandedEditAwards={expandedEditAwards} handleEditAwardsToggle={handleEditAwardsToggle} err={err} setAwards={setAwards} setErr={setErr} />}
    </div>
  );
}
