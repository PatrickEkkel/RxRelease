from abc import abstractmethod
from rxbackend.core.restapi.REST_hosts import REST_hosts

class ValueHandler:

    def __init__(self, key, auth_token, mapping):
        self.key = key
        self.auth_token = auth_token
        self.mapping = mapping

    @abstractmethod
    def process(self):
        pass


class IdToHostnameHandler(ValueHandler):

    def __init__(self, key, auth_token, mapping):
        super(IdToHostnameHandler, self).__init__(key, auth_token, mapping)

    def process(self):
        hosts_api = REST_hosts(self.auth_token)
        return hosts_api.get_host_by_id(self.mapping.host_id)['hostname']


class ValueResolver:
    def __init__(self, auth_token, mapping):
        self.resolvers = []
        self.mapping = mapping
        self.add_value_handler(IdToHostnameHandler('{CCHOSTNAME}', auth_token, mapping))

    def add_value_handler(self, handler):
        self.resolvers.append(handler)

    def resolve_value(self, value):
        for resolver in self.resolvers:
            if resolver.key == value:
                return resolver.process()
        return value
