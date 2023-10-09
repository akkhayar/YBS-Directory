from yaml import FullLoader, load as load_yaml
from types import MappingProxyType
from os import getenv as os_getenv
from dotenv import load_dotenv

load_dotenv()


def getenv(key: str) -> str:
    val = os_getenv(key)
    if val is None:
        raise Exception(f"{key} not found in .env file.")
    return val


# all the environment variables needed

DEEPGRAM_API_KEY = getenv("DEEPGRAM_API_KEY")
ELEVENLABS_API_KEY = getenv("ELEVENLABS_API_KEY")
OPENAI_API_KEY = getenv("OPENAI_API_KEY")
JWT_SECRET_KEY = getenv("JWT_SECRET_KEY")
DB_URI = getenv("DB_URI")
IS_PRODUCTION = getenv("ENVIRONMENT") == "production"

with open("config.yml", "r") as file:
    CONFIG = MappingProxyType(load_yaml(file, Loader=FullLoader))

SPEECH_CONFIG = MappingProxyType(CONFIG["speech_to_text"])
DEFAULT_PERSONA = MappingProxyType(CONFIG["default_persona"])