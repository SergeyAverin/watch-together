import React, { useEffect, useRef, useState } from "react";

import { SideBar } from "@organisms/SideBar";
import { Margin } from "@atoms/index";
import { PlayVideo } from "@molecules/PlayVideo";
import { PauseVideo } from "@molecules/PauseVideo";

import { formatVideoTime } from "@utils/formatTime";

const TEST_VIDEO_URL = process.env.TEST_VIDEO_URL as string;

const PlayerPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState<boolean | undefined>(false);
  const [videoNode, setVideoNode] = useState(videoRef.current);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number | null>(null);

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

  return (
    <div>
      <video
        ref={videoRef}
        controls={true}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={TEST_VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {isPaused ? (
        <PlayVideo video={videoNode} setPaused={setIsPaused} />
      ) : (
        <PauseVideo video={videoNode} setPaused={setIsPaused} />
      )}
      {duration && formatVideoTime(currentTime as number)} /{" "}
      {duration && formatVideoTime(duration as number)}
    </div>
  );
};

export default PlayerPage;
