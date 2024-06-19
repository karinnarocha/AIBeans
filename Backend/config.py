import os
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    CORS_RESOURCES = os.getenv('CORS_RESOURCES')
    PORT = int(os.environ.get("PORT", 3000))

    