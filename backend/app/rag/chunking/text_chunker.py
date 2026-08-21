from typing import List


class TextChunker:

    DEFAULT_CHUNK_SIZE = 800

    DEFAULT_OVERLAP = 150

    @classmethod
    def chunk(
        cls,
        text: str,
        chunk_size: int = DEFAULT_CHUNK_SIZE,
        overlap: int = DEFAULT_OVERLAP,
    ) -> List[str]:

        if not text:
            return []

        text = text.strip()

        chunks = []

        start = 0

        while start < len(text):

            end = start + chunk_size

            chunks.append(
                text[start:end]
            )

            start += chunk_size - overlap

        return chunks