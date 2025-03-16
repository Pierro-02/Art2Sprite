from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from art2sprite.routes import user_routes
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

app.mount("/static", StaticFiles(directory="art2sprite/static"), name="static")

app.include_router(user_routes.router)


fake_users_db = []

# Pydantic model for user input
class UserCreate(BaseModel):
    username: str
    email: str
    password: str  # In real-world apps, store hashed passwords, not plain text!

class UserResponse(BaseModel):
    id: int
    username: str
    email: str


@app.post("/register", response_model=UserResponse)
def register_user(user: UserCreate):
    # Check if email already exists
    if any(u["email"] == user.email for u in fake_users_db):
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create user (Generate ID)
    user_id = len(fake_users_db) + 1
    new_user = {"id": user_id, "username": user.username, "email": user.email}

    # Store in fake database
    fake_users_db.append(new_user)

    return new_user

@app.get("/favicon", include_in_schema=False)
async def favicon():
    return FileResponse("art2sprite/static/favicon.ico")

@app.get("/")
def root():
    return {"message": "FastAPI is running!"}
