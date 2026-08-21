from pydantic import BaseModel, ConfigDict, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str
    designation: str
    company_id: int

class UserUpdate(BaseModel):
    full_name: str
    designation: str

    
class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    designation: str
    company_id: int
    is_active: bool

    model_config = ConfigDict(
        from_attributes=True,
    )


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class PasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str