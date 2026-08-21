from app.events.event_bus import EventBus
from app.events.event_types import EventType

from app.events.handlers.workflow_event_handler import (
    WorkflowEventHandler,
)


def register_event_handlers():

    EventBus.subscribe(
        EventType.WORKFLOW_STARTED,
        WorkflowEventHandler.handle_workflow_started,
    )

    EventBus.subscribe(
        EventType.WORKFLOW_ADVANCED,
        WorkflowEventHandler.handle_workflow_advanced,
    )

    EventBus.subscribe(
        EventType.WORKFLOW_PAUSED,
        WorkflowEventHandler.handle_workflow_paused,
    )

    EventBus.subscribe(
        EventType.WORKFLOW_RESUMED,
        WorkflowEventHandler.handle_workflow_resumed,
    )

    EventBus.subscribe(
        EventType.WORKFLOW_CANCELLED,
        WorkflowEventHandler.handle_workflow_cancelled,
    )

    EventBus.subscribe(
        EventType.WORKFLOW_COMPLETED,
        WorkflowEventHandler.handle_workflow_completed,
    )