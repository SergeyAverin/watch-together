import json
import logging

from fastapi import WebSocket, WebSocketDisconnect

from .room_socket_events import RoomSocketEvents
from ..services.user_in_room_service import UserInRoomService
from ..repositories.users_in_room_repository import UsersInRoomRepositoryRedis


logger = logging.getLogger()


class ConnectionManager:
    # _instance = None

    # def __new__(class_, *args, **kwargs):
    #     if not isinstance(class_._instance, class_):
    #         class_._instance = object.__new__(class_, *args, **kwargs)
    #     return class_._instance

    def __init__(self):
        self.user_in_room_service = UserInRoomService(
            UsersInRoomRepositoryRedis())
        self.active_connections = []

    async def connect(self, websocket: WebSocket, room_name: str, user: str):
        await websocket.accept()
        self.active_connections.append(websocket)

        self.user_in_room_service.add_user_in_room(user, room_name)

        message = {
            "event": RoomSocketEvents.USER_CONNECTED.value,
            "userCount": self.user_in_room_service.get_len_users_in_room(room_name)
        }
        await self.broadcast(json.dumps(message))

    async def disconnect(self, websocket: WebSocket, room_name: str, user: str):
        self.active_connections.remove(websocket)
        self.user_in_room_service.remove_user_from_room(user, room_name)
        message = {
            "event": RoomSocketEvents.USER_DISCONECTED.value,
            "userCount": self.user_in_room_service.get_len_users_in_room(room_name)
        }

        await self.broadcast(json.dumps(message))

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        logger.error(self.active_connections)
        for connection in self.active_connections:
            await connection.send_text(message)
