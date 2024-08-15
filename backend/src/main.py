from os import environ

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from .routers.player import player_router
from .routers.user import user_router
from .routers.auth import auth_router
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

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.middleware('http')(catch_exceptions_middleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix='/api/v1.0')

api_router.include_router(player_router)
api_router.include_router(user_router)
api_router.include_router(auth_router)

app.include_router(api_router)
app.mount("/", socket_app)


async def startup_event():
    if IS_DEBUG:
        clear_old_log()
    logger.info('Server run')

app.add_event_handler("startup", startup_event)
