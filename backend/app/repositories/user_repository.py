from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:

    @staticmethod
    def create(db: Session, user: User):
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def get_by_email(db: Session, email: str):
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_user_by_email(db, email):
        return (
            db.query(User)
            .filter(User.email == email)
            .first()
    )

    @staticmethod
    def update_profile(
        db: Session,
        user: User,
        full_name: str,
        designation: str,
    ):
        user.full_name = full_name
        user.designation = designation

        db.commit()
        db.refresh(user)

        return user