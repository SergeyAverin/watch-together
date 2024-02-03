from ..repositories.user_repository import UserRepository


class UserService:
    def __init__(self, user_repository: UserRepository) -> None:
        self.user_repository = user_repository

    def register_user(self):
        pass

    def get_user_by_username(self, username: str):
        return self.user_repository.get_user_by_username(username)

    def remove_user_by_username(self):
        pass
