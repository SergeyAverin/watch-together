from logging import getLogger
from typing import List
from abc import ABC, abstractmethod

from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import DeclarativeBase


logger = getLogger()


class CRUDMixin(ABC):
    @abstractmethod
    async def create(self, data: dict) -> dict:
        pass

    @abstractmethod
    async def read_one(self, filters: dict, is_can_be_none: bool) -> dict | None:
        pass

    @abstractmethod
    async def read_many(self, filters: dict) -> List[dict] | None:
        pass

    @abstractmethod
    async def update(self, filters: dict, new_data: dict, is_many: bool) -> dict:
        pass

    @abstractmethod
    async def delete(self, filters: dict, is_many: bool):
        pass


class SqlalchemyCRUDMixin(CRUDMixin):
    def __init__(self, session: AsyncSession, model: DeclarativeBase):
        self.session = session
        self.model = model

    async def create(self, data: dict) -> dict:
        instance = self.model(**data)
        self.session.add(instance)
        await self.session.commit()
        await self.session.refresh(instance)
        return self._instance_to_dict(instance)

    async def read_one(self, filters: dict, is_can_be_none: bool = False) -> dict | None:
        query = select(self.model).filter_by(**filters)
        result = await self.session.execute(query)
        instance = result.scalar_one_or_none()

        if instance is None and not is_can_be_none:
            raise ValueError("No instance found with given filters")

        return self._instance_to_dict(instance) if instance else None

    async def read_many(self, filters: dict) -> list[dict]:
        query = select(self.model).filter_by(**filters)
        result = await self.session.execute(query)
        instances = result.scalars().all()
        return [self._instance_to_dict(instance) for instance in instances]

    async def update(self, filters: dict, new_data: dict, is_many: bool = False) -> dict:
        query = update(self.model).filter_by(**filters).values(**new_data)
        if not is_many:
            query = query.limit(1)

        await self.session.execute(query)
        await self.session.commit()

        return await self.read_one(filters)

    async def delete(self, filters: dict, is_many: bool = False) -> None:
        query = delete(self.model).filter_by(**filters)
        if not is_many:
            query = query.limit(1)

        await self.session.execute(query)
        await self.session.commit()

    def _instance_to_dict(self, instance) -> dict:
        return {column.name: getattr(instance, column.name)
                for column in instance.__table__.columns}
