from contextlib import asynccontextmanager
from logging import getLogger
from server.log import setup
from fastapi import FastAPI, APIRouter
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler

setup()

from routers import v1_routers
from server.env import IS_PRODUCTION

log = getLogger(__name__)


@asynccontextmanager
async def lifespan(_: FastAPI):
    log.info(f"Environment is production: {IS_PRODUCTION}")
    yield
    log.info(f"Lifecycle ended.")


app = FastAPI(
    title="YBS Directory",
    docs_url=None,
    redoc_url="/docs",
    description="A REST API for YBS Directory.",
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

origins = [
    "https://ybs.pyaesonemyo.dev",
]
if not IS_PRODUCTION:
    origins.append("http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Content-Type", "Cookie"],
)

hosts = ["ybs-api.pyaesonemyo.dev"]

if not IS_PRODUCTION:
    hosts.append("localhost")

app.add_middleware(TrustedHostMiddleware, allowed_hosts=hosts)

v1_router = APIRouter(prefix="/v1")

for router in v1_routers:
    v1_router.include_router(router)

app.include_router(v1_router)
