import React from "react";

import { useAppDispatch, useAppSelector } from "./storeHooks";
import { isPausedSelector } from "@redux/selectors/playerSelectores";

import {
  setIsPaused,
  setVideoSource,
  setCurrentTime,
  setDuration,
} from "@redux/features/playerSlice";

export const useVideoOperations = (
  videoRef: React.RefObject<HTMLVideoElement>
) => {
  const dispatch = useAppDispatch();
  const isPaused = useAppSelector(isPausedSelector);

  const openFullScreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const rewind = (second: number) => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      }
      videoRef.current.currentTime = videoRef.current.currentTime + second;
      if (!isPaused) {
        videoRef.current.play();
      }
    }
  };

  const videoPlay = () => {
    dispatch(setIsPaused(false));

    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const videoPause = () => {
    dispatch(setIsPaused(true));
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      dispatch(setDuration(videoRef.current.duration));
      dispatch(setIsPaused(videoRef.current.paused));
      dispatch(setCurrentTime(videoRef.current.currentTime));
      dispatch(setVideoSource(videoRef.current.src));

      videoRef.current.muted = false;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      dispatch(setCurrentTime(videoRef.current.currentTime));
    }
  };

  const setVideoCurrentTime = (currentTime: number) => {
    console.log(`set video current time ${currentTime}`);
    dispatch(setCurrentTime(currentTime));
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  };

  return {
    videoPause,
    videoPlay,
    rewind,
    openFullScreen,
    handleLoadedMetadata,
    handleTimeUpdate,
    setVideoCurrentTime,
  };
};
