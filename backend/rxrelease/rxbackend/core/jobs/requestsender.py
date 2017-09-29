import requests


class RequestSender:

    def __init__(self):
     pass
    def sendRequest(self,request):
     serverAddress= 'http://localhost:8000/rxbackend/statetypes/handlehoststate'


     print(str(request))
     headers = {'content-type': 'application/json'}
     response =  requests.post(serverAddress,data=str(request),headers=headers)
     print(response.status_code, response.reason)
