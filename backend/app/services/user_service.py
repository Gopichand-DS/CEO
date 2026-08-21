from sqlalchemy.orm import Session
from app.auth.hash import verify_password
from app.auth.jwt_handler import create_access_token
from app.auth.hash import hash_password
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate


class UserService:

    @staticmethod
    def register(db: Session, user: UserCreate):

        existing = UserRepository.get_by_email(db, user.email)

        if existing:
            raise ValueError("Email already registered")

        db_user = User(
            full_name=user.full_name,
            email=user.email,
            password=hash_password(user.password),
            role=user.role,
            company_id=user.company_id,
        )

        return UserRepository.create(db, db_user)

    @staticmethod
    def login(db, login_data):

        user = UserRepository.get_user_by_email(
             db,
             login_data.email,
        )

        if not user:
            raise ValueError("Invalid Email")

        if not verify_password(
            login_data.password,
            user.password,
       ):
            raise ValueError("Invalid Password")

        token = create_access_token(
            {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role,
            "company_id": user.company_id,
           }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": user,
       }

    @staticmethod
    def update_profile(
        db: Session,
        user: User,
        full_name: str,
        designation: str,
    ):
        return UserRepository.update_profile(
            db=db,
            user=user,
            full_name=full_name,
            designation=designation,
        )

    @staticmethod
    def change_password(
        db: Session,
        user: User,
        current_password: str,
        new_password: str,
        confirm_password: str,
    ):
        if not verify_password(
            current_password,
            user.password,
        ):
            raise ValueError(
                "Current password is incorrect"
            )

        if new_password != confirm_password:
            raise ValueError(
                "New passwords do not match"
            )

        if len(new_password) < 8:
            raise ValueError(
                "New password must contain at least 8 characters"
            )

        user.password = hash_password(new_password)

        db.commit()
        db.refresh(user)

        return {
            "message": "Password changed successfully"
        }