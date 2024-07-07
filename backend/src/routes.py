from fastapi import APIRouter, Request, Depends
from fastapi.responses import JSONResponse
from fastapi import WebSocket

from src.data_handler import DataHandler

router = APIRouter()

@router.get('/')
async def index():
    return JSONResponse({'message':'Bienvenido a la API'})

@router.websocket("/ws/temperature")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept() #acepta la conexión
    data_handler = DataHandler()
    data_handler.hum_subscribers.append(websocket)