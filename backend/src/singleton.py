import threading
from multiprocessing import Manager, freeze_support

class SingletonMeta(type):
    _instances = None
    _lock = threading.Lock()

    def _init_(cls, name, bases, dct):
        super()._init_(name, bases, dct)
        if SingletonMeta._instances is None:
            SingletonMeta._instances = Manager().dict()

    def _call_(cls, *args, **kwargs):
        with cls._lock:
            if cls._name_ not in cls._instances:
                instance = super()._call_(*args, **kwargs)
                SingletonMeta.instances[cls.name_] = instance
        return SingletonMeta.instances[cls.name_]