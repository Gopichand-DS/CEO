from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.team import (
    TeamCreate,
    TeamUpdate,
    TeamResponse,
)

from app.services.team_service import TeamService


router = APIRouter(
    prefix="/teams",
    tags=["Teams"],
)


@router.post(
    "/",
    response_model=TeamResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_team(
    team: TeamCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return TeamService.create(
        db=db,
        team=team,
        company_id=current_user.company_id,
    )


@router.get(
    "/",
    response_model=List[TeamResponse],
)
def get_teams(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return TeamService.get_all(
        db=db,
        company_id=current_user.company_id,
    )


@router.get(
    "/{team_id}",
    response_model=TeamResponse,
)
def get_team(
    team_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return TeamService.get_by_id(
        db=db,
        team_id=team_id,
        company_id=current_user.company_id,
    )


@router.put(
    "/{team_id}",
    response_model=TeamResponse,
)
def update_team(
    team_id: int,
    team: TeamUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return TeamService.update(
        db=db,
        team_id=team_id,
        team_update=team,
        company_id=current_user.company_id,
    )


@router.delete(
    "/{team_id}",
)
def delete_team(
    team_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return TeamService.delete(
        db=db,
        team_id=team_id,
        company_id=current_user.company_id,
    )