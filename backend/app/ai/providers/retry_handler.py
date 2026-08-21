import time


class RetryHandler:

    @staticmethod
    def execute(
        func,
        retries: int = 3,
    ):

        last_error = None

        for _ in range(retries):

            try:
                return func()

            except Exception as ex:

                last_error = ex

                time.sleep(1)

        raise last_error

        return RetryHandler.execute(
            lambda: self.provider.generate(request)
        )