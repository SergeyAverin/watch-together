from src.core.utils.password_utils import hash_password, valid_password


class TestPasswordUtils:

    def test_hash_password(self):
        ''' Should hashed password. '''
        password_before_hash = '123'
        password_after_hash = hash_password(password_before_hash)
        assert password_before_hash != password_after_hash

    def test_valid_password(self):
        ''' Should return valid. '''
        password_before_hash = '123'
        password_after_hash = hash_password(password_before_hash)
        assert valid_password(password_before_hash, password_after_hash) is True
        assert valid_password('234', password_after_hash) is False
