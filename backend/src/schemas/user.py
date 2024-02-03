from pydantic import BaseModel, EmailStr


class UserCreateDTO(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserDTO(UserCreateDTO):
    id: int
    is_staff: bool
