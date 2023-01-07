import Hashtag from '../../media/icons/hashtag.png';
import Group from '../../media/icons/group.png';
import Event from '../../media/icons/event.png';
import '../../styles/quick-access.css';

const profileCardData = {
    userId: 123,
    groups: [{groupId: 2, groupName:'Open Mic Support Group', groupURL: '/openmicsupportgroup'}],
    events: [{eventId: 1, eventName:'Sad Mic at Restaurant', eventURL: '/sadmic'}],
    hashtags: [{hashtagId: 9, hashtagName:'comedy', hashtagUrl:'/comedy'}]
}

function PopulateQuickAccessItems( QuickAccessItems: string){
    return(
        <div></div>
    )
}

function CreateQuickAccessItem( itemType: string, itemName: string, itemLink: string ) {
    return(
        <div className='quick-access-item-cont'>
            <a href={itemLink}>
                <img className='quick-access-item-icon' src={itemType} />
                <div className='quick-access-item'>{itemName}</div>
            </a>
        </div>
    )
}

export default function QuickAccess(){
    return(
        <div className="quick-access-cont">
            <div className="quick-access-category-cont">
                <div className="quick-access-title">Trending Now</div>
                <div className="quick-access-item-cont">
                    <img className="quick-access-item-icon" src={Hashtag}/>
                    <div className="quick-access-item">Dave Chappelle</div>
                </div>
            </div>

            <div className="quick-access-category-cont">
                <div className="quick-access-title">Groups</div>
                <div className="quick-access-item-cont">
                    <img className="quick-access-item-icon" src={Group}/>
                    <div className="quick-access-item">Open Mic Support Group</div>
                </div>
            </div>

            <div className="quick-access-category-cont">
                <div className="quick-access-title">Upcoming Events</div>
                <div className="quick-access-item-cont">
                    <img className="quick-access-item-icon" src={Event}/>
                    <div className="quick-access-item">Sad Mic at Restaurant</div>
                </div>
            </div>

            <div className="quick-access-category-cont">
                <div className="quick-access-title">My Hashtags</div>
                <div className="quick-access-item-cont">
                    <img className="quick-access-item-icon" src={Hashtag}/>
                    <div className="quick-access-item">Comedy</div>
                </div>
            </div>
        </div>
    )
}