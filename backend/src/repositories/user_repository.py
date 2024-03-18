from abc import ABC, abstractmethod

from sqlalchemy import select, delete
from loguru import logger

from ..models.user import User
from ..schemas.user import UserDTO, UserCreateDTO
from ..utils.password_utils import hash_password
from ..db import Session


class UserRepository(ABC):
    @abstractmethod
    def get_user_by_username(self, username: str) -> UserDTO | None:
        pass

    @abstractmethod
    def get_user_by_email(self, email: str) -> UserDTO | None:
        pass

    @abstractmethod
    def create_user(self, user_data: UserDTO) -> UserDTO:
        pass

    @abstractmethod
    def remove_user_by_username(self, username: str) -> None:
        pass


class UserRepositorySqlAlchemy(UserRepository):
    def get_user_by_username(self, username: str) -> UserDTO | None:
        with Session() as session:
            stmt = select(User).where(User.username == username)
            result = session.execute(stmt)
            user = result.scalar()

            if not user:
                return None

            user_dto = UserDTO.model_validate(user, from_attributes=True)

            return user_dto

    def get_user_by_email(self, email: str) -> UserDTO | None:
        with Session() as session:
            stmt = select(User).where(User.email == email)
            result = session.execute(stmt)
            user = result.scalar()

            if not user:
                return None

            user_dto = UserDTO.model_validate(user, from_attributes=True)
            return user_dto

    def create_user(self, user_data: UserDTO) -> UserDTO:
        with Session() as session:
            user = User(
                username=user_data.username,
                email=user_data.email,
                password=hash_password(user_data.password).decode("utf-8"),
                is_staff=False
            )
            logger.info(user)
            session.add(user)
            session.commit()
            logger.info(user)
            return user

    def remove_user_by_username(self, username: str) -> None:
        with Session() as session:
            stmt = delete(User).where(User.username == username)
            session.execute(stmt)
