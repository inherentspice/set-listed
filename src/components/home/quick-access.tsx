import Hashtag from '../../media/icons/hashtag.png';
import Group from '../../media/icons/group.png';
import Event from '../../media/icons/event.png';
import '../../styles/quick-access.css';

const profileCardData = {
    userId: 123,
    groups: [{id: 2, name:'Open Mic Support Group', url: '/groups/openmicsupportgroup'}],
    events: [{id: 1, name:'Sad Mic at Restaurant', url: '/events/sadmic'}],
    hashtags: [{id: 9, name:'comedy', url:'/hashtags/comedy'}]
}

export default function QuickAccess(){
    return(
        <div className="quick-access-cont home-comp">
            <div className="quick-access-category-cont">
                <div className="quick-access-title">Trending Now</div>
                <div className="quick-access-item-cont">
                    <img className="quick-access-item-icon" src={Hashtag}/>
                    <div className="quick-access-item">Dave Chappelle</div>
                </div>
            </div>

            <div className="quick-access-category-cont">
                <div className="quick-access-title">Groups</div>
                <div>
                {profileCardData.groups.map(item => {
                        return(
                            <div className="quick-access-item-cont">
                                <img className="quick-access-item-icon" src={Group}/>
                                <div className="quick-access-item"><a href={item.url}>{item.name}</a></div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="quick-access-category-cont">
                <div className="quick-access-title">Upcoming Events</div>
                <div>
                {profileCardData.events.map(item => {
                        return(
                            <div className="quick-access-item-cont">
                                <img className="quick-access-item-icon" src={Event}/>
                                <div className="quick-access-item"><a href={item.url}>{item.name}</a></div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="quick-access-category-cont">
                <div className="quick-access-title">My Hashtags</div>
                <div>
                {profileCardData.hashtags.map(item => {
                        return(
                            <div className="quick-access-item-cont">
                                <img className="quick-access-item-icon" src={Hashtag}/>
                                <div className="quick-access-item"><a href={item.url}>{item.name}</a></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
