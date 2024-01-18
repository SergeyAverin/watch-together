import json
import logging

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from ..sockets.manager import ConnectionManager


main_router = APIRouter()

logger = logging.getLogger()

manager = ConnectionManager()


@main_router.websocket('/player/{room_name}')
async def player_websocket(websocket: WebSocket, room_name: str, user: str):
    await manager.connect(websocket, room_name, user)
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            await manager.broadcast(json.dumps(message))
    except WebSocketDisconnect:
        await manager.disconnect(websocket, room_name, user)
