import json

from fastapi import APIRouter, WebSocket, WebSocketDisconnect


main_router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@main_router.get("/")
async def root():
    ''''''
    return {"active_connections": len(manager.active_connections)}


@main_router.websocket('/player')
async def player(websocket: WebSocket):
    ''''''
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            message['usersCount'] = len(manager.active_connections)
            # message['users'] = manager.active_connections
            #await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(json.dumps(message))
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast({"event": "error"})
