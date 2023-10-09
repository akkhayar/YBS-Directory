from fastapi import APIRouter, Depends, Request, status

from server.models import (
    UserModel,
    UserFullnameModel,
    ResetPasswordRequestModel,
    PersonaModel,
    EditPersonaRequestModel,
    UpdateEmailRequestModel,
)
from server.auth import authorize_user
from server.database import UsersTable, PersonaTable
from server.ratelimiter import limiter

router = APIRouter(
    prefix="/user",
    tags=["Users"],
    dependencies=[Depends(authorize_user)],
)


@router.get("/", response_model=UserModel)
@limiter.limit("20/minute")
async def get_user(request: Request, user: UserModel = Depends(authorize_user)):
    """
    Get User Metadata.
    """
    return user


@router.post("/", status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit("10 per 15 minutes")
async def update_user(
    request: Request,
    edited_user: UserFullnameModel,
    user: UserModel = Depends(authorize_user),
):
    """
    Update User Metadata.
    """
    await UsersTable.update(user.user_id, edited_user.fullname)


@router.post("/reset-password/", status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit("5 per 15 minutes")
async def reset_user_password(
    request: Request,
    data: ResetPasswordRequestModel,
    user: UserModel = Depends(authorize_user),
):
    """
    Reset the user's password.
    """


@router.post("/update-email/", status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit("5 per 15 minutes")
async def update_user_email(
    request: Request,
    data: UpdateEmailRequestModel,
    user: UserModel = Depends(authorize_user),
):
    """
    Update the user's email.
    """


@router.get("/persona/", response_model=PersonaModel)
@limiter.limit("20/minute")
async def get_user_persona(request: Request, user: UserModel = Depends(authorize_user)):
    """
    Get Persona Metadata.
    """
    return await PersonaTable.get(user.user_id)


@router.post("/persona/", status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit("10 per 15 minutes")
async def update_user_persona(
    request: Request,
    persona: EditPersonaRequestModel,
    user: UserModel = Depends(authorize_user),
):
    """
    Update Persona Metadata.
    """
    return await PersonaTable.update(
        user.persona_id,
        name=persona.name,
        voice_id=persona.voice_id and persona.voice_id.get_id(),
        avatar_url=persona.avatar_url,
    )
