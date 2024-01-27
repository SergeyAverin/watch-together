from fastapi import FastAPI
from loguru import logger

from .routers.player import player_router
from .sio import socket_app


app = FastAPI()

app.include_router(player_router)
app.mount("/", socket_app)


async def startup_event():
    logger.info('Server run')

app.add_event_handler("startup", startup_event)
