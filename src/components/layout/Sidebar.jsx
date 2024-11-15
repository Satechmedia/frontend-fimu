// Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'My Videos', path: '/profile', icon: '📹' },
    { label: 'Liked', path: '/liked', icon: '👍' },
    { label: 'History', path: '/history', icon: '⏱️' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 h-[91vh] border-r-2 border-yellow-100">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
              location.pathname === item.path
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
