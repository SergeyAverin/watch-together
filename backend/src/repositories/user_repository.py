from abc import ABC, abstractmethod

from schemas.user import UserDTO, UserCreateDTO


class UserReposiroty(ABC):
    @abstractmethod
    def get_user_by_username(self, username: str) -> UserDTO:
        pass

    @abstractmethod
    def create_user(self, user: UserCreateDTO) -> UserDTO:
        pass

    @abstractmethod
    def remove_user_by_username(self, username: str) -> None:
        pass
