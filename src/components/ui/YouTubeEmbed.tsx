import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { getYouTubeEmbedUrl, getYouTubeThumbnail, extractYouTubeVideoId } from '../../utils/youtube-utils';

interface YouTubeEmbedProps {
  url: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  showThumbnail?: boolean;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  url,
  title = 'YouTube Video',
  className = '',
  autoplay = false,
  showThumbnail = false
}) => {
  const [isLoaded, setIsLoaded] = useState(!showThumbnail);
  const [hasError, setHasError] = useState(false);
  
  const embedUrl = getYouTubeEmbedUrl(url);
  const thumbnailUrl = getYouTubeThumbnail(url, 'maxresdefault');
  const videoId = extractYouTubeVideoId(url);
  
  if (!embedUrl || !videoId) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 rounded-lg ${className}`}>
        <div className="text-center text-white">
          <div className="text-red-400 mb-2">⚠️</div>
          <p className="text-sm">Invalid YouTube URL</p>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 justify-center mt-2"
          >
            <ExternalLink className="w-3 h-3" />
            Open Link
          </a>
        </div>
      </div>
    );
  }

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
  };

  const finalEmbedUrl = autoplay ? `${embedUrl}&autoplay=1` : embedUrl;

  if (showThumbnail && !isLoaded) {
    return (
      <div className={`relative group cursor-pointer ${className}`}>
        <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={() => setIsLoaded(true)} // Fallback to video if thumbnail fails
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-200">
            <div className="bg-red-600 hover:bg-red-700 rounded-full p-4 transform group-hover:scale-110 transition-transform duration-200">
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsLoaded(true)}
          className="absolute inset-0 w-full h-full"
          aria-label={`Play video: ${title}`}
        />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 rounded-lg ${className}`}>
        <div className="text-center text-white">
          <div className="text-red-400 mb-2">⚠️</div>
          <p className="text-sm">Failed to load video</p>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 justify-center mt-2"
          >
            <ExternalLink className="w-3 h-3" />
            Watch on YouTube
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <iframe
        src={finalEmbedUrl}
        title={title}
        className="w-full h-full border-none rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
        sandbox="allow-same-origin allow-scripts allow-presentation"
      />
      
      {/* Video info overlay (optional) */}
      <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-black bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90 transition-all duration-200"
          title="Watch on YouTube"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default YouTubeEmbed;