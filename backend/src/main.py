from os import environ

from fastapi import FastAPI
from loguru import logger

from .routers.player import player_router
from .sio import socket_app
from .middleware.catch_exceptions import catch_exceptions_middleware


logger.add('./logs/errors.log', level='ERROR')
logger.add('./logs/debug.log', level='DEBUG')
logger.add('./logs/logs.log', level='INFO')


def clear_old_log():
    open('./logs/errors.log', 'w').close()
    open('./logs/debug.log', 'w').close()
    open('./logs/logs.log', 'w').close()


IS_DEBUG = environ.get('BACKEND_IS_DEBUG', default=False)

app = FastAPI()

app.middleware('http')(catch_exceptions_middleware)

app.include_router(player_router)
app.mount("/", socket_app)


async def startup_event():
    if IS_DEBUG:
        clear_old_log()
    logger.info('Server run')

app.add_event_handler("startup", startup_event)
