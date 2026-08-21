from pathlib import Path
import shutil

from app.storage import (
    StorageProvider,
)


class LocalStorage(StorageProvider):

    ROOT = Path("uploads")

    def save(
        self,
        file,
        path: str,
    ):

        destination = self.ROOT / path

        destination.parent.mkdir(
            parents=True,
            exist_ok=True,
        )

        with destination.open("wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer,
            )

        return str(destination)

    def delete(
        self,
        path: str,
    ):

        file_path = self.ROOT / path

        if file_path.exists():
            file_path.unlink()