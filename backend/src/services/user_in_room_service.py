from typing import List

from ..repositories.users_in_room_repository import UsersInRoomRepository


class UserInRoomService:
    def __init__(self, repository: UsersInRoomRepository) -> None:
        self.repository = repository

    def get_user_from_room(self, room_name: str) -> List[str]:
        return self.repository.get_user_from_room(room_name)

    def add_user_in_room(self, user_id: str, room_name) -> None:
        self.repository.add_user_in_room(user_id, room_name)

    def remove_user_from_room(self, user_id: str, room_name: str) -> None:
        self.repository.remove_user_from_room(user_id, room_name)

    def get_len_users_in_room(self, room_name: str) -> int:
        return self.repository.get_len_users_in_room(room_name)
