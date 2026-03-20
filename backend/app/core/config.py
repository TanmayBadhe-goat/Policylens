import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "PolicyLens"
    API_V1_STR: str = "/api"
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "sk-placeholder")
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    PORT: int = int(os.getenv("PORT", 8000))

settings = Settings()
