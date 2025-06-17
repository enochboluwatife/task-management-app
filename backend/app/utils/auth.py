from datetime import datetime, timedelta
from typing import Optional
import jwt
import hashlib
import os
from fastapi import HTTPException, status
from ..config import settings

# Simple password hashing using SHA256 + salt (no external dependencies)
def get_password_hash(password: str) -> str:
    """Hash a password using SHA256 + salt"""
    salt = os.urandom(32).hex()
    hash_obj = hashlib.sha256((password + salt).encode())
    return f"{salt}${hash_obj.hexdigest()}"


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    try:
        salt, hash_value = hashed_password.split('$')
        hash_obj = hashlib.sha256((plain_password + salt).encode())
        return hash_obj.hexdigest() == hash_value
    except Exception as e:
        print(f"Password verification error: {e}")
        return False


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt


def verify_token(token: str, credentials_exception):
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        return email
    except jwt.PyJWTError:
        raise credentials_exception


def get_token_from_header(authorization: str) -> str:
    """Extract token from Authorization header"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header"
        )
    return authorization.split(" ")[1]