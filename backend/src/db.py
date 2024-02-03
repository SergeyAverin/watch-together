from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from .config.db import DataBaseConfig

url = URL.create(
    drivername="postgresql",
    username=DataBaseConfig.DB_USERNAME,
    password=DataBaseConfig.DB_PASSWORD,
    host=DataBaseConfig.DB_HOST,
    database=DataBaseConfig.DB_DATABASE
)

engine = create_engine(url)
Base = declarative_base()
metadata = Base.metadata
Session = sessionmaker(bind=engine)
