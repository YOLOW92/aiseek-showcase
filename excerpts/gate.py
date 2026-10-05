"""Admission to the one-at-a-time computation.

The main server gives up on a call after its own timeout (75 seconds when a fallback stands behind this service, 120 without). A request
that waited longer than that would be computed for nobody, and on two cores that work delays every request behind it: the queue spirals, the
CPU stays full and almost every answer is thrown away. The gate keeps the queue short and the wait bounded and answers "busy" instead, which
the router treats as a server error: it moves to its fallback or the job retries later.
"""

import asyncio
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager


class Busy(Exception):
    """The computation is taken and the queue is full, or the wait ran out."""


class Gate:
    def __init__(self, max_waiting: int, max_wait_seconds: float) -> None:
        self.max_waiting = max_waiting
        self.max_wait_seconds = max_wait_seconds
        self._turn = asyncio.Semaphore(1)
        self._waiting = 0

    @property
    def waiting(self) -> int:
        return self._waiting

    @asynccontextmanager
    async def turn(self) -> AsyncIterator[None]:
        if not self._turn.locked():
            # Free: taken at once, without yielding, so it is never counted as waiting.
            await self._turn.acquire()
        else:
            if self._waiting >= self.max_waiting:
                raise Busy(f"{self._waiting} requests already waiting")
            self._waiting += 1
            try:
                await asyncio.wait_for(self._turn.acquire(), self.max_wait_seconds)
            except TimeoutError:
                raise Busy(f"no turn within {self.max_wait_seconds:g} seconds") from None
            finally:
                self._waiting -= 1
        try:
            yield
        finally:
            self._turn.release()
