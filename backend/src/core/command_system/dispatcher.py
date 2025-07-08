from logging import getLogger
from abc import ABC, abstractmethod

from core.command_system.command import Command, CommandHandlerABC, CommandResponse



class DispatcherABC(ABC):
    def __init__(self):
        self._handlers: dict[str. CommandHandlerABC] = {}

    @abstractmethod
    def register(self, command_type: Command, handler: CommandHandlerABC):
        pass

    @abstractmethod
    def dispatch(self, command: Command) -> CommandResponse:
        pass


class Dispatcher(DispatcherABC):
    def register(self, command_type: Command, handler: CommandHandlerABC):
        logger = getLogger(self.logger_name)
        logger.info('register: %s -> %s',
                    command_type.name, handler)
        self._handlers[command_type.name] = handler

    def dispatch(self, command: Command) -> CommandResponse:
        logger = getLogger(self.logger_name)
        logger.info('dispatch %s:  %s',
                    command.name, command)
        if command.name not in self._handlers:
            raise ValueError(
                f"No handler registered for command type {command.name}")

        handler = self._handlers[command.name]
        return handler.handle(command)


class CommandDispatcher(Dispatcher):
    logger_name = 'commands_logger'
