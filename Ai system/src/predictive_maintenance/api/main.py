# src/predictive_maintenance/api/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.predictive_maintenance.api.routes import router
from src.predictive_maintenance.utils.config import get_settings

settings = get_settings()


app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
    version=settings.app_version,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
