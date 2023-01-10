import Hashtag from '../../media/icons/hashtag.png';
import Group from '../../media/icons/group.png';
import Event from '../../media/icons/event.png';
import '../../styles/quick-access.css';
import { FakeUserData } from '../../dummy-data/fake-users';

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
                {FakeUserData.groups.map(item => {
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
                {FakeUserData.events.map(item => {
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
                {FakeUserData.hashtags.map(item => {
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
