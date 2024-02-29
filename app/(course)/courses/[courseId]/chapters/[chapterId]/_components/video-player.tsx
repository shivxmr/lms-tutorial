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
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            ) : (
                <p>Invalid YouTube video URL</p>
            )}
        </div>
    );
};

export default VideoPlayer;


// "use client";
// import { type MediaLoadedMetadataEvent, MediaPlayer, MediaProvider, Poster, MediaPlayRequestEvent, MediaPlayEvent, MediaPlayFailEvent } from '@vidstack/react';
// import { PlayIcon } from '@vidstack/react/icons';

// import axios from "axios";
// import MuxPlayer from "@mux/mux-player-react";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Loader2, Lock } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

// interface VideoPlayerProps {
// 	playbackId: string;
// 	courseId: string;
// 	chapterId: string;
// 	nextChapterId?: string;
// 	isLocked: boolean;
// 	completeOnEnd: boolean;
// 	title: string;
// 	videoUrl: string;
// }

// function onLoadedMetadata(nativeEvent: MediaLoadedMetadataEvent) {
//     // original media event (`loadedmetadata`) is still available.
//     const originalMediaEvent = nativeEvent.trigger;
//   }

//   // 1. request was made
//   function onPlayRequest(nativeEvent: MediaPlayRequestEvent) {
//     // ...
//   }

//   // 2. request succeeded
//   function onPlay(nativeEvent: MediaPlayEvent) {
//     // request events are attached to media events
//     const playRequestEvent = nativeEvent.request; // MediaPlayRequestEvent
//   }

//   // 2. request failed
//   function onPlayFail(error: Error, nativeEvent: MediaPlayFailEvent) {
//     // ...
//   }

// export const VideoPlayer = ({
// 	playbackId,
// 	courseId,
// 	chapterId,
// 	nextChapterId,
// 	isLocked,
// 	completeOnEnd,
// 	title,
// 	videoUrl,
// }: VideoPlayerProps) => {
// 	const [isReady, setIsReady] = useState(false);
// 	const router = useRouter();
// 	const confetti = useConfettiStore();

// 	const onEnd = async () => {
// 		try {
// 			if (completeOnEnd) {
// 				await axios.put(
// 					`/api/courses/${courseId}/chapters/${chapterId}/progress`,
// 					{
// 						isCompleted: true,
// 					}
// 				);

// 				if (!nextChapterId) {
// 					confetti.onOpen();
// 				}

// 				toast.success("Progress updated");
// 				router.refresh();

// 				if (nextChapterId) {
// 					router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
// 				}
// 			}
// 		} catch {
// 			toast.error("Something went wrong");
// 		}
// 	};

// 	return (
// 		<div className="relative aspect-video">
// 			{!isReady && !isLocked && (
// 				<div className="absolute inset-0 flex items-center justify-center bg-slate-800">
// 					<Loader2 className="h-8 w-8 animate-spin text-secondary" />
// 				</div>
// 			)}
// 			{isLocked && (
// 				<div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
// 					<Lock className="h-8 w-8" />
// 					<p className="text-sm">This chapter is locked</p>
// 				</div>
// 			)}
// 			{!isLocked && (
// 				<MediaPlayer 
// 					playsInline 
// 					title={title} 
// 					src={videoUrl}
// 					// aspectRatio="16/9"
// 					load="idle" 
// 					posterLoad="eager"
// 					viewType="video"
// 					onLoadedMetadata={onLoadedMetadata}
// 					onPlay={onPlay} onPlayFail={onPlayFail} onMediaPlayRequest={onPlayRequest}
// 				>
// 						{/* <PlayIcon size={40} /> */}
// 					<MediaProvider>
// 						<Poster
//       						className="absolute inset-0 block h-full w-full bg-black rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
//       						src={videoUrl}
//       						alt={videoUrl}
//     					/>
// 					</MediaProvider>
// 				</MediaPlayer>
// 			)}
// 		</div>
// 	);
// }