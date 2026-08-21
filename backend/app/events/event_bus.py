from collections.abc import Callable

from app.events.event import Event


class EventBus:

    _subscribers: dict[
        str,
        list[Callable[[Event], None]],
    ] = {}

    @classmethod
    def subscribe(
        cls,
        event_type: str,
        handler: Callable[[Event], None],
    ):
        cls._subscribers.setdefault(
            event_type,
            [],
        ).append(handler)

    @classmethod
    def publish(
        cls,
        event: Event,
    ):
        handlers = cls._subscribers.get(
            event.event_type,
            [],
        )

        for handler in handlers:
            handler(event)