/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export const VideoCard = ({ video }) => {
  const {
    id,
    title,
    thumbnailUrl,
    views,
    createdAt,
    duration,
    user,
  } = video;

  return (
    <Link to={`/video/${id}`} className="group">
      <div className="space-y-2">
        {/* Thumbnail */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Duration */}
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-sm rounded">
            {duration}
          </div>
        </div>

        {/* Info */}
        <div className="flex space-x-3">
          {/* User Avatar */}
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-9 h-9 rounded-full"
          />
          
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-sm font-medium truncate group-hover:text-blue-600">
              {title}
            </h3>
            
            {/* Channel Name */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.name}
            </p>
            
            {/* Stats */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {views.toLocaleString()} views • {formatDistanceToNow(new Date(createdAt))} ago
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
