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
async def websocket_temperature(websocket: WebSocket):
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
async def websocket_humidity(websocket: WebSocket):

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


@router.websocket("/ws/LED")
async def websocket_led(websocket: WebSocket):

    await websocket.accept()  # Acepta la conexión

    data_handler = DataHandler()

    mqtt = ConnMQTT()
    mqtt.subscribe("LED", data_handler.send_led)

    data_handler.led_subscribers.append(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            data = data.replace('"', "")
            mqtt.client.publish("LED", data)
            print(f"Mensaje recibido: {data}")
    except WebSocketDisconnect:
        data_handler.led_subscribers.remove(websocket)
        print("WebSocket desconectado")


@router.websocket("/ws/FAN")
async def websocket_fan(websocket: WebSocket):
    
        await websocket.accept()  # Acepta la conexión

        data_handler = DataHandler()

        mqtt = ConnMQTT()

        mqtt.subscribe("FAN", data_handler.send_fan)

        data_handler.fan_subscribers.append(websocket)

        #Enviamos al cliente el estado actual del ventilador
        await websocket.send_json({"data": data_handler.fan_state})

        try:
            while True:
                data = await websocket.receive_text()
                data = data.replace('"', "")
                mqtt.client.publish("FAN", data)
                print(f"Mensaje recibido: {data}")
        except WebSocketDisconnect:
            data_handler.fan_subscribers.remove(websocket)
            print("WebSocket desconectado")