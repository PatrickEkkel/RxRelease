
class ApiUserSettings:
     username = "api_user"
     password = "TESTAPIPASSWORD"
class LocalSettings:
    localuser = "patrick"
    localconfig = '/home/' + localuser + '/.rxrelease'
    localcache = localconfig + '/.cache'

class RemoteSettings:
    remoteuser = "rxrelease"
class NetworkSettings:
    protocol = "http"
    servername = "localhost"
    port = "8000"
