import './header.css';
import SunIcon from '../assets/images/icon-sun.svg';
import MoonIcon from '../assets/images/icon-moon.svg';

const Header = ({ darkTheme, handleToggleTheme }) => {
  let themeIcon = SunIcon;

  if (!darkTheme) {
    themeIcon = MoonIcon;
  }

  return (
    <header className="header">
      <h1 className="header__title">Todo</h1>
      <input
        className="header__theme-btn"
        type="image"
        src={themeIcon}
        alt=""
        onClick={handleToggleTheme}
      />
    </header>
  );
};

export default Header;
