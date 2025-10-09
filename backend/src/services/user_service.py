from sqlalchemy.ext.asyncio import AsyncSession

from  repositories.user_repository import UserRepository
from schemas.user import UserDTO
from models.user import User
from core.mixins.services.crud_mixin import CRUDServiceMixin


# Сервис для работы с пользователями
class UserService(CRUDServiceMixin[UserRepository, User]):
    def __init__(self, session: AsyncSession):
        repository = UserRepository(session, User)
        super().__init__(repository, UserRepository)
