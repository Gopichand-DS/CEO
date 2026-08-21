from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def root():
    return {
        "message": "Executive Intelligence Platform API is running successfully!"
    }


@router.get("/health")
def health():
    return {
        "status": "healthy",
        "version": "1.0.0"
    }