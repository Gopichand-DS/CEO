from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.auth.hash import hash_password, verify_password
from app.auth.jwt_handler import create_access_token

from app.models.user import User

from app.repositories.auth_repository import AuthRepository

from app.schemas.auth import (
    RegisterRequest,
    RegisterResponse,
    LoginRequest,
    Token,
)


class AuthService:

    @staticmethod
    def register(
        db: Session,
        request: RegisterRequest,
    ) -> RegisterResponse:

        # Check email
        if AuthRepository.email_exists(
            db,
            request.email,
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

        # Create company
        company = AuthRepository.create_company(
            db=db,
            company_name=request.company_name,
        )
        AuthRepository.create_missing_default_departments(
            db=db,
            company_id=company.id,
        )

        # Create user
        user = User(
            full_name=request.full_name,
            email=request.email,
            password=hash_password(request.password),

            # Keep role separate for authorization.
            role="CEO",

            # User-provided professional designation.
            designation=request.designation,

            company_id=company.id,
            is_active=True,
        )

        AuthRepository.create_user(
            db=db,
            user=user,
        )

        db.commit()

        db.refresh(company)
        db.refresh(user)

        return RegisterResponse(
            message="Registration successful",
            company_id=company.id,
            user_id=user.id,
        )

    @staticmethod
    def login(
        db: Session,
        request: LoginRequest,
    ) -> Token:

        user = AuthRepository.get_user_by_email(
            db,
            request.email,
        )

        if (
            user is None
            or not verify_password(
                request.password,
                user.password,
            )
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        access_token = create_access_token(
            {
                "sub": str(user.id),
                "company_id": user.company_id,
                "role": user.role,
            }
        )

        return Token(
            access_token=access_token,
            token_type="bearer",
            user=user,
        )