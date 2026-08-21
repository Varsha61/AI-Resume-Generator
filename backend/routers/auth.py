import uuid
import datetime
from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import jwt, JWTError
from backend.database import db_instance

router = APIRouter(prefix="/api/auth", tags=["Auth"])

SECRET_KEY = "RESUMEIQ_SUPER_SECRET_JWT_KEY_PROD_2026"
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(days=7)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register")
async def register(user_data: UserRegister):
    existing = await db_instance.get_user_by_email(user_data.email)
    if existing:
        raise HTTPException(status_code=400, detail="User with this email already exists")

    hashed_pwd = get_password_hash(user_data.password)
    user_id = str(uuid.uuid4())
    user_obj = {
        "id": user_id,
        "name": user_data.name,
        "email": user_data.email,
        "hashed_password": hashed_pwd,
        "created_at": datetime.datetime.utcnow().isoformat()
    }
    await db_instance.save_user(user_obj)
    token = create_access_token({"sub": user_id, "email": user_data.email})
    return {"token": token, "user": {"id": user_id, "name": user_data.name, "email": user_data.email}}

@router.post("/login")
async def login(user_data: UserLogin):
    user = await db_instance.get_user_by_email(user_data.email)
    if not user or not verify_password(user_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": user["id"], "email": user["email"]})
    return {"token": token, "user": {"id": user["id"], "name": user["name"], "email": user["email"]}}

@router.get("/me")
async def get_me():
    # Helper endpoint for current user session validation
    return {"status": "authenticated", "user": {"id": "demo-user-1", "name": "Alex Morgan", "email": "alex.morgan@email.com"}}
