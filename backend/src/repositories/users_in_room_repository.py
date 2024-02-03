''''''
from typing import List
from abc import abstractmethod, ABC

from redis import Redis


class UsersInRoomRepository(ABC):
    @abstractmethod
    def get_users_from_room(self, room_name: str) -> List[str]:
        pass

    @abstractmethod
    def get_user_room(self, username: str) -> List[str]:
        pass

    @abstractmethod
    def add_user_in_room(self, user_id: str, room_name: str) -> None:
        pass

    @abstractmethod
    def remove_user_from_room(self, user_id: str, room_name: str):
        pass

    @abstractmethod
    def get_len_users_in_room(self, room_name: str) -> int:
        pass


class UsersInRoomRepositoryRedis(UsersInRoomRepository):
    def __init__(self) -> None:
        self.r = Redis(host='redis', port=6379, db=0)

    def get_users_from_room(self, room_name: str) -> List[str]:
        return self.r.lrange(room_name, 0, -1)

    def add_user_in_room(self, user_id: str, room_name: str):
        self.r.lpush(room_name, user_id)

    def remove_user_from_room(self, user_id: str, room_name: str):
        self.r.lrem(room_name, 0, user_id)

    def get_len_users_in_room(self, room_name: str) -> int:
        return self.r.llen(room_name)

    def get_user_room(self, username: str) -> List[str]:
        return ['']
