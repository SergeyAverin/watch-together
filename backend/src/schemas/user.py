from pydantic import BaseModel, EmailStr


class UserDTO(BaseModel):
    username: str
    email: EmailStr
    password: str
    is_staff: bool


class UserCreateDTO(UserDTO):
    password2: str


class AuthDataDTO(BaseModel):
    email: EmailStr
    password: str
