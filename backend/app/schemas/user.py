from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from ..models.user import UserRole


class UserBase(BaseModel):
    email: str = Field(..., description="User email address")
    username: str = Field(..., min_length=3, max_length=50, description="Username")


class UserCreate(UserBase):
    password: str = Field(..., min_length=6, description="User password")


class UserUpdate(BaseModel):
    email: Optional[str] = Field(None, description="User email address")
    username: Optional[str] = Field(None, min_length=3, max_length=50, description="Username")
    password: Optional[str] = Field(None, min_length=6, description="User password")


class UserInDB(UserBase):
    id: int = Field(..., description="User ID")
    role: UserRole = Field(..., description="User role")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: Optional[datetime] = Field(None, description="Last update timestamp")

    class Config:
        orm_mode = True


class User(UserInDB):
    pass


class UserLogin(BaseModel):
    email: str = Field(..., description="User email address")
    password: str = Field(..., description="User password")


class Token(BaseModel):
    access_token: str = Field(..., description="JWT access token")
    token_type: str = Field(..., description="Token type")


class TokenData(BaseModel):
    email: Optional[str] = Field(None, description="User email from token")