from pydantic import BaseModel, EmailStr, Field
from app.schemas.user import UserResponse

class RegisterRequest(BaseModel):
    full_name: str = Field(min_length=3)
    company_name: str = Field(min_length=2)
    email: EmailStr
    phone: str

    designation: str = Field(
        min_length=2,
        max_length=100,
    )

    password: str = Field(min_length=8)
    confirm_password: str


class RegisterResponse(BaseModel):
    message: str
    company_id: int
    user_id: int

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse