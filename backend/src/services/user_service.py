from loguru import logger

from ..repositories.user_repository import UserRepository
from ..schemas.user import UserDTO, UserCreateDTO


class UserService:
    def __init__(self, user_repository: UserRepository) -> None:
        self.user_repository = user_repository

    def register_user(self, user: UserCreateDTO) -> UserDTO:
        if user.password != user.password2:
            raise ValueError("The passwords don't match.")

        user_data = UserDTO(
            email=user.email,
            is_staff=user.is_staff,
            password=user.password,
            username=user.email
        )

        created_user = self.user_repository.create_user(user_data)

        return created_user

    def get_user_by_username(self, username: str) -> UserDTO | None:
        user = self.user_repository.get_user_by_username(username)

        if not user:
            return None

        return user

    def remove_user_by_username(self):
        pass

    def get_user_by_email(self, email: str):
        user = self.user_repository.get_user_by_email(email)

        if not user:
            return None

        return user
