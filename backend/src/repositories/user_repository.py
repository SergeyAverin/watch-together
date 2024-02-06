from abc import ABC, abstractmethod

from sqlalchemy import select, delete
from loguru import logger

from ..models.user import User
from ..schemas.user import UserDTO, UserCreateDTO
from ..utils.password_utils import hash_password
from ..db import Session


class UserRepository(ABC):
    @abstractmethod
    def get_user_by_username(self, username: str) -> UserDTO:
        pass

    @abstractmethod
    def create_user(self, user_data: UserDTO) -> UserDTO:
        pass

    @abstractmethod
    def remove_user_by_username(self, username: str) -> None:
        pass


class UserRepositorySqlAlchemy(UserRepository):
    def get_user_by_username(self, username: str) -> User:
        with Session() as session:
            logger.debug(f'user repository:  get user by username {username}')

            stmt = select(User).where(User.username == username)
            result = session.execute(stmt)
            user = result.scalar()

            logger.debug(f'user repository: user {user}')

            return user

    def create_user(self, user_data: UserDTO) -> UserDTO:
        with Session() as session:
            user = User(
                username=user_data.username,
                email=user_data.email,
                password=hash_password(user_data.password),
                is_staff=False
            )
            session.add(user)
            session.commit()
            return user

    def remove_user_by_username(self, username: str) -> None:
        with Session() as session:
            stmt = delete(User).where(User.username == username)
            session.execute(stmt)
