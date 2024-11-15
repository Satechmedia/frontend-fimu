import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { videoApi } from '../lib/api';

export const useVideos = (params) => {
  return useQuery({
    queryKey: ['videos', params],
    queryFn: () => videoApi.getVideos(params)
  });
};

export const useVideo = (id) => {
  return useQuery({
    queryKey: ['video', id],
    queryFn: () => videoApi.getVideo(id),
    enabled: !!id
  });
};

export const useUploadVideo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (formData) => videoApi.uploadVideo(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    }
  });
};