from typing import List
from abc import abstractmethod, ABC

from redis import Redis


class FollowRepository(ABC):
    @abstractmethod
    def get_user_followers(self, user_id: str) -> List[str]:
        pass

    @abstractmethod
    def get_user_follow(self, user_id: str) -> str:
        pass

    @abstractmethod
    def is_following(self, user_id: str) -> bool:
        pass

    @abstractmethod
    def add_follower(self, follow_user_id: str, follower_user_id: str) -> None:
        pass

    @abstractmethod
    def remove_follower(self, follow_user_id: str, follower_user_id: str) -> None:
        pass


class FollowRepositoryRedis(FollowRepository):
    def __init__(self) -> None:
        self.r = Redis(host='redis', port=6379, db=0)

    def get_user_followers(self, user_id: str) -> List[str]:
        return self.r.lrange(user_id, 0, -1)

    def get_user_follow(self, user_id: str) -> str:
        return self.r.get(user_id)

    def is_following(self, user_id: str) -> bool:
        return self.r.exists(user_id)

    def add_follower(self, follow_user_id: str, follower_user_id: str) -> None:
        self.r.lpush(follow_user_id, follower_user_id)
        self._set_user_follow(follower_user_id, follow_user_id)

    def remove_follower(self, follow_user_id: str, follower_user_id: str) -> None:
        self.r.lrem(follow_user_id, 0, follower_user_id)
        self._unfolow_user(follower_user_id)

    def _set_user_follow(self, follower_user_id: str, follow_user_id: str) -> None:
        self.r.set(follower_user_id, follow_user_id)

    def _unfolow_user(self, follower_user_id: str) -> None:
        self.r.delete(follower_user_id)
