from ...models import Host


class HostDao:
  def  __init__(self):
     pass

  def getHostById(self,host_id):
    host =  Host.objects.get(id = host_id)
    return host
