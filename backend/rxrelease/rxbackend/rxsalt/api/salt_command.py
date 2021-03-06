


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
            # salt-minion-id is a field that supports variables
            result.salt_minion_id = dict['salt-minion-id']
        if 'salt-function' in dict:
            result.salt_function = dict['salt-function']
        if 'salt-formula' in dict:
            result.formula = dict['salt-formula']

        return result


class SaltMinionChild:
    def __init__(self, _data):
        self._data = _data
        self._children = []
        for key in self._data.keys():
            self._children.append(SaltStateChild(self._data[key]))

    def get_states_size(self):
        return len(self._children)

    def get_states(self, index):
        return self._children[index]


class SaltStateChild:

    def __init__(self, _data):
        self._data = _data

    def get_comment(self):
        return self._data['comment']

    def get_duration(self):
        return self._data['duration']

    def get_start_time(self):
        return self._data['start_time']

    def get_sls(self):
        return self._data['__sls__']

    def get_name(self):
        return self._data['name']

    def get_run_num(self):
        return self._data['__run_num__']

    def get_changes(self):
        return self._data['changes']

    def get_result(self):
        if self._data['result'] is not None:
            return self._data['result']
        else:
            return True


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
            if 'data' in child:
                self._children.append(SaltDataChild(child))
            else:
                for minion in child.keys():
                    self._children.append(SaltMinionChild(child[minion]))

    def get_data(self, index):
        return self._children[index]

    def get_size(self):
        return len(self._children)


class SaltCommand:
    def __init__(self):
        self.command = ''
        self.api_mode = ''
        self.salt_minion_id = None
