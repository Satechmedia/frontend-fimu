import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUploadVideo } from '../hooks/useVideo';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Loading } from '../components/common/Loading';

export const Upload = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { mutate: uploadVideo, isLoading } = useUploadVideo();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const formData = new FormData(e.target);
    
    uploadVideo(formData, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (error) => {
        setError(error?.response?.data?.message || 'Upload failed. Please try again.');
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Video</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input 
            name="title" 
            required 
            placeholder="Enter video title"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            className="input min-h-[100px]"
            rows={4}
            placeholder="Enter video description"
            required
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Video File</label>
          <Input
            type="file"
            name="video"
            accept="video/*"
            required
            disabled={isLoading}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="mt-1 text-sm text-gray-500">
            Maximum file size: 100MB. Supported formats: MP4, WebM
          </p>
        </div>
        
        {/* Optional thumbnail upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Thumbnail (Optional)</label>
          <Input
            type="file"
            name="thumbnail"
            accept="image/*"
            disabled={isLoading}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="mt-1 text-sm text-gray-500">
            Recommended size: 1280x720px. Supported formats: JPG, PNG
          </p>
        </div>
        
        <div className="flex items-center justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/')}
            disabled={isLoading}
          >
            Cancel
          </Button>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="min-w-[100px]"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <Loading size="small" />
                <span>Uploading...</span>
              </div>
            ) : (
              'Upload'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Upload;