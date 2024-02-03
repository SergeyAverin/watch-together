import { useEffect } from "react";

import { socket } from "../socket";
import { stringifyMessage } from "@utils/socketMessaeg";
import { useAppSelector } from "./storeHooks";
import { isInteractedSelector } from "@redux/selectors/playerSelectores";

export interface ISocketIoHandler {
  eventName: string;
  eventHandler: (value: string) => void;
}

export const useSocketIO = (
  socketIOHandlers: Array<ISocketIoHandler>
): void => {
  const isInteracted = useAppSelector(isInteractedSelector);

  const onConnection = () => {
    console.log("SocketIO: Socket io is connected");
  };
  const onDisconnect = () => {
    console.log("SocketIO: Socket io is disconnected");
  };
  const onError = (error: Error) => {
    console.log(`Error SocketIO: ${error}`);
  };
  useEffect(() => {
    if (isInteracted) {
      socket.on("connect", onConnection);
      socket.on("disconnect", onDisconnect);
      socket.on("connect_error", onError);

      socketIOHandlers.forEach((handler) => {
        socket.on(handler.eventName, handler.eventHandler);
      });
    }

    return () => {
      const message = { user_id: "socket.id", room: "roomm" };
      const data = stringifyMessage(message);
      socket.emit("user_disconnect", data);
      console.log(`SocketIO: emit user_disconnect ${data}`);

      socket.off("connect", onConnection);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onError);

      socketIOHandlers.forEach((handler) => {
        socket.off(handler.eventName, handler.eventHandler);
      });
    };
  }, [isInteracted]);
};
