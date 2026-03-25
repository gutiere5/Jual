import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Link to="/" className="store-logo">
        <img src="assets/Mi-Favorita.png" alt="Store Logo" />
      </Link>
      <Outlet />
    </div>
  );
}

export default App;
