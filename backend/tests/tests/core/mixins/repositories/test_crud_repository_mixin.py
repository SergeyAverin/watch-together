import pytest

from constants.users import test_user
from src.core.mixins.repositories.crud_mixin import SqlalchemyCRUDMixin
from src.core.exceptions.app_exceptions import DocumentNotFound


class TestMongoDatabaseCRUD:
    def test_create(self):
        user_repository = SqlalchemyCRUDMixin()
        created_user = user_repository.create(test_user.model_dump())
        assert created_user
        assert created_user['username'] == test_user.username
        assert isinstance(created_user, dict)
        user_repository.delete({}, True)

    def test_read(self):
        user_repository = SqlalchemyCRUDMixin()
        user_repository.create(test_user.model_dump())
        read_user = user_repository.read_one({'username': test_user.username})
        assert read_user
        assert read_user['username'] == test_user.username
        assert isinstance(read_user, dict)
        user_repository.delete({}, True)

    def test_read_with_not_found(self):
        user_repository = SqlalchemyCRUDMixin()
        user_repository.create(test_user.model_dump())
        with pytest.raises(Exception) as exc_info:
            user_repository.read_one({'username': 'not found'})
        assert str(exc_info.value) == "Document is not found."
        user_repository.delete({}, True)

    def test_read_with_can_by_none(self):
        user_repository = SqlalchemyCRUDMixin()
        user_repository.create(test_user.model_dump())
        user = user_repository.read_one({'username': 'not found'}, True)
        assert not user
        user2 = user_repository.read_one(
            {'username': test_user.username}, True)
        assert user2
        user_repository.delete({}, True)

    def test_read_many(self):
        user_repository = SqlalchemyCRUDMixin()
        user_repository.create(test_user.model_dump())
        read_user = user_repository.read_many({'username': test_user.username})
        assert isinstance(read_user, list)
        assert len(read_user) > 0
        assert read_user[0]['username'] == test_user.username
        user_repository.delete({}, True)

    def test_update_one(self):
        user_repository = SqlalchemyCRUDMixin()
        user_repository.create(test_user.model_dump())
        new_user_date_dict = test_user.model_dump()
        new_user_date_dict['age'] = 21
        updated_user = user_repository.update(
            {'user_id': test_user.user_id}, new_user_date_dict
        )
        assert updated_user['age'] == 21
        new_user_date_dict = test_user.model_dump()
        new_user_date_dict['age'] = 22
        updated_user = user_repository.update(
            {'user_id': test_user.user_id}, new_user_date_dict
        )
        assert updated_user['age'] == 22
        user_repository.delete({}, True)

    def test_update_many(self):
        user_repository = SqlalchemyCRUDMixin()
        user_repository.create({'username': 'Test1', 'tag': 'a', 'age': 18})
        user_repository.create({'username': 'Test2', 'tag': 'a', 'age': 18})
        user_repository.update({'tag': 'a'}, {'age': 66}, True)
        users = user_repository.read_many({'age': 66})
        assert len(users) == 2
        user_repository.delete({}, True)

    def test_delete_one(self):
        user_repository = SqlalchemyCRUDMixin()
        user_repository.create(test_user.model_dump())

        before_delete = user_repository.read_many(
            {'username': test_user.username})
        user_repository.delete({'username': test_user.username})
        after_delete = user_repository.read_many(
            {'username': test_user.username})

        assert len(after_delete) < len(before_delete)
        user_repository.delete({}, True)

    def test_delete_many(self):
        user_repository = SqlalchemyCRUDMixin()
        user_repository.create({'username': 'Test1', 'tag': 'a', 'age': 18})
        user_repository.create({'username': 'Test2', 'tag': 'a', 'age': 18})
        user_repository.create({'username': 'Test3', 'tag': 'a', 'age': 18})
        before_delete = user_repository.read_many({'tag': 'a'})
        user_repository.delete({'tag': 'a'}, True)
        after_delete = user_repository.read_many({'tag': 'a'})
        assert len(after_delete) < len(before_delete)
        assert len(after_delete) == 0
        user_repository.delete({}, True)
