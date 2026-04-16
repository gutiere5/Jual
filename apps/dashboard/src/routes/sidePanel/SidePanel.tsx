import { Home, UserCircle, Lock } from 'lucide-react';
import { NavLink } from 'react-router';
import './SidePanel.css';

function SidePanel() {
  const menuItems = [
    {
      id: 'Inventory',
      label: 'Inventory',
      icon: Home,
      color: '#a8c7fa',
      path: '/',
    },
    {
      id: 'Personnel',
      label: 'Personnel',
      icon: UserCircle,
      color: '#81c995',
      path: '/personnel',
    },
    {
      id: 'Canvas Editor',
      label: 'Canvas Editor',
      icon: Home,
      color: '#78d9ec',
      path: '/canvas',
    },
    {
      id: 'Canvas Display',
      label: 'Canvas Display',
      icon: Home,
      color: '#f9c784',
      path: '/display',
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: Lock,
      color: '#ff9f80',
      path: '/settings',
    },
  ];

  return (
    <div className="side-panel">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `side-panel-menu-item ${isActive ? 'active' : ''}`}
            >
              <div className="side-panel-menu-icon-wrapper" style={{ backgroundColor: item.color }}>
                <IconComponent className="side-panel-menu-icon" />
              </div>
              <h3 >{item.label}</h3>
            </NavLink>
          );
        })}
      </div>
  );
}

export default SidePanel;
