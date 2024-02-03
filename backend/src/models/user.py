from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String

from src.db import Base


class User(Base):
    __tablename__ = 'user'

    id: Mapped[int] = mapped_column(autoincrement=True,  primary_key=True)
    username: Mapped[str] = mapped_column(String, unique=True, index=True)
    email: Mapped[str] = mapped_column(String, unique=True)
    password: Mapped[str]
    is_staff: Mapped[bool]

    def __repr__(self):
        return f"<User(username='{self.username}', email='{self.email}')>"
