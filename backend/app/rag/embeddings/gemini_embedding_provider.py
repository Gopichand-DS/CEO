from google import genai
from google.genai import types

from app.core.config import settings


class GeminiEmbeddingProvider:

    MODEL = "gemini-embedding-2"
    OUTPUT_DIMENSIONALITY = 768

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.gemini_api_key,
        )

    def embed(
        self,
        text: str,
    ) -> list[float]:

        response = self.client.models.embed_content(
            model=self.MODEL,
            contents=text,
            config=types.EmbedContentConfig(
                output_dimensionality=self.OUTPUT_DIMENSIONALITY,
            ),
        )

        return response.embeddings[0].values