import "./Navbar.css";

const Navbar = () => {
    return (
        <header>
            <nav class="main-nav">
                <ul class="main-menu">
                    <li><a class="menu-btn" href="/highscore">Highscore</a></li>
                    <li><a class="menu-btn menu-btn-active" href="/">WordleGame</a></li>
                    <li><a class="menu-btn" href="/information">Information</a></li>
                </ul>
            </nav >
        </header >
    )
}

export default Navbar; 