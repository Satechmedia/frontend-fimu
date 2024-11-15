// useAds.js
import { useQuery } from '@tanstack/react-query';
import { adsApi } from '../lib/api';

export const useAds = (params) => {
  return useQuery(['ads', params], () => adsApi.getAds(params));
};

export const useVideoAd = (videoId) => {
  return useQuery(
    ['videoAd', videoId],
    () => adsApi.getAdForVideo(videoId),
    { enabled: !!videoId }
  );
};
