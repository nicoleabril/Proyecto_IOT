from fastapi import FastAPI

from src.routes import router
from src.data_handler import DataHandler
from src.conn import ConnMQTT
from multiprocessing import Manager, Process

# manager = Manager()
# shared_data = manager.dict()

data_handler = DataHandler()

mqtt = ConnMQTT()
mqtt.subscribe('temperature', data_handler.send_temp)

app = FastAPI()

app.title = "Backend_IOT"
app.version = "1.0.0"

# Routes
app.include_router(router)