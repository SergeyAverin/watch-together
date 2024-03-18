from typing_extensions import Annotated

from loguru import logger
from fastapi import APIRouter, Form, status, HTTPException, Response

from ..repositories.user_repository import UserRepositorySqlAlchemy
from ..services.user_service import UserService
from ..utils.password_utils import valid_password
from ..utils.jwt_utils import encode_jwt


auth_router = APIRouter(prefix='/auth', tags=['auth'])

user_repository = UserRepositorySqlAlchemy()
user_service = UserService(user_repository)


@auth_router.post('/login')
def login_jwt(email: Annotated[str, Form()], password: Annotated[str, Form()], response: Response):
    logger.error(f'{password} {email}')

    user = user_service.get_user_by_email(email)

    invalid_user_error = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="user inactive",
    )

    if not user:
        raise invalid_user_error

    is_valid = valid_password(password, user.password.encode())

    if not is_valid:
        raise invalid_user_error

    payload = {
        "sub": user.email,
        "username": user.username,
        "email": user.email
    }
    jwt_token = encode_jwt(payload, 'key')

    response.set_cookie(key="jwt", value=jwt_token)

    return {'access_token': jwt_token}
