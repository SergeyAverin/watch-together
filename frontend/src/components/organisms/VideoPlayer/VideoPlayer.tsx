import React, { useEffect, useRef, useState } from "react";

import { Flex, Margin, VideoPropgressBar, IconButton } from "@atoms/index";
import { formatVideoTime } from "@utils/formatTime";

import RewindLeft from '@public/RewindLeft.svg'
import RewindRight from '@public/RewindRight.svg'
import FullScreenIcon from '@public/FullScreenIcon.svg'
import PauseIcon from '@public/PauseIcon.svg'
import PlayIcon from '@public/PlayIcon.svg'


import "./VideoPlayer.sass";

const TEST_VIDEO_URL = process.env.TEST_VIDEO_URL as string;
const BACKEND_HOST = process.env.BACKEND_HOST as string;
const BACKEND_PORT = process.env.BACKEND_PORT as string;


interface IVideoPlayerProps {
  setUsers: Function
}

export const VideoPlayer: React.FC<IVideoPlayerProps> = ({setUsers}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState<boolean | undefined>(false);
  const [videoNode, setVideoNode] = useState(videoRef.current);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const socketRef = useRef<WebSocket|undefined>();
  const [isTimeWidget, setIsTimeWidget] = useState(true)
  
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
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setUsers(message.usersCount)
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
    }
  }
  const onPlay = () => {
    if (socketRef.current) {
      socketRef.current.send(`{"event": "play", "currentTime": "${videoNode?.currentTime}"}`)
    }
  }
  const openFullScreen = () => {
    if (videoNode) {
      videoNode.requestFullscreen()
    }
  }
  const rewind = (second: number) => {
    const isPaused = videoNode?.paused
      if (videoNode) {
        videoNode.pause();
        videoNode.currentTime = videoNode.currentTime + second; 
        if (!isPaused) {
          videoNode.play();
        }
    }
  }
  const playVideo = () => {
    if (videoNode) {
      videoNode.play();
    }
  }
  const pauseVideo = () => {
    if (videoNode) {
      videoNode.pause();
    }
  }
  return (  
    <>
      <video
        className="video-player"
        ref={videoRef}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPause={onPause}
        onPlay={onPlay}
        muted={true}
        autoPlay={true}
      >
        <source src={TEST_VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Margin marginTop="30px">
        <Margin marginBottom="20px">
            { videoRef.current  && duration && <VideoPropgressBar video={videoNode} progress={(100 * videoRef.current.currentTime) / duration} /> }
        </Margin>
        <Flex alignItems="flex-start" justifyContent="space-between">
          <Flex alignItems="center" justifyContent="flex-start">
          {videoRef.current?.paused ? (
            <IconButton  clickFunction={() => playVideo()} icon={<PlayIcon />} />
          ) : (
            <IconButton  clickFunction={() => pauseVideo()} icon={<PauseIcon />} />
          )}
          <div className="video-player__time" onClick={() => setIsTimeWidget((prev) => !prev)}>
            {isTimeWidget ? 
              <>
                {duration && formatVideoTime(currentTime as number)} /{" "}
                {duration && formatVideoTime(duration as number)}
              </>
              :
              <>
                -{duration && currentTime && formatVideoTime((duration - currentTime) as number)} /{" "}
                {duration && formatVideoTime(duration as number)}
              </>
            }
          </div>
          </Flex>
            <IconButton icon={<FullScreenIcon />} clickFunction={openFullScreen} />
        </Flex>
      </Margin>
      <Flex alignItems="flex-start" justifyContent="space-between">
        <IconButton  clickFunction={() => rewind(-10)} icon={<RewindLeft />} />
        <IconButton  clickFunction={() => rewind(10)} icon={<RewindRight />} />
      </Flex>
    </>
  );
};
