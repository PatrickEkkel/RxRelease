
class SaltCommandMapper:
    def __init__(self):
        pass

    @classmethod
    def create_from_dict(self, dict):
        result = SaltCommand()
        if 'salt-command' in dict:
            result.command = dict['salt-command']
        if 'api-mode' in dict:
            result.api_mode = dict['api-mode']
        if 'salt-minion-id' in dict:
            result.salt_minion_id = dict['salt-minion-id']
        if 'salt-function' in dict:
            result.salt_function = dict['salt-function']
        if 'salt-formula' in dict:
            result.formula = dict['salt-formula']

        return result


class SaltDataChild:
    def __init__(self, _data):
        self._data = _data['data']

    def get_minions_pre(self):
        return self.get_return()['minions_pre']

    def get_success(self):
        return self._data['success']
    def get_return(self):
        return self._data['return']


class SaltDataRoot:
    def __init__(self, _data):
        self._root = _data['return']
        self._children = []
        for child in self._root:
            self._children.append(SaltDataChild(child))

    def get_data(self, index):
        return self._children[index]


class SaltCommand:
    def __init__(self):
        self.command = ''
        self.api_mode = ''
