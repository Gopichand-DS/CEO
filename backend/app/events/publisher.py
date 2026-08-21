from app.events.event import Event
from app.events.event_bus import EventBus


class EventPublisher:

    @staticmethod
    def publish(event: Event):
        """
        Central publishing point.

        Today:
            -> Internal EventBus

        Future:
            -> RabbitMQ
            -> Kafka
            -> Redis Streams
            -> AWS SQS
        """
        EventBus.publish(event)