/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export const VideoCard = ({ video }) => {
  const {
    _id,
    title,
    thumbnails,
    stats,
    createdAt,
    duration
  } = video;

  // Use first thumbnail as preview
  const thumbnailUrl = thumbnails?.[0]?.url;

  return (
    <Link to={`/video/${_id}`} className="group">
      <div className="space-y-2">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-sm rounded">
            {Math.floor(duration)}s
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium truncate group-hover:text-blue-600">
            {title}
          </h3>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {stats.views.toLocaleString()} views • {formatDistanceToNow(new Date(createdAt))} ago
          </p>
        </div>
      </div>
    </Link>
  );
};