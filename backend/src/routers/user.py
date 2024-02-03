from fastapi import APIRouter

from ..services.user_service import UserService
from ..repositories.user_repository import UserRepositorySqlAlchemy


user_router = APIRouter()


@user_router.get('/user/{username}')
def get_user_by_username(username: str):
    user_repository = UserRepositorySqlAlchemy()
    user_service = UserService(user_repository)
    user = user_service.get_user_by_username(username)
    return {"username": user}
