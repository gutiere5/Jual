import './Header.css';
import { logo } from '@repo/assets';

function Header() {
  return (
    <header>
      <img src={logo} alt="Store Logo" className="logo" />
      <div className="user-avatar">
        <p>EG</p>
      </div>
    </header>
  );
}

export default Header;
