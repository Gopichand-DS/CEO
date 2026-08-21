from sqlalchemy.orm import Session

from app.models.team import Team
from app.schemas.team import TeamCreate, TeamUpdate


class TeamRepository:

    @staticmethod
    def create(
        db: Session,
        team: TeamCreate,
        company_id: int,
    ):
        db_team = Team(
            name=team.name,
            description=team.description,
            company_id=company_id,
            department_id=team.department_id,
        )

        db.add(db_team)
        db.commit()
        db.refresh(db_team)

        return db_team

    @staticmethod
    def get_all(
        db: Session,
        company_id: int,
    ):
        return (
            db.query(Team)
            .filter(
                Team.company_id == company_id
            )
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        team_id: int,
        company_id: int,
    ):
        return (
            db.query(Team)
            .filter(
                Team.id == team_id,
                Team.company_id == company_id,
            )
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        db_team: Team,
        team: TeamUpdate,
    ):
        update_data = team.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_team, key, value)

        db.commit()
        db.refresh(db_team)

        return db_team

    @staticmethod
    def delete(
        db: Session,
        db_team: Team,
    ):
        db.delete(db_team)
        db.commit()

        return True

    @staticmethod
    def get_by_name_and_department(
        db: Session,
        company_id: int,
        name: str,
        department_id: int,
    ):
        return (
            db.query(Team)
            .filter(
                Team.company_id == company_id,
                Team.name == name,
                Team.department_id == department_id,
            )
            .first()
        )