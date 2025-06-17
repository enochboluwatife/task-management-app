from decouple import config
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Database
    database_url: str = config("DATABASE_URL", default="sqlite:///./task_management.db")
    
    # JWT
    secret_key: str = config("SECRET_KEY", default="your-secret-key-here-change-in-production")
    algorithm: str = config("ALGORITHM", default="HS256")
    access_token_expire_minutes: int = config("ACCESS_TOKEN_EXPIRE_MINUTES", default=30, cast=int)
    
    # CORS
    allowed_origins: List[str] = config("ALLOWED_ORIGINS", default="http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001").split(",")
    
    # Environment
    environment: str = config("ENVIRONMENT", default="development")

settings = Settings() 