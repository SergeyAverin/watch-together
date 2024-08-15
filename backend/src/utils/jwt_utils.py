from typing import Any, Union, Dict
from datetime import datetime, timedelta

from jose import jwt


def encode_jwt(
    payload: dict,
    private_key: str,
    algorithm: str = 'HS256',
    expire_minutes: int = 3
) -> str:
    payload = payload.copy()
    now = datetime.utcnow()
    expire = now + timedelta(minutes=expire_minutes)

    ito = now.isoformat()
    expire = expire.isoformat()

    payload.update(ito=ito, expire=expire)

    encoded = jwt.encode(payload, private_key, algorithm=algorithm)

    return encoded


def decode_jwt(
    jwt_token: Union[str, bytes],
    public_key: str,
    algorithm: str = 'HS256'
) -> Dict[str, Any]:
    decoded = jwt.decode(jwt_token, public_key, algorithms=algorithm)
    return decoded
