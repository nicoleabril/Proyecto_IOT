from src.singleton import SingletonMeta
from fastapi.encoders import jsonable_encoder


class DataHandler(metaclass=SingletonMeta):
    def __init__(self):
        # Cambio: corregido el nombre de la lista de suscriptores de temperatura
        self.temp_subscribers = []
        self.hum_subscribers = []
        self.led_subscribers = []
        self.fan_subscribers = []
        self.fan_state = '0'

    async def send_temp(self, temp):
        for sub in self.temp_subscribers:
            try:
                # Cambio: enviar el dato de temperatura correctamente formateado
                await sub.send_json({"data": temp})
            except Exception as e:
                print(f"Error al enviar datos al WebSocket: {e}")

    async def send_hum(self, hum):
        for sub in self.hum_subscribers:
            try:
                await sub.send_json(
                    jsonable_encoder({"data": f"{float(hum):.2f}"})
                )  # Enviar datos de humedad
            except Exception as e:
                print(f"Error al enviar datos al WebSocket: {e}")

    async def send_led(self, led):
        for sub in self.led_subscribers:
            try:
                await sub.send_json(
                    jsonable_encoder({"data": led})
                )  # Enviar datos de humedad
            except Exception as e:
                print(f"Error al enviar datos al WebSocket: {e}")

    async def send_fan(self, fan):
        for sub in self.fan_subscribers:
            try:
                if fan == "1":
                    self.fan_state = '1'
                else:
                    self.fan_state = '0'
                await sub.send_json(
                    jsonable_encoder({"data": fan})
                )  # Enviar datos del ventilador
            except Exception as e:
                print(f"Error al enviar datos al WebSocket: {e}")
