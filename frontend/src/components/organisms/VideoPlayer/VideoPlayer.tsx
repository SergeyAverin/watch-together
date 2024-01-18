import React, { useEffect, useRef } from "react";

import { Flex, Margin } from "@atoms/index";
import { VideoProgressBar } from "@molecules/VideoProgressBar";
import { VolumeProgressBar } from "@molecules/VolumeProgressBar/VolumeProgressBar";
import { TimeWidget } from "@molecules/TimeWidget/TimeWidget";
import { RewindButtons } from "@molecules/RewindButtons/RewindButtons";
import { FullScreenButton } from "@molecules/FullScreenButton/FullScreenButtons";
import { Video } from "@molecules/Video/Video";
import { PlayButton } from "@molecules/PlayButton/PlayButton";
import { useAppSelector, useAppDispatch } from "@hooks/storeHooks";
import { useVideoPlayerSocket } from "@hooks/useVideoPlayerWebSocket";
import { useVideoOperations } from "@hooks/useVideoOperations";
import {
  currentTimeSelector,
  durationSelector,
  isPausedSelector
} from "@redux/selectors/playerSelectores";
import { setIsInteracted } from "@redux/features/playerSlice";
import { stringifyMessage } from "@utils/socketMessaeg";
import { useUser } from "../../../providers/UserProvIder";


const TEST_VIDEO_URL = process.env.TEST_VIDEO_URL as string;

interface IVideoPlayerProps {}

export const VideoPlayer: React.FC<IVideoPlayerProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const dispatch = useAppDispatch()
  
  const ws = useVideoPlayerSocket(videoRef)
  const videoOperations = useVideoOperations(videoRef);
  
  const isPaused = useAppSelector(isPausedSelector)
  const currentTime = useAppSelector(currentTimeSelector);
  const duration = useAppSelector(durationSelector);
  const user = useUser()


  useEffect(()=> {
    const message = {
      event: isPaused ? "pause_video" : "play_video",
      currentTime: videoRef.current?.currentTime,
      user
    }
    ws?.send(stringifyMessage(message))
  }, [isPaused])


  return (
    <>
      <Video
        handleLoadedMetadata={videoOperations.handleLoadedMetadata}
        handleTimeUpdate={videoOperations.handleTimeUpdate}
        videoPause={videoOperations.videoPause}
        videoPlay={videoOperations.videoPlay}
        src={TEST_VIDEO_URL}
        videoRef={videoRef}
      />
      <Margin marginTop="30px">
        <Margin marginBottom="20px">
          <VideoProgressBar video={videoRef.current} />
        </Margin>

        <Flex alignItems="flex-start" justifyContent="space-between">
          <Flex alignItems="center" justifyContent="flex-start">
            <PlayButton
              videoPause={videoOperations.videoPause}
              videoPlay={videoOperations.videoPlay}
            />

            <Margin marginLeft="8px" marginRight="8px">
              <TimeWidget currentTime={currentTime} duration={duration} />
            </Margin>

            <Margin marginLeft="8px" marginRight="8px">
              <VolumeProgressBar video={videoRef.current} progress={0.5} />
            </Margin>
          </Flex>

          <FullScreenButton openFullScreen={videoOperations.openFullScreen} />
        </Flex>
      </Margin>
      <button onClick={() => dispatch(setIsInteracted(true))}>interact</button>
      <RewindButtons rewind={videoOperations.rewind} />
    </>
  );
};
