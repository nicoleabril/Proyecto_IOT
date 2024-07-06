from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get('/')
def index():
    return JSONResponse({'message':'Bienvenido a la API'})