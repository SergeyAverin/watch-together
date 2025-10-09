from typing import TypeVar, Generic, List, Type, Optional

from pydantic import BaseModel
from sqlalchemy.orm import DeclarativeBase

from core.mixins.repositories.crud_mixin import CRUDMixin
from core.utils.converter import convert_to_list_dto, convert_to_dto

T = TypeVar('T', bound=BaseModel)
# Определяем TypeVar с ограничением на тип (должен быть подклассом BaseModel)
M = TypeVar('M', bound=DeclarativeBase)

class CRUDServiceMixin(Generic[T, M]):
    id_field = 'id'

    def __init__(self, entity_repository: CRUDMixin, model: Type[T]):
        self.entity_repository = entity_repository
        self.model = model

    async def create(self, data: T) -> T:
        new_obj = await self.entity_repository.create(data.model_dump())
        return convert_to_dto(new_obj, self.model)

    async def read_by_id(self, obj_id: str, is_can_be_none: bool = False) -> Optional[T]:
        data = await self.entity_repository.read_one(
            {self.id_field: obj_id}, is_can_be_none)
        return convert_to_dto(data, self.model)

    async def read_many(self, filters: dict) -> List[T]:
        objs = await self.entity_repository.read_many(filters)
        return convert_to_list_dto(objs, self.model)

    async def read_one(self, filters: dict, is_can_be_none: bool = False) -> Optional[T]:
        obj = await self.entity_repository.read_one(filters, is_can_be_none)
        return convert_to_dto(obj, self.model)

    async def update(self, filters: dict, new_data: T, is_many: bool = False) -> T:
        updated_obj = await self.entity_repository.update(
            filters, new_data.model_dump(), is_many)
        return convert_to_dto(updated_obj, self.model)

    async def delete(self, filters: dict, is_many: bool = False) -> None:
        await self.entity_repository.delete(filters, is_many)
