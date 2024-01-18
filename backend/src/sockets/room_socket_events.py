from enum import Enum


class RoomSocketEvents(Enum):
    USER_CONNECTED = 'user_connected'
    USER_DISCONECTED = 'user_disconnected'
    SET_USER_VIDEO_TIME = 'set_user_video_time'
    PLAY_VIDEO = 'play_video'
    PAUSE_VIDEO = 'pause_video'
    FOLLOW_USER = 'follo_user'
    UNFOLLOW_USER = 'unfollow_user'
