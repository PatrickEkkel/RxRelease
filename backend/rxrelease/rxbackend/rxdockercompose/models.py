from django.db import models
from ..models import Configuration

class DockerComposeConfiguration(models.Model):
 configuration = models.ForeignKey(Configuration,null=True,on_delete=models.PROTECT)
 dockercomposeyaml = models.CharField(max_length=1000,default=0,blank=True)
