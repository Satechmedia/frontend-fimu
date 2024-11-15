// Profile.jsx
import { useAuth } from '../hooks/useAuth';
import { useVideos } from '../hooks/useVideo';
import { VideoList } from '../components/video/VideoList';
import { Loading } from '../components/common/Loading';

export const Profile = () => {
  const { user } = useAuth();
  const { data: videos, isLoading } = useVideos({ userId: user?.id });

  if (isLoading) {
    return <Loading size="large" />;
  }

  console.log(user);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src={user?.imageUrl}
          alt={user?.fullName}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{user?.fullName}</h1>
          <p className="text-gray-600 dark:text-gray-400">{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Videos</h2>
        <VideoList videos={videos} />
      </div>
    </div>
  );
};