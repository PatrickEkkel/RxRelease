from django.db import models
from ..models import Host


class DemoOnDemandVM(models.Model):
 host = models.ForeignKey(Host,null=True)
 status = models.CharField(max_length=50)
 url = models.CharField(max_length=255)


class DemoOnDemandUser(models.Model):
 username = models.CharField(max_length=255)
 email = models.CharField(max_length=255)
 dodenv = models.ForeignKey(DemoOnDemandVM,null=True)
