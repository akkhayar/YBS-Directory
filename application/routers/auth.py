from fastapi import APIRouter, HTTPException, Response, Depends, Request, status

from server.ratelimiter import limiter

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/token/", status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit("5/minute, 50/day")
async def login(request: Request, provided_user: UserLoginModel, response: Response):
    """
    Get JWT Token and set it as a cookie.
    """
    user = await UsersTable.verify_by_email(provided_user.email, provided_user.password)
    if user is None:
        raise HTTPException(404, "User does not exist.")
    elif user is False:
        raise HTTPException(401, "Incorrect password.")

    exp, jwt_tk = create_jwt_token({"user_id": user.user_id})
    response.set_cookie(
        "Authorization",
        f"Bearer {jwt_tk}",
        expires=exp,
        httponly=True,
        samesite="none",
        secure=True,
    )
    response.status_code = status.HTTP_204_NO_CONTENT
    return response


@router.post("/request-otp/", status_code=status.HTTP_204_NO_CONTENT)
async def request_otp(data: OtpRequestModel, user: UserModel = Depends(authorize_user)):
    """
    Request a one time password to be sent to the user's email.
    """


@router.post("/register/", status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit("3/hour")
async def register(request: Request, user: UserRegisterModel):
    if await UsersTable.exists_by_email(user.email):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Username already registered")

    await UsersTable.create(user.email, user.fullname, user.password)
