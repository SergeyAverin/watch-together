from typing import List

from pydantic import TypeAdapter, BaseModel


def convert_to_list_dto(data: List,  dto: BaseModel) -> List[BaseModel]:
    ''' Конвертирует массив словарей в переданный DTO '''
    ta = TypeAdapter(List[dto])
    m = ta.validate_python(data)
    return m


def convert_to_list_dicts(data: List[BaseModel]) -> List[dict]:
    ''' Конвертирует массив DTO в массив словарей '''
    return [item.model_dump() for item in data]


def convert_to_dto(data: dict, dto: BaseModel):
    print(dto)
    return dto(**data)


def convert_to_dict(dto: BaseModel):
    return dto.model_dump()
