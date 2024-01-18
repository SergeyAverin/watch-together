from sqlalchemy import Table, Column, String, Integer, MetaData, Boolean


metadata = MetaData()


user = Table(
    'users',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('username', String, nullable=False, unique=True),
    Column('is_staff', Boolean, default=False),
    Column('email', String)
)
