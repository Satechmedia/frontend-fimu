import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MenuIcon, X, CreditCard } from 'lucide-react';
import { 
  IconVideoPlus, 
  IconLibrary, 
  IconHome, 
  IconCreditCardPay, 
  IconHeartPlus,
  IconHistory,
  IconSettings,
  IconCode
 } from '@tabler/icons-react';
import clsx from 'clsx';

export const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const navItems = [
    { label: 'Home', path: '/', icon: <IconHome /> },
    { label: 'My Videos', path: '/profile', icon: <IconLibrary /> },
    { label: 'Liked', path: '/liked', icon: <IconHeartPlus /> },
    { label: 'History', path: '/history', icon: <IconHistory /> },
    { label: 'Upload', path: '/upload', icon: <IconVideoPlus /> },
    { label: 'Billing', path: '/billing', icon: <IconCreditCardPay /> },
    { label: 'API', path: '/api', icon: <IconCode /> },
    { label: 'Settings', path: '/settings', icon: <IconSettings /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <MenuIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'bg-white dark:bg-gray-800 h-[91vh] border-r-[0.5px] border-gray-200 dark:border-gray-700 transition-all duration-300 fixed md:static z-40',
          isOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20',
          'flex flex-col'
        )}
      >
        <nav className="p-4 flex-grow">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors mb-1',
                location.pathname === item.path
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                !isOpen && 'justify-center md:justify-center'
              )}
              onClick={() => isMobile && setIsOpen(false)}
            >
              <span>{item.icon}</span>
              {(isOpen || !isMobile) && <span className={!isOpen ? 'md:hidden' : ''}>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Credit Display */}
        <div className={clsx(
          'p-4 border-t border-gray-200 dark:border-gray-700',
          !isOpen && 'text-center'
        )}>
          <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
            <CreditCard className="w-5 h-5" />
            {(isOpen || !isMobile) && (
              <div className={!isOpen ? 'md:hidden' : ''}>
                <span className="font-medium">Credits:</span>
                <span className="ml-2">1000</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className={clsx(
          'p-4 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700',
          !isOpen && 'md:hidden'
        )}>
          <span>&copy; 2024 Fimu</span>
        </footer>
      </aside>
    </>
  );
};

export default Sidebar;