class DocumentNotFound(Exception):
    ''' Исключение вызываемое если объект не найден. '''

    def __str__(self):
        return "Document is not found."


class AuthError(Exception):
    def __init__(self, message="Ошибка авторизации", details=None):
        self.message = message
        self.details = details or {}
        super().__init__(self.message)

    def __str__(self):
        return f"{self.message}. Детали: {self.details}"


class NotPermission(Exception):
    def __init__(self, message="Ошибка прав", details=None):
        self.message = message
        self.details = details or {}
        super().__init__(self.message)

    def __str__(self):
        return f"{self.message}. Детали: {self.details}"
