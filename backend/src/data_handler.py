from src.singleton import SingletonMeta
from fastapi import WebSocket


class DataHandler(metaclass=SingletonMeta):
    def __init__(self):
        # Cambio: corregido el nombre de la lista de suscriptores de temperatura
        self.temp_subscribers = []
        self.hum_subscribers = []

    def send_temp(self, temp):
        for sub in self.temp_subscribers:
            try:
                sub.send_json(
                    {"data": f"{temp:.2f}"}
                )  # Cambio: enviar el dato de temperatura correctamente formateado
            except Exception as e:
                print(f"Error al enviar datos al WebSocket: {e}")

    def send_hum(self, hum):
        for sub in self.hum_subscribers:
            try:
                sub.send_json({"data": f"{hum:.2f}"})  # Enviar datos de humedad
            except Exception as e:
                print(f"Error al enviar datos al WebSocket: {e}")
