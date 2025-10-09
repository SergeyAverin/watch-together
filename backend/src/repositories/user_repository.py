from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import DeclarativeBase

from core.mixins.repositories.crud_mixin import SqlalchemyCRUDMixin
from models.user import User


class UserRepository(SqlalchemyCRUDMixin):
    def __init__(self, session: AsyncSession, model: DeclarativeBase):
        super().__init__(session, model)

    async def get_by_id(self, id: int):
        return await self.read_one({'id': id})
