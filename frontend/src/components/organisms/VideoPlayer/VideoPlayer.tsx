import React, { useEffect, useRef, useState } from "react";

import { Flex, Margin, VideoPropgressBar } from "@atoms/index";
import { PlayVideo } from "@molecules/PlayVideo";
import { PauseVideo } from "@molecules/PauseVideo";
import { formatVideoTime } from "@utils/formatTime";

import "./VideoPlayer.sass";

const TEST_VIDEO_URL = process.env.TEST_VIDEO_URL as string;
const BACKEND_HOST = process.env.BACKEND_HOST as string;
const BACKEND_PORT = process.env.BACKEND_PORT as string;

export const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState<boolean | undefined>(false);
  const [videoNode, setVideoNode] = useState(videoRef.current);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const socketRef = useRef<WebSocket|undefined>();
  
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    setVideoNode(videoRef.current);
    setIsPaused(videoRef.current?.paused);
  }, [videoRef]);


  useEffect(() => {
    socketRef.current = new WebSocket(`ws:/${BACKEND_HOST}:${BACKEND_PORT}/player`);

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
      console.log(socketRef.current);
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.event == 'play' && videoNode) {
        videoNode?.play()
      }
      if (message.event == 'pause' && videoNode) {
        videoNode?.pause()
      }
      if (videoNode) {
        videoNode.currentTime = message.currentTime
      }
    };

    return () => {
      if(socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [videoNode]);


  const onPause = () => {
    if (socketRef.current) {
      socketRef.current.send(`{"event": "pause", "currentTime": "${videoNode?.currentTime}"}`)
      console.log('stop')
    }
  }
  const onPlay = () => {
    if (socketRef.current) {
      console.log('play')
      socketRef.current.send(`{"event": "play", "currentTime": "${videoNode?.currentTime}"}`)
    }
  }
  return (  
    <>
      <video
        className="video-player"
        ref={videoRef}
        controls={true}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPause={onPause}
        onPlay={onPlay}
        muted={true}
      >
        <source src={TEST_VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Margin marginTop="30px">
        <Margin marginBottom="20px">
            { videoRef.current  && duration && <VideoPropgressBar video={videoNode} progress={(100 * videoRef.current.currentTime) / duration} /> }
        </Margin>
        <Flex alignItems="flex-start" justifyContent="space-between">
          {videoRef.current?.paused ? (
            <PlayVideo video={videoNode} setPaused={setIsPaused} />
          ) : (
            <PauseVideo video={videoNode} setPaused={setIsPaused} />
          )}
          <div className="video-player__time">
            {duration && formatVideoTime(currentTime as number)} /{" "}
            {duration && formatVideoTime(duration as number)}
          </div>
        </Flex>
      </Margin>
    </>
  );
};
