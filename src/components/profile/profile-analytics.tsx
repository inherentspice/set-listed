import React from "react";
// import "../../styles/profiles/profile-analytics.css";
import { ProfileCardData } from "../../types/profile";

export default function ProfileAnalytics(props: {profileCard: ProfileCardData[]}) {
   const profileCard = props.profileCard[0];
    return(
      <div className="profile-analytics-cont comp">
        <h2 className="profile-analytics-header">Analytics</h2>
          <div className="profile-analytics-items-cont">
            <div className="profile-analytics-item">
              <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-analytics-item-img"><path d="M0 816v-53q0-39.464 42-63.232T150.398 676q12.158 0 23.38.5T196 678.727q-8 17.273-12 34.842-4 17.57-4 37.431v65H0Zm240 0v-65q0-65 66.5-105T480 606q108 0 174 40t66 105v65H240Zm540 0v-65q0-19.861-3.5-37.431Q773 696 765 678.727q11-1.727 22.171-2.227 11.172-.5 22.829-.5 67.5 0 108.75 23.768T960 763v53H780ZM479.8 666Q400 666 350 690q-50 24-50 61v5h360v-6q0-36-49.5-60t-130.7-24Zm-330.233-20Q121 646 100.5 625.438 80 604.875 80 576q0-29 20.562-49.5Q121.125 506 150 506q29 0 49.5 20.5t20.5 49.933Q220 605 199.5 625.5T149.567 646Zm660 0Q781 646 760.5 625.438 740 604.875 740 576q0-29 20.562-49.5Q781.125 506 810 506q29 0 49.5 20.5t20.5 49.933Q880 605 859.5 625.5T809.567 646ZM480 576q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600 456q0 50-34.5 85T480 576Zm.351-180Q455 396 437.5 413.149t-17.5 42.5Q420 481 437.351 498.5t43 17.5Q506 516 523 498.649t17-43Q540 430 522.851 413t-42.5-17ZM480 756Zm0-300Z"/></svg>
              <div className="profile-analytics-info-cont">
                <div className="profile-analytics-type">{profileCard.userProfileViews + " profile views"}</div>
                <div className="profile-analytics-description">See who viewed your profile.</div>
              </div>
            </div>
            <div className="profile-analytics-item">
              <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-analytics-item-img"><path d="M160 896V456h140v440H160Zm250 0V256h140v640H410Zm250 0V616h140v280H660Z"/></svg>
              <div className="profile-analytics-info-cont">
                <p className="profile-analytics-type">{profileCard.userPostImpressions + " post impressions"}</p>
                <p className="profile-analytics-description">See who has engaged with your posts.</p>
              </div>
            </div>
            <div className="profile-analytics-item">
              <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="profile-analytics-item-img"><path d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z"/></svg>
              <div className="profile-analytics-info-cont">
              {/* to fix when added to backend */}
                <p className="profile-analytics-type">{"0 search appearances"}</p>
                <p className="profile-analytics-description">See how often you have appeared in search results.</p>
              </div>
            </div>
          </div>
        </div>
    );
}
