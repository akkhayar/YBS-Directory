from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import PlainTextResponse

from uuid import uuid4
from aiofiles import open as aio_open
from logging import getLogger

from server.log import LOG_FILE

log = getLogger(__name__)

PSWD = str(uuid4().hex)
log.warning(f"Use the following admin password for logs: '{PSWD}'")


def authorize_log_admin(p: str):
    if p != PSWD:
        raise HTTPException(status_code=403, detail="Password incorrect")


router = APIRouter(prefix="/system", tags=["System"])


@router.get("/")
async def get_logs(_=Depends(authorize_log_admin)):
    """
    Retrieve the logs.
    """
    async with aio_open(LOG_FILE, "r") as f:
        content = await f.read()

    return PlainTextResponse(content)


@router.get("/ping/")
async def ping():
    """
    Endpoint to check the status of the server.
    """
    return {"status": "ok"}
