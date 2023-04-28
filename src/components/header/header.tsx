import React, { ChangeEvent, useEffect, useState } from "react";
import "../../styles/header.css";
import Search from "../../media/icons/search.png";
import AuthService from "../../services/home/auth";
import { useUserId } from "../../context/userIdContext";
import ProfileService from "../../services/home/profile";
import HeaderSearch from "./header-search";

export default function Header() {
  const { userId, setUserId } = useUserId();
  const [ profile, setProfile] = useState<string>("");
  const [ searchStart, setSearchStart ] = useState<boolean>(false);
  const [ search, setSearch ] = useState<string>("");

  useEffect(() => {
    (async function(){
      const user = await AuthService.checkSession();
      const profile = await ProfileService.getProfileCard(user.data.user);
      setProfile(profile.data.profileCard[0].image);
      setUserId(user.data.user);
    }());
  }, [userId, setUserId]);

  function handleLogout(): void {
    AuthService.logout();
  }

  function handleSearch(): void {
    setSearchStart(!searchStart);
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>): void {
    setSearch(e.target.value);
  }

  return(
    <div className="header">
      <div className="header-cont">
        <div className="header-nav-left">
          <div className='header-nav-search'>
            <a href="../"><div className="header-cont-logo">SL</div></a>
            <div className="header-cont-search">
              <img src={Search} alt=""/>
              <input placeholder='Search' value={search} onFocus={() => handleSearch()} onChange={(e) => handleSearchChange(e)}/>
              {searchStart && <HeaderSearch search={search} setSearch={setSearch}/>}
            </div>
          </div>
        </div>

        <div className="header-nav-middle">
          <div className="header-nav-btns">
            <a href='/' className="header-nav-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="header-nav-img"><path d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z"/></svg>
              <p className="header-nav-btn-name">Home</p>
            </a>

            <a href='/my-network' className="header-nav-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="header-nav-img"><path d="M0 816v-53q0-39.464 42-63.232T150.398 676q12.158 0 23.38.5T196 678.727q-8 17.273-12 34.842-4 17.57-4 37.431v65H0Zm240 0v-65q0-65 66.5-105T480 606q108 0 174 40t66 105v65H240Zm540 0v-65q0-19.861-3.5-37.431Q773 696 765 678.727q11-1.727 22.171-2.227 11.172-.5 22.829-.5 67.5 0 108.75 23.768T960 763v53H780ZM479.8 666Q400 666 350 690q-50 24-50 61v5h360v-6q0-36-49.5-60t-130.7-24Zm-330.233-20Q121 646 100.5 625.438 80 604.875 80 576q0-29 20.562-49.5Q121.125 506 150 506q29 0 49.5 20.5t20.5 49.933Q220 605 199.5 625.5T149.567 646Zm660 0Q781 646 760.5 625.438 740 604.875 740 576q0-29 20.562-49.5Q781.125 506 810 506q29 0 49.5 20.5t20.5 49.933Q880 605 859.5 625.5T809.567 646ZM480 576q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600 456q0 50-34.5 85T480 576Zm.351-180Q455 396 437.5 413.149t-17.5 42.5Q420 481 437.351 498.5t43 17.5Q506 516 523 498.649t17-43Q540 430 522.851 413t-42.5-17ZM480 756Zm0-300Z"/></svg>
              <p className="header-nav-btn-name">My Network</p>
            </a>

            {/* The gigs section is a work in progress */}
            {/* <a href='/gigs' className="header-nav-btn">
              <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="header-nav-img"><path d="M140 936q-24 0-42-18t-18-42V396q0-24 18-42t42-18h180V236q0-24 18-42t42-18h200q24 0 42 18t18 42v100h180q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680V396H140v480Zm240-540h200V236H380v100ZM140 876V396v480Z"/></svg>
              <p className="header-nav-btn-name">Gigs</p>
            </a> */}

            <a href='/messaging' className="header-nav-btn">
              <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="header-nav-img"><path d="M306 533q17 0 28.5-11.5T346 493q0-17-11.5-28.5T306 453q-17 0-28.5 11.5T266 493q0 17 11.5 28.5T306 533Zm177 0q17 0 28.5-11.5T523 493q0-17-11.5-28.5T483 453q-17 0-28.5 11.5T443 493q0 17 11.5 28.5T483 533Zm170 0q17 0 28.5-11.5T693 493q0-17-11.5-28.5T653 453q-17 0-28.5 11.5T613 493q0 17 11.5 28.5T653 533ZM80 976V236q0-23 18-41.5t42-18.5h680q23 0 41.5 18.5T880 236v520q0 23-18.5 41.5T820 816H240L80 976Zm60-145 75-75h605V236H140v595Zm0-595v595-595Z"/></svg>
              <p className="header-nav-btn-name">Messaging</p>
            </a>


            {/* The notifications section is a work in progress */}
            {/* <a href='/notifications' className="header-nav-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="header-nav-img"><path d="M160 856v-60h84V490q0-84 49.5-149.5T424 258v-29q0-23 16.5-38t39.5-15q23 0 39.5 15t16.5 38v29q81 17 131 82.5T717 490v306h83v60H160Zm320-295Zm0 415q-32 0-56-23.5T400 896h160q0 33-23.5 56.5T480 976ZM304 796h353V490q0-74-51-126t-125-52q-74 0-125.5 52T304 490v306Z"/></svg>
              <p className="header-nav-btn-name">Notifications</p>
            </a> */}

            {userId && <a href={`/user/${userId}`} className="header-nav-btn">
              <img className='header-nav-img' src={profile} alt=""/>
              <p className="header-nav-btn-name">My Page</p>
            </a>}
          

          {/* The services section is a work in progress */}
          {/* <a href='/services' className="header-nav-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="header-nav-img"><path d="M679 590 466 377l213-213 213 213-213 213Zm-559-72V217h301v301H120Zm418 418V635h301v301H538Zm-418 0V635h301v301H120Zm60-478h181V277H180v181Zm502 51 129-129-129-129-129 129 129 129Zm-84 367h181V695H598v181Zm-418 0h181V695H180v181Zm181-418Zm192-78ZM361 695Zm237 0Z"/></svg>
            <p className="header-nav-btn-name">Services</p>
          </a> */}
          <a href="/login" className="header-nav-btn" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48" className="header-nav-img"><path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z"/></svg>
            <p className="header-nav-btn-name">Logout</p>
          </a>
          </div>
        </div>
      </div>
    </div>
  );
}
