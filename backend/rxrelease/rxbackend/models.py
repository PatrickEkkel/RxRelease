from django.db import models

class StateType(models.Model):
    name = models.CharField(max_length=255)
    handler = models.CharField(max_length=255,null=True)
    dependentOn = models.ForeignKey('self',null=True,default=None)

    def __str__(self):
        return self.name

class Capability(models.Model):
    name = models.CharField(max_length=255)
    module = models.CharField(max_length=255)
    statetypes = models.ManyToManyField(StateType)

class ProfileType(models.Model):
    name = models.CharField(max_length=255)
    capabilities = models.ManyToManyField(Capability)

class Profile(models.Model):
    name = models.CharField(max_length=200)
    profiletype = models.ForeignKey(ProfileType,null=True)
    def __str__(self):
        return self.name
class SettingsCategory(models.Model):
    name = models.CharField(max_length=255)

class CredentialsSetting(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    category = models.ForeignKey(SettingsCategory)
class KVSetting(models.Model):
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    category = models.ForeignKey(SettingsCategory)

class Host(models.Model):
    hostname =  models.CharField(max_length=255)
    ipaddress =  models.CharField(max_length=15)
    description =  models.CharField(max_length=400)
    status      = models.CharField(max_length=255,default="UNMANAGED")
    connectioncredentials = models.ForeignKey(CredentialsSetting,default=None,null=True)

class State(models.Model):
    name = models.CharField(max_length=255)
    host = models.ForeignKey(Host)
    installed = models.BooleanField()
    statetype = models.ForeignKey(StateType)

class Configuration(models.Model):
    name = models.CharField(max_length=200)
    hosts = models.ManyToManyField(Host)
    profile = models.ForeignKey(Profile)
    def __str__(self):
        return self.name
