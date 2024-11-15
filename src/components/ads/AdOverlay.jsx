/* eslint-disable react/prop-types */
// AdOverlay.jsx
import { Link } from 'react-router-dom';

export const AdOverlay = ({ ad, onClose }) => {
  if (!ad) return null;

  return (
    <div className="absolute bottom-0 right-0 m-4 max-w-sm bg-black/80 text-white p-4 rounded-lg">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white/80 hover:text-white"
      >
        ✕
      </button>
      
      <div className="flex space-x-4">
        {ad.imageUrl && (
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-24 h-16 object-cover rounded"
          />
        )}
        
        <div>
          <h4 className="font-medium">{ad.title}</h4>
          <p className="text-sm text-white/80">{ad.description}</p>
          
          {ad.callToAction && (
            <Link
              to={ad.callToAction.url}
              className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              {ad.callToAction.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};