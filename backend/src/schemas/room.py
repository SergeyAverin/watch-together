from pydantic import BaseModel


class RoomCreateDTO(BaseModel):
    room_title: str
    source_url: str
    owner: str


class RoomDTO(RoomCreateDTO):
    id: int
    room_slug: str
