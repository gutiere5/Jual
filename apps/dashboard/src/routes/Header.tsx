import './Header.css';

function Header() {
  return (
    <header>
      <img src="./src/assets/mi-favorita.png" alt="Store Logo" className="logo" />
      <div className="user-avatar">
        <p>EG</p>
      </div>
    </header>
  );
}

export default Header;
