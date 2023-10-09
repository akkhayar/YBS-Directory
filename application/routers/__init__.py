from auth import router as auth_router
from system import router as system_router
from user import router as user_router

v1_routers = (
    auth_router,
    system_router,
    user_router,
)
