class ResponseFormatter:

    @staticmethod
    def executive_response(

        summary,

        findings,

        recommendations,

    ):

        return {

            "summary": summary,

            "findings": findings,

            "recommendations": recommendations,

        }