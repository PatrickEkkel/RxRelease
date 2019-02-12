
class SaltCommandMapper:
    def __init__(self):
        pass

    def create_from_dict(self, dict):
        result = SaltCommand()
        if 'salt-command' in dict:
            result.command = dict['salt-command']
        if 'api-mode' in dict:
            result.api_mode = dict['api-mode']

        return result


class SaltCommand:
    def __init__(self):
        self.command = ''
        self.api_mode = ''
