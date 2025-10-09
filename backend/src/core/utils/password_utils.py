import bcrypt


def hash_password(password: str) -> bytes:
    salt = bcrypt.gensalt()
    password_bytes = password.encode()
    hashed_password = bcrypt.hashpw(password_bytes, salt)
    return hashed_password


def valid_password(password: str, hashed_password: bytes) -> bool:
    return bcrypt.checkpw(password.encode(), hashed_password)
