from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=50)
    def __str__(self):
        return self.name

class Host(models.Model):
    hostname =  models.CharField(max_length=255)
    ipaddress =  models.CharField(max_length=15)
    description =  models.CharField(max_length=400)
    status      = models.CharField(max_length=255,default="UNMANAGED")

class Capability(models.Model):
    name = models.CharField(max_length=255)
    module = models.CharField(max_length=255)

class State(models.Model):
    name = models.CharField(max_length=255)
    host = models.ForeignKey(Host)
    installed = models.BooleanField()
    capability = models.ForeignKey(Capability)

class Configuration(models.Model):
    name = models.CharField(max_length=200)
    hosts = models.ManyToManyField(Host)
    profile = models.ForeignKey(Profile)
    def __str__(self):
        return self.name
