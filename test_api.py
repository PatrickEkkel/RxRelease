from backend.rxrelease.rxbackend.core.restapi.REST_states import REST_states
from backend.rxrelease.rxbackend.core.restapi.REST_authentication import REST_authentication



authentication = REST_authentication()

result = authentication.postCredentials('api_user','TESTAPIPASSWORD')
statetypesApi = REST_states(result['token'])
#print(result['token'])
result = statetypesApi.getStateByHostAndStateTypeId(1,1)
print(result)
