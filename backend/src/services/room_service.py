from schemas.room import RoomDTO, RoomCreateDTO
from schemas.user import UserDTO


class RoomService():
    def get_room_by_slug(self, slug: str) -> RoomDTO:
        pass

    def get_user_rooms(self, user: UserDTO):
        pass

    def create_room(self, room: RoomCreateDTO) -> RoomDTO:
        pass

    def delete_room(self, slug: str) -> None:
        pass
