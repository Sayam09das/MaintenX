import os
from dataclasses import dataclass, field


@dataclass(frozen=True)
class AppSettings:
    app_name: str = "MaintenX AI"
    app_description: str = "Predictive Maintenance + AI Assistant API"
    app_version: str = "1.0.0"
    cors_origins: list[str] = field(
        default_factory=lambda: [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ]
    )


def get_settings() -> AppSettings:
    extra_origin = os.getenv("FRONTEND_ORIGIN")
    settings = AppSettings()

    if not extra_origin:
        return settings

    return AppSettings(cors_origins=[*settings.cors_origins, extra_origin])
