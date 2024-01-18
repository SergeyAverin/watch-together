from typing import List, Dict

from ..repositories.follow_repository import FollowRepository
from ..repositories.users_in_room_repository import UsersInRoomRepository


class FollowService:
    def __init__(self, follow_repository: FollowRepository) -> None:
        self.follow_repository = follow_repository

    def get_all_follows_in_room(
            self,
            room_name: str,
            users_in_room_repository: UsersInRoomRepository) -> Dict[str, str]:
        users_in_room = users_in_room_repository.get_users_from_room(room_name)
        all_follows_in_room = {}
        for user in users_in_room:
            followers = self.follow_repository.get_user_followers(user)
            all_follows_in_room[user] = followers
        return all_follows_in_room

    def get_user_followers(self, user_id: str) -> List(str):
        return self.follow_repository.get_user_followers(user_id)

    def get_user_follow(self, user_id: str) -> str:
        return self.get_user_follow(user_id)

    def follow_user(self, follow_user_id: str, follower_user_id: str) -> None:
        if self._is_following(follower_user_id):
            self.follow_repository.remove_follower(
                self.follow_repository.get_user_follow(follower_user_id), follower_user_id)
        self.follow_repository.add_follower(follow_user_id, follower_user_id)

    def unfollow_user(self, follow_user_id: str, follower_user_id: str) -> None:
        self.follow_repository.remove_follower(
            follow_user_id, follower_user_id)

    def _is_following(self, user_id: str) -> bool:
        return self.follow_repository.is_following(user_id)
