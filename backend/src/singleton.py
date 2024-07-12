import threading
from multiprocessing import Manager, freeze_support

class SingletonMeta(type):
    _instances = None
    _lock = threading.Lock()

    def _init_(cls, name, bases, dct):
        super().__init__(name, bases, dct)
        if SingletonMeta._instances is None:
            SingletonMeta._instances = Manager().dict()

    def _call_(cls, *args, **kwargs):
        with cls._lock:
            if cls.__name__ not in cls._instances:
                instance = super().__call__(*args, **kwargs)
                SingletonMeta._instances[cls.__name__] = instance
        return SingletonMeta._instances[cls.__name__]