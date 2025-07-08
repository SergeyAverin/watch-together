import React, { useEffect, useRef } from "react";
import { Flex, Margin } from "@atoms/index";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import { useVideoOperations } from "@hooks/useVideoOperations";
import { useVideoPlayerSocketIO } from "@hooks/useVideoPlayerSocketIO";
import { useVideoPlayerSocket } from "@hooks/useVideoPlayerWebSocket";
import { FullScreenButton } from "@molecules/FullScreenButton/FullScreenButtons";
import { PlayButton } from "@molecules/PlayButton/PlayButton";
import { RewindButtons } from "@molecules/RewindButtons/RewindButtons";
import { TimeWidget } from "@molecules/TimeWidget/TimeWidget";
import { Video } from "@molecules/Video/Video";
import { VideoProgressBar } from "@molecules/VideoProgressBar";
import { VolumeProgressBar } from "@molecules/VolumeProgressBar/VolumeProgressBar";
import { setIsInteracted } from "@redux/features/playerSlice";
import { stringifyMessage } from "@utils/socketMessaeg";
import { useUser } from "../../../providers/UserProvIder";
import { socket } from "../../../socket";

import {
  currentTimeSelector,
  durationSelector,
  isPausedSelector,
} from "@redux/selectors/playerSelectores";

const TEST_VIDEO_URL = process.env.TEST_VIDEO_URL as string;

interface IVideoPlayerProps {}

export const VideoPlayer: React.FC<IVideoPlayerProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const dispatch = useAppDispatch();

  //const ws = useVideoPlayerSocket(videoRef)
  useVideoPlayerSocketIO(videoRef);
  const videoOperations = useVideoOperations(videoRef);

  const isPaused = useAppSelector(isPausedSelector);
  const currentTime = useAppSelector(currentTimeSelector);
  const duration = useAppSelector(durationSelector);
  const user = useUser();

  useEffect(() => {
    const message = {
      event: isPaused ? "pause_video" : "play_video",
      currentTime: videoRef.current?.currentTime,
      user,
    };
    const data = stringifyMessage(message);
    socket.emit(message.event, data);
    // ws?.send(stringifyMessage(message))
  }, [isPaused]);

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
