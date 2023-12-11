from sqlalchemy import create_engine
from sqlalchemy.engine import URL

from .config.db import DataBaseConfig


url = URL.create(
    drivername="postgresql",
    username=DataBaseConfig.DB_USERNAME,
    password=DataBaseConfig.DB_PASSWORD,
    host=DataBaseConfig.DB_HOST,
    database=DataBaseConfig.DB_DATABASE
)

engine = create_engine(url)
