import { useParams } from 'react-router-dom';
import { useVideo } from '../hooks/useVideo';
import VideoPlayer from '../components/video/VideoPlayer';
import { Loading } from '../components/common/Loading';

export const VideoDetail = () => {
  const { id } = useParams();
  const { data: video, isLoading } = useVideo(id);

  if (isLoading || !video) {
    return <Loading size="large" />;
  }

  // Format qualities for the player
  const formattedQualities = video.qualities
    .sort((a, b) => b.height - a.height)
    .map(quality => ({
      quality: `${quality.height}p`,
      url: quality.url,
      height: quality.height
    }));

  return (
    <div className="max-w-video mx-auto space-y-6">
      <VideoPlayer 
        videoId={video._id}
        videoUrl={formattedQualities[0]?.url}
        thumbnailUrl={video.thumbnails[0]?.url}
        qualities={formattedQualities}
        title={video.title}
      />
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{video.description}</p>
        <div className="text-sm text-gray-500">
          {video.stats.views.toLocaleString()} views
        </div>
      </div>
    </div>
  );
};