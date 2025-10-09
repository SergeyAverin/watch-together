from datetime import datetime, timedelta

from jose import jwt

from core.config.auth_setting import auth_setting


def create_access_token(
    data: dict,
    expires_delta: timedelta = timedelta(
        minutes=auth_setting.auth_access_token_expire_minutes)
) -> str:
    to_encode = data.copy()

    expire = datetime.utcnow() + expires_delta

    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(
        to_encode,
        auth_setting.auth_secret_key,
        algorithm=auth_setting.auth_algorithm
    )
    return encoded_jwt


def create_refresh_token(data: dict, expires_delta: timedelta = timedelta(days=7)):
    to_encode = data.copy()

    expire = datetime.utcnow() + expires_delta

    to_encode.update({"exp": expire, "type": "refresh"})
    encoded_jwt = jwt.encode(
        to_encode,
        auth_setting.auth_secret_key,
        algorithm=auth_setting.auth_algorithm
    )
    return encoded_jwt
