import ProfilePicture from '../../media/home/profile-picture.png';
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
                    <div className='profile-card-user-name'>Ben Dover</div>
                    <div className='profile-card-user-tagline'>The show didn't get canceled, I quit.</div>
                </div>
            </div>

            <div className='profile-card-interaction-stats-cont'>
                <div className='profile-card-interaction-stats-item'>
                    <div className='profile-card-interaction-stat-name'>Who's viewed your profile</div>
                    <div className='profile-card-interaction-stat'>1</div>
                </div>

                <div className='profile-card-interaction-stats-item'>
                    <div className='profile-card-interaction-stat-name'>Impressions of your post</div>
                    <div className='profile-card-interaction-stat'>69</div>
                </div>
            </div>

            <div className='profile-card-ad-cont'>
                <div>Access exclusive tool and insights</div>
                <div>Try Premium for Free Brokie</div>
            </div>
        </div>
    )
}