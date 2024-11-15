// Home.jsx
import { useVideos } from '../hooks/useVideo';
import { VideoList } from '../components/video/VideoList';
import { Loading } from '../components/common/Loading';

export const Home = () => {
  const { data: videos, isLoading } = useVideos();

  if (isLoading) {
    return <Loading size="large" />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Recommended Videos</h1>
      <VideoList videos={videos} />
    </div>
  );
};