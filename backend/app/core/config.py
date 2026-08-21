from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str
    app_version: str
    debug: bool

    host: str
    port: int

    database_url: str

    # AI Settings
    ai_provider: str = "gemini"

    gemini_api_key: str = ""
    gemini_model: str = "gemini-3.6-flash"

    jwt_secret_key: str
    jwt_algorithm: str
    access_token_expire_minutes: int

    # -----------------------------
    # Qdrant
    # -----------------------------

    qdrant_host: str = "localhost"
    qdrant_port: int = 6333
    qdrant_collection: str = "company_documents"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()