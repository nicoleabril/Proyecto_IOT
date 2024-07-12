from fastapi import APIRouter, WebSocket
from fastapi.responses import JSONResponse
from src.data_handler import DataHandler

router = APIRouter()
data_handler = DataHandler()  # Instancia única del manejador de datos

@router.get('/')
async def index():
    return JSONResponse({'message': 'Bienvenido a la API'})

@router.websocket("/ws/temperature")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()  # Acepta la conexión
    data_handler.temp_subscribers.append(websocket)  # Agrega el WebSocket a la lista de suscriptores de temperatura

@router.websocket("/ws/humidity")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()  # Acepta la conexión
    data_handler.hum_subscribers.append(websocket)  # Agrega el WebSocket a la lista de suscriptores de humedad
