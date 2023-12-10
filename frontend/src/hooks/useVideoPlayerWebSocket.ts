import { useWebSocket, IWebSocket } from "./useWebSocket";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import { useVideoOperations } from "./useVideoOperations";
import { setUsersCount } from "@redux/features/userListSlice";
import { parsMessage } from "@utils/socketMessaeg";
import { isInteractedSelector } from "@redux/selectors/playerSelectores";

const BACKEND_HOST = process.env.BACKEND_HOST as string;
const BACKEND_PORT = process.env.BACKEND_PORT as string;

export const useVideoPlayerSocket = (
  video: React.RefObject<HTMLVideoElement>
): WebSocket | undefined => {
  const dispatch = useAppDispatch();
  const videoOperations = useVideoOperations(video);
  const isInteracted = useAppSelector(isInteractedSelector);

  const url = `ws:/${BACKEND_HOST}:${BACKEND_PORT}/player`;

  const onopen = () => {
    console.log("WebSocket connected");
  };
  const onclose = () => {
    console.log("WebSocket disconnect");
  };
  const onerror = () => {
    console.log("WebSocket error");
  };
  const onmessage = (ws: WebSocket, event: MessageEvent) => {
    const message = parsMessage(event.data);

    if (isInteracted) {
      switch (message.event) {
        case "user_connected":
          dispatch(setUsersCount(message.userCount));

        case "user_disconnected":
          dispatch(setUsersCount(message.userCount));
          break;
        case "pause_video":
          videoOperations.videoPause();
          break;
        case "play_video":
          videoOperations.videoPlay();
          break;
      }
    }
  };

  const websocket: IWebSocket = {
    url,
    onopen: onopen,
    onclose: onclose,
    onerror: onerror,
    onmessage: onmessage,
  };
  const ws = useWebSocket(websocket, [isInteracted]);

  return ws;
};

// }, [videoRef.current]);
