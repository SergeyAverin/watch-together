from abc import ABC, abstractmethod

from pydantic import BaseModel


class Command(BaseModel):
    name: str

class CommandResponse(BaseModel):
    name: str


class CommandHandlerABC(ABC):
    @abstractmethod
    def handle(self, command: Command):
        pass
