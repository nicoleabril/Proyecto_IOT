import uvicorn
from src.app import app
from multiprocessing import freeze_support

if __name__ == "__main__":
    freeze_support()
    uvicorn.run('main:app',host='0.0.0.0',port=8000,reload=True)