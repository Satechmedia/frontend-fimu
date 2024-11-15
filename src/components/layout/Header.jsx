// Header.jsx
import { Link } from 'react-router-dom';
import { UserButton, SignInButton, useUser } from '@clerk/clerk-react';

export const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b-[0.5px] border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          VideoApp
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/upload" className="btn btn-primary">
            Upload
          </Link>
          
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/home" />
          ) : (
            <SignInButton mode="modal" forceRedirectUrl='/home'>
              <button className="btn btn-secondary">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
};
