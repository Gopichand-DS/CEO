from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.company import Company
from app.models.department import Department

from app.repositories.team_repository import TeamRepository

from app.schemas.team import (
    TeamCreate,
    TeamUpdate,
)


class TeamService:

    @staticmethod
    def create(
        db: Session,
        team: TeamCreate,
        company_id: int,
    ):

        # --------------------------------
        # Verify authenticated company
        # --------------------------------
        company = (
            db.query(Company)
            .filter(
                Company.id == company_id
            )
            .first()
        )

        if not company:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Company not found",
            )

        # --------------------------------
        # Verify department
        # --------------------------------
        department = (
            db.query(Department)
            .filter(
                Department.id == team.department_id,
                Department.company_id == company_id,
            )
            .first()
        )

        if not department:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Department not found",
            )

        # --------------------------------
        # Duplicate team check
        # --------------------------------
        existing_team = (
            TeamRepository.get_by_name_and_department(
                db=db,
                company_id=company_id,
                name=team.name,
                department_id=team.department_id,
            )
        )

        if existing_team:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    "A team with this name already exists "
                    "in the department"
                ),
            )

        # --------------------------------
        # Create
        # --------------------------------
        return TeamRepository.create(
            db=db,
            team=team,
            company_id=company_id,
        )

    @staticmethod
    def get_all(
        db: Session,
        company_id: int,
    ):

        return TeamRepository.get_all(
            db=db,
            company_id=company_id,
        )

    @staticmethod
    def get_by_id(
        db: Session,
        team_id: int,
        company_id: int,
    ):

        team = TeamRepository.get_by_id(
            db=db,
            team_id=team_id,
            company_id=company_id,
        )

        if not team:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Team not found",
            )

        return team

    @staticmethod
    def update(
        db: Session,
        team_id: int,
        team_update: TeamUpdate,
        company_id: int,
    ):

        db_team = TeamRepository.get_by_id(
            db=db,
            team_id=team_id,
            company_id=company_id,
        )

        if not db_team:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Team not found",
            )

        # --------------------------------
        # Validate department if changed
        # --------------------------------
        if team_update.department_id is not None:

            department = (
                db.query(Department)
                .filter(
                    Department.id == team_update.department_id,
                    Department.company_id == company_id,
                )
                .first()
            )

            if not department:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Department not found",
                )

        # --------------------------------
        # Duplicate name check
        # --------------------------------
        new_name = (
            team_update.name
            if team_update.name is not None
            else db_team.name
        )

        new_department_id = (
            team_update.department_id
            if team_update.department_id is not None
            else db_team.department_id
        )

        existing_team = (
            TeamRepository.get_by_name_and_department(
                db=db,
                company_id=company_id,
                name=new_name,
                department_id=new_department_id,
            )
        )

        if (
            existing_team
            and existing_team.id != db_team.id
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    "A team with this name already exists "
                    "in the department"
                ),
            )

        return TeamRepository.update(
            db=db,
            db_team=db_team,
            team=team_update,
        )

    @staticmethod
    def delete(
        db: Session,
        team_id: int,
        company_id: int,
    ):

        db_team = TeamRepository.get_by_id(
            db=db,
            team_id=team_id,
            company_id=company_id,
        )

        if not db_team:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Team not found",
            )

        TeamRepository.delete(
            db=db,
            db_team=db_team,
        )

        return {
            "message": "Team deleted successfully"
        }