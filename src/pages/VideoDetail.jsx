// VideoDetail.jsx
import { useParams } from 'react-router-dom';
import { useVideo } from '../hooks/useVideo';
import { VideoPlayer } from '../components/video/VideoPlayer';
import { Loading } from '../components/common/Loading';

export const VideoDetail = () => {
  const { id } = useParams();
  const { data: video, isLoading } = useVideo(id);

  if (isLoading) {
    return <Loading size="large" />;
  }

  return (
    <div className="max-w-video mx-auto space-y-6">
      <VideoPlayer videoUrl={video.url} videoId={video.id} />
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{video.description}</p>
      </div>
    </div>
  );
};
