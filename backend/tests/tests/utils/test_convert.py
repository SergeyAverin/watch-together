from src.core.utils.converter import convert_to_list_dicts, convert_to_list_dto, convert_to_dto, convert_to_dict
from pydantic import BaseModel


class TestUserDTO(BaseModel):
    name: str
    age: int


class TestConvert:
    user_1 = TestUserDTO(name='Sergey', age=21)
    user_2 = TestUserDTO(name='Bob', age=22)
    users_dto_list = [user_1, user_2]
    users_dict_list = [
        {"name": "Sergey", "age": 21},
        {"name": "Bob", "age": 22}
    ]

    def test_convert_list_dto_to_dict(self):
        res = convert_to_list_dicts(self.users_dto_list)
        assert isinstance(res, list)
        assert isinstance(res[0], dict)
        assert isinstance(res[1], dict)
        assert res == self.users_dict_list

    def test_convert_to_list_dto(self):
        res = convert_to_list_dto(self.users_dto_list, TestUserDTO)
        assert res == self.users_dto_list

    def test_convert_to_dto(self):
        res = convert_to_dto(self.user_1.model_dump(), TestUserDTO)
        assert isinstance(res, TestUserDTO)
        assert res == self.user_1

    def test_convert_to_dict(self):
        res = convert_to_dict(self.user_1)
        assert isinstance(res, dict)
        assert res == self.user_1.model_dump()
