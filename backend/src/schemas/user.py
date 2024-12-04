from pydantic import BaseModel, EmailStr


class UserDTO(BaseModel):
    username: str
    email: EmailStr
    password: str
    is_staff: bool


class UserCreateDTO(BaseModel):
    username: str
    email: EmailStr
    password2: str
    password: str


class AuthDataDTO(BaseModel):
    email: EmailStr
    password: str
