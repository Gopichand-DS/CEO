from dataclasses import dataclass
from datetime import datetime
from typing import Any


@dataclass
class Event:
    event_type: str
    payload: dict[str, Any]
    occurred_at: datetime