from django.db import models

class StateTypeHandler(models.Model):
    managed = False
    host_id = models.IntegerField()
    statetype_id = models.IntegerField()
    keyvalList = models.CharField(max_length=4000)
    handlerType = models.CharField(max_length=255)
    handlerCommand = models.CharField(max_length=255)

class InstallHost(models.Model):
    managed = False
    host_id = models.IntegerField(null=True,default=None)
