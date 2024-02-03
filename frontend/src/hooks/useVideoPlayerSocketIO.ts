import { parsMessage } from "@utils/socketMessaeg";
import { ISocketIoHandler, useSocketIO } from "./useSocketIO";
import { useVideoOperations } from "./useVideoOperations";

export const useVideoPlayerSocketIO = (
  video: React.RefObject<HTMLVideoElement>
) => {
  const videoOperations = useVideoOperations(video);

  const socketIOHandlers: Array<ISocketIoHandler> = [
    {
      eventName: "user_connect",
      eventHandler: (data: string) => {
        const message = parsMessage(data);
        console.log(`SocketIO: User ${message.user_id} connected`);
      },
    },
    {
      eventName: "pause_video",
      eventHandler: () => {
        videoOperations.videoPause();
        console.log(`SocketIO: Pause video`);
      },
    },
    {
      eventName: "play_video",
      eventHandler: () => {
        console.log(`SocketIO: Play video`);
        videoOperations.videoPlay();
      },
    },
  ];

  useSocketIO(socketIOHandlers);
};
