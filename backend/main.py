from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from routes import user_router
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

app.include_router(user_router, prefix='/user', tags=['user'])
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/favicon", include_in_schema=False)
async def favicon():
    return FileResponse("static/favicon.ico")

@app.get("/")
def root():
    return {"message": "FastAPI is running!"}
