import Header from './routes/Header';
import SidePanel from './routes/SidePanel';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app-layout">
      <header>
        <Header />
      </header>
      <aside>
        <SidePanel />
      </aside>
      <main>
        <Outlet />
      </main>
      <footer>future footer</footer>
    </div>
  );
}

export default App;
