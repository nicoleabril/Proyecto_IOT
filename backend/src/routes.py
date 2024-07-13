from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse
from src.data_handler import DataHandler
from src.conn import ConnMQTT

router = APIRouter()
# Instancia única del manejador de datos


@router.get("/")
async def index():
    return JSONResponse({"message": "Bienvenido a la API"})


@router.websocket("/ws/temperature")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()  # Acepta la conexión

    data_handler = DataHandler()

    mqtt = ConnMQTT()
    mqtt.subscribe("temperature", data_handler.send_temp)

    data_handler.temp_subscribers.append(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            print(f"Mensaje recibido: {data}")
    except WebSocketDisconnect:
        data_handler.temp_subscribers.remove(websocket)
        print("WebSocket desconectado")


@router.websocket("/ws/humidity")
async def websocket_endpoint(websocket: WebSocket):

    await websocket.accept()  # Acepta la conexión

    data_handler = DataHandler()

    mqtt = ConnMQTT()
    mqtt.subscribe("humidity", data_handler.send_hum)

    data_handler.hum_subscribers.append(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            print(f"Mensaje recibido: {data}")
    except WebSocketDisconnect:
        data_handler.hum_subscribers.remove(websocket)
        print("WebSocket desconectado")
