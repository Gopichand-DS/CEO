from app.rag.vector.vector_repository import (
    VectorRepository,
)


class VectorService:

    @staticmethod
    def initialize():

        VectorRepository.initialize()