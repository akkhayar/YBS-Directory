from fastapi import APIRouter, Request, status

from server.ratelimiter import limiter

router = APIRouter(
    prefix="/bus",
    tags=["Bus"],
)

