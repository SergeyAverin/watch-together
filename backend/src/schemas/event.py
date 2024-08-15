from pydantic import BaseModel

from ..sockets.room_socket_events import RoomSocketEvents


class PlayVideoEvent(BaseModel):
    event: RoomSocketEvents.PLAY_VIDEO.value
    currentTime: int


class PauseVideoEvent(BaseModel):
    event: RoomSocketEvents.PAUSE_VIDEO.value
    currentTime: int


class SetUserVideoTimeEvent(BaseModel):
    event: RoomSocketEvents.SET_USER_VIDEO_TIME.value
    currentTime: int
    userId: str


class UserConnectedVideoEvent(BaseModel):
    event: RoomSocketEvents.USER_CONNECTED.value
    # userId: str


class UserDisconnectedEvent(BaseModel):
    event: RoomSocketEvents.USER_DISCONECTED.value
    # userId: str


# class FollowUserEvent(BaseModel):
#    event: RoomSocketEvents.FOLLOW_USER
#    userId: str


class UnFollowUserEvent(BaseModel):
    event: RoomSocketEvents.UNFOLLOW_USER
    userId: str
