from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from jose import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "your_jwt_secret_here"

class LoginInput(BaseModel):
    username: str
    password: str

# Simulação: substitua por DB real
fake_user = {
    "username": "admin",
    "hashed_password": pwd_context.hash("admin123")
}

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict):
    to_encode = data.copy()
    to_encode.update({"exp": datetime.utcnow() + timedelta(hours=1)})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")

@router.post("/login")
def login(input: LoginInput):
    if input.username != fake_user["username"] or not verify_password(input.password, fake_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    token = create_access_token({"sub": input.username})
    return {"access_token": token, "token_type": "bearer"}
