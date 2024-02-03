from abc import ABC, abstractmethod

from ..schemas.room import RoomCreateDTO, RoomDTO


class RoomRepository(ABC):
    @abstractmethod
    def get_room_by_slug(self, slug) -> RoomDTO:
        pass

    @abstractmethod
    def create_room(self, room: RoomCreateDTO) -> RoomDTO:
        pass

    @abstractmethod
    def remove_room_by_slug(self, slug: str) -> None:
        pass
