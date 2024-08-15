import { useEffect, useRef } from "react";

type WebSocketFunction = (this: WebSocket, ev: Event) => any;

export interface IWebSocket {
  url: string;
  onopen: WebSocketFunction | null;
  onclose: WebSocketFunction | null;
  onerror: WebSocketFunction | null;
  onmessage: (ws: WebSocket, message: MessageEvent) => void;
}

export const useWebSocket = (
  websocket: IWebSocket,
  watch: any[]
): WebSocket | undefined => {
  const socketRef = useRef<WebSocket | undefined>();

  useEffect(() => {
    socketRef.current = new WebSocket(websocket.url);

    socketRef.current.onopen = websocket.onopen;

    socketRef.current.onmessage = (event) =>
      websocket.onmessage(socketRef.current as WebSocket, event);

    socketRef.current.onclose = websocket.onclose;

    socketRef.current.onerror = websocket.onerror;

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, watch);
  return socketRef.current;
};
