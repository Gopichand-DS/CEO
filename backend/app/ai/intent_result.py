from dataclasses import dataclass

from app.ai.intent import AIIntent
from app.ai.sub_intent import AISubIntent


@dataclass(frozen=True)
class IntentResult:
    intent: AIIntent
    sub_intent: AISubIntent