/* eslint-disable react/prop-types */
import { VideoCard } from './VideoCard';

export const VideoList = ({ videos = [] }) => {
  // Check if videos is actually the paginated response
  const videoList = Array.isArray(videos) ? videos : videos?.videos || [];

  if (!videoList.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No videos found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videoList.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};