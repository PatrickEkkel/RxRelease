class Environment:

    def __init__(self, variables_dict, host, statetype, module):
        self.settings_dict = variables_dict
        self.host = host
        self.statetype = statetype
        self.module = module

    def append_to_dict(self, key, value):
        self.settings_dict[key] = value
