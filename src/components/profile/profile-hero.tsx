import BackgroundPicture from '../../media/home/profile-background.jpg';
import ProfilePicture from '../../media/home/profile-picture.png';

export default function ProfileHero() {
    return(
        <div className="profile-hero-cont">
            <img className="profile-hero-background-img" src={BackgroundPicture}/>
            <img className="profile-hero-profile-img" src={ProfilePicture} />
            <div className="profile-hero-user-name">Ben Dover</div>
            <div className='profile-hero-tagline'>The show didn't get canceled, I quit.</div>
            <div className='profile-hero-performer-type'>Comedian</div>
            <div className='profile-hero-contact-cont'>
                <div className='profile-hero-location'>Bangdik, Thailand</div>
                <div className='profile-hero-contact'>Contact Info</div>
            </div>
            <div className='profile-hero-connections'>500+ connections</div>
            <div className='profile-hero-mutual-connections-cont'>
                <div className='profile-hero-mutual-connections-imgs'></div>
                <div className='profile-hero-mutual-connections-names'></div>
            </div>
        </div>
    )
}