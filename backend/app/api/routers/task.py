from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user

from app.schemas.task import (
    TaskCreate,
    TaskResponse,
    TaskUpdate,
)

from app.services.task_service import TaskService


router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)


@router.post(
    "/",
    response_model=TaskResponse,
)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return TaskService.create_task(
        db=db,
        task=task,
        company_id=current_user.company_id,
        created_by=current_user.id,
    )


@router.get(
    "/",
    response_model=list[TaskResponse],
)
def get_tasks(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return TaskService.get_tasks(
        db=db,
        company_id=current_user.company_id,
    )


@router.get(
    "/{task_id}",
    response_model=TaskResponse,
)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return TaskService.get_task(
        db=db,
        task_id=task_id,
        company_id=current_user.company_id,
    )


@router.put(
    "/{task_id}",
    response_model=TaskResponse,
)
def update_task(
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return TaskService.update_task(
        db=db,
        task_id=task_id,
        task=task,
        updated_by=current_user.id,
        company_id=current_user.company_id,
    )


@router.delete(
    "/{task_id}",
    response_model=TaskResponse,
)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    return TaskService.delete_task(
        db=db,
        task_id=task_id,
        company_id=current_user.company_id,
    )