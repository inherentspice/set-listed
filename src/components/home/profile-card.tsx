import ProfilePicture from '../../media/home/profile-picture.png';
import BackgroundPicture from '../../media/home/profile-background.jpg';
import '../../styles/home-profile-card.css';


const profileCardData = {
        userProfilePicture: ProfilePicture,
        userBackgroundPicture: BackgroundPicture,
        userFirstName: 'Ben',
        userLastName: 'Dover',
        userTagline: "The show didn't get canceled, I quit.",
        userProfileViews: 1,
        userPostImpressions: 69,
    }


export default function ProfileCard(){
    return(
        <div className='profile-card-cont'>
            <div className='profile-card-user-cont'>

                <div className='profile-card-user-img-cont'>
                    <img className='profile-card-background-img' src={profileCardData.userBackgroundPicture} />
                    <img className='profile-card-user-img' src={profileCardData.userProfilePicture}/>
                </div>

                <div className='profile-card-user-info-cont'>
                    <div className='profile-card-user-name'>{profileCardData.userFirstName+' '+profileCardData.userLastName}</div>
                    <div className='profile-card-user-tagline'>{profileCardData.userTagline}</div>
                </div>
            </div>

            <div className='profile-card-interaction-stats-cont'>
                <div className='profile-card-interaction-stats-item'>
                    <div className='profile-card-interaction-stat-name'>Who's viewed your profile</div>
                    <div className='profile-card-interaction-stat'>{profileCardData.userProfileViews}</div>
                </div>

                <div className='profile-card-interaction-stats-item'>
                    <div className='profile-card-interaction-stat-name'>Impressions of your post</div>
                    <div className='profile-card-interaction-stat'>{profileCardData.userPostImpressions}</div>
                </div>
            </div>

            <div className='profile-card-ad-cont'>
                <div>Access exclusive tool and insights</div>
                <div>Try Premium for Free Brokie</div>
            </div>
        </div>
    )
}