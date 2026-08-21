from app.events.event import Event


class WorkflowEventHandler:

    @staticmethod
    def handle_workflow_started(event: Event):
        print(
            f"[EVENT] Workflow Started -> {event.payload}"
        )

    @staticmethod
    def handle_workflow_advanced(event: Event):
        print(
            f"[EVENT] Workflow Advanced -> {event.payload}"
        )

    @staticmethod
    def handle_workflow_paused(event: Event):
        print(
            f"[EVENT] Workflow Paused -> {event.payload}"
        )

    @staticmethod
    def handle_workflow_resumed(event: Event):
        print(
            f"[EVENT] Workflow Resumed -> {event.payload}"
        )

    @staticmethod
    def handle_workflow_cancelled(event: Event):
        print(
            f"[EVENT] Workflow Cancelled -> {event.payload}"
        )

    @staticmethod
    def handle_workflow_completed(event: Event):
        print(
            f"[EVENT] Workflow Completed -> {event.payload}"
        )