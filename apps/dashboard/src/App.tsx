import Header from './routes/header/Header';
import SidePanel from './routes/sidePanel/SidePanel';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="app-main">
        <SidePanel />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
