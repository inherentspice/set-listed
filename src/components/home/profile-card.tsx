import ProfilePicture from '../../media/home/profile-picture.png';
import ProfileBackground from '../../media/home/profile-background.jpg';
import '../../styles/home-profile-card.css';


export default function ProfileCard(){
    return(
        <div className='profile-card-cont'>
            <div className='profile-card-user-cont'>

                <div className='profile-card-user-img-cont'>
                    <div className='profile-card-background-img' >i</div>
                    <img className='profile-card-user-img' src={ProfilePicture}/>
                </div>

                <div className='profile-card-user-info-cont'>
                    <div className='profile-card-user-name'>Larry Writefield</div>
                    <div className='profile-card-user-tagline'>The show didn't get canceled, I quit.</div>
                </div>
            </div>

            <div className='profile-interaction-stats-cont'>
                <div className='profile-interaction-stats-views'>
                    <div className='profile-interaction-stat-name'>Who's viewed your profile</div>
                    <div className='profile-interaction-stat'>0</div>
                    <div className='profile-interaction-stat-name'>Impressions of your post</div>
                    <div className='profile-interaction-stat'>0</div>
                </div>
            </div>
        </div>
    )
}