from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


from ..repositories.user_repository import UserRepositorySqlAlchemy
from ..services.user_service import UserService
from ..utils.jwt_utils import decode_jwt


user_repository = UserRepositorySqlAlchemy()
user_service = UserService(user_repository)

http_bearer = HTTPBearer()


def get_current_auth_user(credentials: HTTPAuthorizationCredentials = Depends(http_bearer)):
    token = credentials.credentials
    payload = decode_jwt(token, 'key')
    user = user_service.get_user_by_email(payload['email'])
    return user
