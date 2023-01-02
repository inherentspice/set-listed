import '../styles/header.css';

export default function Header() {
    return(
        <div>
            <div className="header-cont">
                <div className="header-nav-left">
                    <div className='header-nav-search'>
                        <div className="header-cont-logo">SetListed</div>
                        <div className="header-cont-search">
                            <input></input>
                        </div>
                    </div>

                    <div className="header-nav-btns">
                        <div className="header-nav-btn">
                            <a href='/' >
                                <img></img>
                                <div className="header-nav-btn-name">Home</div>
                            </a>
                        </div>

                        <div className="header-nav-btn">
                            <a href='/my-network'>
                                <img></img>
                                <div className="header-nav-btn-name">My Network</div>
                            </a>
                        </div>

                        <div className="header-nav-btn">
                            <a href='/gigs'>
                                <img></img>
                                <div className="header-nav-btn-name">Gigs</div>
                            </a>
                        </div>

                        <div className="header-nav-btn">
                            <a href='/messaging' >
                                <img></img>
                                <div className="header-nav-btn-name">Messaging</div>
                            </a>
                        </div>

                        <div className="header-nav-btn">
                            <a href='notifications'>
                                <img></img>
                                <div className="header-nav-btn-name">Notifications</div>
                            </a>
                        </div>

                        <div className="header-nav-btn">
                            <a href='my-profile'>
                                <img></img>
                                <div className="header-nav-btn-name">My Profile</div>
                            </a>
                        </div>
                    </div>

                </div>

                <div className="header-nav-right">

                    <div className="header-nav-menu">

                    </div>

                </div>
            </div>
        </div>
    )
}