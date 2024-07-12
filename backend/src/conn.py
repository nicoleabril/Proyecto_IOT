import paho.mqtt.client as mqtt
import asyncio

from src.singleton import SingletonMeta
from src.data_handler import DataHandler


class ConnMQTT():
    def __init__(self):
        # self.shared_data = shared_data
        
        self.client = mqtt.Client()
        self.client.on_message = self.on_message
        self.client.reconnect_delay_set(min_delay=1,max_delay=120)
        
        self.client.connect('192.168.1.2',1883,60)
        
        self.topics = {}
        
        self.client.loop_start()
    
    def on_message(self,client,userdata,message: mqtt.MQTTMessage):
        if self.topics.get(message.topic) is None:
            return 
    
        data = message.payload.decode('utf-8')
        print(data)
        self.topics[message.topic](data)
    
    def subscribe(self, topic: str, callable):
        if topic not in self.topics:
            self.topics[topic] = callable
        
        self.client.subscribe(topic, 0)
    
    # def create_async_on_message(self, client, userdata, message):
    #     loop = asyncio.get_running_loop()
    #     def on_message(client, userdata, message):
    #         asyncio.run_coroutine_threadsafe(self.async_on_message(client, userdata, message), loop)
    #     return on_message

