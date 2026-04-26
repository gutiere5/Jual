import './Header.css';
import { logo } from '@repo/assets';

function Header() {
  return (
    <header>
      <img src={logo} alt="Store Logo" className="logo" />
      <button className="user-avatar">
        <p>EG</p>
      </button>
    </header>
  );
}

export default Header;
