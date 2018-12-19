from django.db import models
from ..rxforeman.models import ForemanHost


class DemoOnDemandVM(models.Model):
 host = models.ForeignKey(ForemanHost,null=True,on_delete=models.PROTECT)
 url = models.CharField(max_length=255)

class DemoOnDemandUser(models.Model):
 username = models.CharField(max_length=255)
 email = models.CharField(max_length=255)
 dodenv = models.ForeignKey(DemoOnDemandVM,null=True,on_delete=models.PROTECT)
