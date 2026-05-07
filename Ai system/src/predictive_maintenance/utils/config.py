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
            "https://mainten-x.vercel.app",
        ]
    )


def _parse_cors_origins(raw_value: str | None) -> list[str]:
    if not raw_value:
        return []

    return [origin.strip().rstrip("/") for origin in raw_value.split(",") if origin.strip()]


def get_settings() -> AppSettings:
    configured_origins = _parse_cors_origins(os.getenv("CORS_ORIGINS"))
    frontend_origin = os.getenv("FRONTEND_ORIGIN")
    settings = AppSettings()
    origins = [origin.rstrip("/") for origin in settings.cors_origins]

    if frontend_origin:
        configured_origins.append(frontend_origin.rstrip("/"))

    deduped_origins = list(dict.fromkeys([*origins, *configured_origins]))

    return AppSettings(cors_origins=deduped_origins)
