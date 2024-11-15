// useAds.js
import { useQuery } from '@tanstack/react-query';
import { adsApi } from '../lib/api';

export const useAds = (params) => {
  return useQuery({
    queryKey: ['ads', params],
    queryFn: () => adsApi.getAds(params)
  });
};

export const useVideoAd = (videoId) => {
  return useQuery({
    queryKey: ['videoAd', videoId],
    queryFn: () => adsApi.getAdForVideo(videoId),
    enabled: !!videoId
  });
};