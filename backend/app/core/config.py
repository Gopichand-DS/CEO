from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str
    app_version: str
    debug: bool

    host: str
    port: int

    database_url: str
    frontend_url: str = "http://localhost:5173"
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

    qdrant_url: str = "https://555fa8b0-21eb-436d-ad92-a3af9f79baf7.eu-west-2-0.aws.cloud.qdrant.io"
    qdrant_api_key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwic3ViamVjdCI6ImFwaS1rZXk6Y2U0YjUxMjEtM2YxZC00OTZhLTliNDAtNTY2NmYxYmRjZjlkIn0.q5Ej7yghkF5CbxcvsyVEQQmpCV99hqZHnBV5FmLMT08"
    qdrant_collection: str = "company_documents"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()