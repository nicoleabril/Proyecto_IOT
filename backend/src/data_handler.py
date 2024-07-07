from backend.src.singleton import SingletonMeta
from fastapi import WebSocket


class DataHandler(metaclass=SingletonMeta):
    def __init__(self):
        self.temp_subscribes = []
        self.hum_subscribers = []
    
    def send_temp(self,temp):
        for sub in self.temp_subscribes:
            sub:WebSocket
            sub.send_json({'data':f'{float(temp)}.2f'}) #Truncado a dos decimales
        