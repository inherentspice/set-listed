import '../styles/header.css';
import Home from '../media/header/home.png';
import MyNetwork from '../media/header/my-network.png';
import Gigs from '../media/header/gigs.png';
import Messaging from '../media/header/messaging.png';
import Notifications from '../media/header/notifications.png';
import ProfilePic from '../media/home/profile-picture.png';
import Search from '../media/header/search.png';
import Services from '../media/header/services.png';

export default function Header() {
    return(
        <div>
            <div className="header-cont">
                <div className="header-nav-left">
                    <div className='header-nav-search'>
                        <div className="header-cont-logo">SL</div>
                        <div className="header-cont-search">
                            <img src={Search}/>
                            <input placeholder='Search'></input>
                        </div>
                    </div>

                    <div className="header-nav-btns">
                        <div className="header-nav-btn">
                            <a href='/' >
                                <img className='header-nav-img' src={Home}/>
                                <div className="header-nav-btn-name">Home</div>
                            </a>
                        </div>

                        <div className="header-nav-btn">
                            <a href='/my-network'>
                                <img className='header-nav-img' src={MyNetwork} />
                                <div className="header-nav-btn-name">My Network</div>
                            </a>
                        </div>

                        <div className="header-nav-btn">
                            <a href='/gigs'>
                                <img className='header-nav-img' src={Gigs} />
                                <div className="header-nav-btn-name">Gigs</div>
                            </a>
                        </div>

                        <div className="header-nav-btn">
                            <a href='/messaging' >
                                <img className='header-nav-img' src={Messaging} />
                                <div className="header-nav-btn-name">Messaging</div>
                            </a>
                        </div>

                        <div className="header-nav-btn">
                            <a href='notifications'>
                                <img className='header-nav-img' src={Notifications} />
                                <div className="header-nav-btn-name">Notifications</div>
                            </a>
                        </div>

                        <div className="header-nav-btn">
                            <a href='my-profile'>
                                <img className='header-nav-profile-pic' src={ProfilePic} />
                                <div className="header-nav-btn-name">My Profile</div>
                            </a>
                        </div>
                    </div>

                </div>

                <div className="header-nav-right">

                    <div className="header-nav-menu">
                        <img src={Services}/>
                        <div>Services</div>
                    </div>
                    <div className='header-nav-right-cta'><a href=''>Try Premium for Free you Brokie</a></div>

                </div>
            </div>
        </div>
    )
}