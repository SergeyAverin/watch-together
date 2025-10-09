from src.account.schemas import UserDTO, Language, UserStatus


test_user = UserDTO(
    first_name='Sergey',
    last_name='Averin',
    lang=Language.RU.value,
    status=UserStatus.ADMIN.value,
    user_id='123',
    username='PrettyStreet'
)
