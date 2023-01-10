import ProfilePicture from '../../media/home/profile-picture.png';
import BackgroundPicture from '../../media/home/profile-background.jpg';
import '../../styles/home-profile-card.css';
import { FakeUserData } from '../../data/fake-users';

export default function ProfileCard(){
    return(
        <div className='profile-card-cont home-comp'>
            <div className='profile-card-user-cont'>

                <div className='profile-card-user-img-cont'>
                    <img className='profile-card-background-img' src={FakeUserData.userBackgroundPicture} />
                    <img className='profile-card-user-img' src={FakeUserData.userProfilePicture}/>
                </div>

                <div className='profile-card-user-info-cont'>
                    <div className='profile-card-user-name'>{FakeUserData.userFirstName+' '+FakeUserData.userLastName}</div>
                    <div className='profile-card-user-tagline'>{FakeUserData.userTagline}</div>
                </div>
            </div>

            <div className='profile-card-interaction-stats-cont'>
                <div className='profile-card-interaction-stats-item'>
                    <div className='profile-card-interaction-stat-name'>Who's viewed your profile</div>
                    <div className='profile-card-interaction-stat'>{FakeUserData.userProfileViews}</div>
                </div>

                <div className='profile-card-interaction-stats-item'>
                    <div className='profile-card-interaction-stat-name'>Impressions of your post</div>
                    <div className='profile-card-interaction-stat'>{FakeUserData.userPostImpressions}</div>
                </div>
            </div>

            <div className='profile-card-ad-cont'>
                <div>Access exclusive tool and insights</div>
                <div>Try Premium for Free Brokie</div>
            </div>
        </div>
    )
}
