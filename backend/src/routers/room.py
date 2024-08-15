from fastapi import APIRouter


room_router = APIRouter()


@room_router.get('/')
def get_user_rooms():
    ''' get user's room '''
    return {}


@room_router.post('/')
def create_room():
    ''' create room  '''
    return {}


@room_router.delete('/<room_name>')
def delete_room():
    ''' get room by room name  '''
    return {}


@room_router.delete('/<room_name>')
def ger_room():
    ''' delete room by room name  '''
    return {}
