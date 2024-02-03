import traceback
from os import environ

from fastapi import Request
from fastapi.responses import JSONResponse
from loguru import logger


IS_DEBUG = environ.get('BACKEND_IS_DEBUG', default=False)


async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as error:
        if IS_DEBUG:
            error_message = traceback.format_exc()
            logger.error(f'{error.__class__.__name__}: {error_message}')
            content = {
                'status_code': 500,
                'error': error.__class__.__name__,
                'traceback': error_message
            }
            return JSONResponse(status_code=500, content=content)
        else:
            content = {
                'status_code': 500,
                'error': 'Internal server error'
            }
            return JSONResponse(status_code=500, content=content)
