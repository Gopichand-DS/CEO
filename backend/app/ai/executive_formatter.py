class ExecutiveFormatter:

    @staticmethod
    def format(response):

        return {
            "status": "SUCCESS",
            "executive_summary": response["summary"],
            "priority": response["priority"],
            "confidence": response["confidence"],
            "findings": response["findings"],
            "recommendations": response["recommendations"],
        }