from typing import Literal

from src.core.command_system.command import CommandHandlerABC, Command, CommandResponse
from src.core.command_system.dispatcher import CommandDispatcher


class TestCommand(Command):
    name: Literal['test_command'] = 'test_command'
    a: int
    b: int


class TestCommandResponse(CommandResponse):
    name: Literal['test_command'] = 'test_command'
    res: int

class TestCommandHandler(CommandHandlerABC):
    def handle(self, command: TestCommand) -> TestCommandResponse:
        result = TestCommandResponse(
            name=command.name,
            res=command.a + command.b
        )
        return result

class TestClassCommandSystem:
    def test_register(self):
        dispatcher = CommandDispatcher()
        command = TestCommand(
                a=1,
                b=2
        )
        dispatcher.register(
            command,
            TestCommandHandler()
        )
        assert command.name in dispatcher._handlers

    def test_dispatch(self):
        dispatcher = CommandDispatcher()
        command = TestCommand(
                a=1,
                b=2
        )
        dispatcher.register(
            command,
            TestCommandHandler()
        )
        res = dispatcher.dispatch(command)
        assert res.res == 3
        assert isinstance(res, CommandResponse)