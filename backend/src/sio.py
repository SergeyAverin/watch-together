import socketio

mgr = socketio.AsyncRedisManager('redis://redis:6379')
sio = socketio.AsyncServer(
    client_manager=mgr, cors_allowed_origins='*', async_mode='asgi')

socket_app = socketio.ASGIApp(sio)
