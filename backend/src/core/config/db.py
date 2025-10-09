import os
from dataclasses import dataclass


@dataclass
class DataBaseConfig:
    DB_HOST = os.environ['DB_HOST']
    DB_USERNAME = os.environ['DB_USERNAME']
    DB_PASSWORD = os.environ['DB_PASSWORD']
    DB_DATABASE = os.environ['DB_DATABASE']
