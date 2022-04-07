import "./Navbar.css";

const Navbar = () => {
    return (
        <header>
            <nav className="main-nav">
                <ul className="main-menu">
                    <li><a className="menu-btn" href="/highscore">Highscore</a></li>
                    <li><a className="menu-btn menu-btn-active" href="/">WordleGame</a></li>
                    <li><a className="menu-btn" href="/information">Information</a></li>
                </ul>
            </nav >
        </header >
    )
}

export default Navbar; 