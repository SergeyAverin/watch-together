from src.utils.password_utils import hash_password


def test_hash_password():
    ''' Should hashed password. '''

    password_before_hash = '123'
    password_after_hash = hash_password(password_before_hash)

    print(password_before_hash)
    print(password_after_hash)

    assert password_before_hash != password_after_hash
