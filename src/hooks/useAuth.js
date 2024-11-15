// useAuth.js
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { user, isSignedIn, isLoading } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return {
    user,
    isSignedIn,
    isLoading,
    signOut: handleSignOut,
  };
};