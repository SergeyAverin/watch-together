from json import dumps, loads

from fastapi import APIRouter, Depends
from loguru import logger

from ..sio import sio
from ..services.user_in_room_service import UserInRoomService
from ..repositories.users_in_room_repository import UsersInRoomRepositoryRedis
from ..dependencies.auth import get_current_auth_user

player_router = APIRouter()

user_in_room_service = UserInRoomService(
    UsersInRoomRepositoryRedis())


@player_router.get('/{room_name}')
def player(room_name: str, user=Depends(get_current_auth_user)):
    count = user_in_room_service.get_len_users_in_room(room_name)
    logger.debug(f'player view: {user}')
    return {"user_count": 3}


@sio.on("connect")
async def connect(sid: str, env: dict) -> None:
    room_name = env.get('QUERY_STRING', '').split('=')[1][0:-4]

    await sio.enter_room(sid, room_name)
    user_in_room_service.add_user_in_room(sid, room_name)

    logger.debug('socket io connect')

    message = {"user_id": sid, "room": room_name}
    message_json = dumps(message)

    await sio.emit('user_connect', message_json, room=room_name)


@sio.on("disconnect")
async def disconnect(sid: str) -> None:
    logger.debug('socket io disconnect')


@sio.event
async def user_disconnect(sid: str, message: dict) -> None:
    message = loads(message)
    room_name = message['room']
    user_id = message['user_id']

    logger.debug(f'user { user_id } disconnect from {room_name}')

    user_in_room_service.remove_user_from_room(user_id, room_name)

    await sio.leave_room(user_id, room_name)


@sio.event
async def play_video(sid: str, message: dict) -> None:
    logger.debug('play_video')
    await sio.emit('play_video', message, room='roomm')


@sio.event
async def pause_video(sid: str, message: dict) -> None:
    logger.debug('pause_video')
    await sio.emit('pause_video', message, room='roomm')


@sio.event
async def follow_user(sid: str, data: dict) -> None:
    logger.error('follow')

# user_in_room_service.remove_user_from_room(sid, room_name)
