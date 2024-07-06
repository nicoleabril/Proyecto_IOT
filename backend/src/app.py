from fastapi import FastAPI
from src.routes import router

app = FastAPI()

app.title = "Backend_IOT"
app.version = "1.0.0"

app.include_router(router)
