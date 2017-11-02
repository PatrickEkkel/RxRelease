
class Utils:
    def __init__(self):
        pass
    @staticmethod
    def escapeJsonFromTransport(json):
        return json.replace(';',',').replace('#',':')
    @staticmethod
    def escapeJsonForTransport(json):
        # because or own system can't deal with  comma's in the payload we need to escape them, therefore we will transform them to ; which is a valid text character in the payload
        return json.replace(',',';').replace(':','#')
