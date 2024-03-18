from fastapi import APIRouter
from fastapi.responses import JSONResponse
from loguru import logger

from ..services.user_service import UserService
from ..repositories.user_repository import UserRepositorySqlAlchemy
from ..schemas.user import UserCreateDTO, AuthDataDTO


user_router = APIRouter()

user_repository = UserRepositorySqlAlchemy()
user_service = UserService(user_repository)


@user_router.get('/user/{username}')
def get_user_by_username(username: str):
    user = user_service.get_user_by_username(username)

    if not user:
        return JSONResponse(status_code=404, content={'message': 'User not found'})

    return {"username": user}


@user_router.post('/user/register')
def register_user(user_data: UserCreateDTO):
    user = user_service.register_user(user_data)
    # user_response = UserDTO.model_validate(user, from_attributes=True)
    return user
