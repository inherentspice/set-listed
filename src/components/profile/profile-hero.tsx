import { FakeUserData } from "../../dummy-data/fake-users"

export default function ProfileHero() {
    return(
        <div className="profile-hero-cont">
            <img className="profile-hero-background-img" src={FakeUserData.userBackgroundPicture}/>
            <img className="profile-hero-profile-img" src={FakeUserData.userProfilePicture} />
            <div className="profile-hero-user-name">{FakeUserData.userFirstName+' '+ FakeUserData.userLastName}</div>
            <div className='profile-hero-tagline'>The show didn't get canceled, I quit.</div>
            <div className='profile-hero-performer-type'>Comedian</div>
            <div className='profile-hero-contact-cont'>
                <div className='profile-hero-location'>Bangdik, Thailand</div>
                <div className='profile-hero-contact'>Contact Info</div>
            </div>
            <div className='profile-hero-connections'>500+ connections</div>
            <div className='profile-hero-mutual-connections-cont'>
                <div className='profile-hero-mutual-connections-imgs'></div>
                <div className='profile-hero-mutual-connections-names'>John Doe, Steve Smiff</div>
            </div>
        </div>
    )
}