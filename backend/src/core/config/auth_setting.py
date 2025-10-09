from pydantic_settings import BaseSettings


class AuthSettings(BaseSettings):
    auth_secret_key: str
    auth_algorithm: str
    auth_access_token_expire_minutes: int
    auth_refresh_token_expire_days: int

    class Config:
        case_sensitive = False


auth_setting = AuthSettings()
