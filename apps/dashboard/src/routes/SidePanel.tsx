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
      label: 'Personal',
      icon: UserCircle,
      color: '#81c995',
      path: '/personnel',
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: Lock,
      color: '#78d9ec',
      path: '/settings',
    },
  ];

  return (
    <div className="side-panel">
      <div className="side-panel-content">
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
              <span className="side-panel-menu-label">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default SidePanel;
