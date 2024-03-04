// video-player.tsx
import React from 'react';

interface VideoPlayerProps {
    videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
    // Extract video ID from YouTube URL
    const getVideoId = (url: string) => {
        const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return videoIdMatch ? videoIdMatch[1] : null;
    };

    // Extract video ID from the provided URL
    const videoId = getVideoId(videoUrl);

    // If video ID is found, construct the embed URL
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

    return (
        <div className="video-container">
            {embedUrl ? (
                <iframe
                    width="560"
                    height="315"
                    src={embedUrl}
                    title="YouTube Video Player"
                    allowFullScreen
                ></iframe>
            ) : (
                <p>Invalid YouTube video URL</p>
            )}
        </div>
    );
};

export default VideoPlayer;