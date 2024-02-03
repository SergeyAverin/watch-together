from abc import ABC, abstractmethod

from sqlalchemy import select, delete
from loguru import logger

from ..models.user import User
from ..schemas.user import UserDTO, UserCreateDTO
from ..db import Session


class UserRepository(ABC):
    @abstractmethod
    def get_user_by_username(self, username: str) -> UserDTO:
        pass

    @abstractmethod
    def create_user(self, user: UserCreateDTO) -> UserDTO:
        pass

    @abstractmethod
    def remove_user_by_username(self, username: str) -> None:
        pass


class UserRepositorySqlAlchemy(UserRepository):
    def get_user_by_username(self, username: str) -> UserDTO:
        with Session() as session:
            logger.debug(f'user repository:  get user by username {username}')

            stmt = select(User).where(User.username == username)
            result = session.execute(stmt)
            user = result.scalar()

            logger.debug(f'user repository: user {user}')

            user_dto = UserDTO.model_validate(user, from_attributes=True)
            return user_dto

    def create_user(self, user: UserCreateDTO) -> UserDTO:
        with Session() as session:
            user = User(user)
            session.add(user)
            session.commit()
            return user

    def remove_user_by_username(self, username: str) -> None:
        with Session() as session:
            stmt = delete(User).where(User.username == username)
            session.execute(stmt)
