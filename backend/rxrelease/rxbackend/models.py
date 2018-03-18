from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


# dbStatus verteld ons meer over of de filler al gedraaid is
# Tevens slaan we de huidige versie van de filler ook op in de db, kan later handig zijn als we een versie ergens hebben draaien en we moeten upgraden naar een nieuwere versie
class SystemConfig(models.Model):
    buildversion = models.CharField(max_length=150)
    dbStatus = models.CharField(max_length=255)

class SettingsCategory(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class StateType(models.Model):
    name = models.CharField(max_length=255)
    SettingsCategory = models.ForeignKey(SettingsCategory,default=None,null=True)
    handler = models.CharField(max_length=255,null=True)
    module = models.CharField(max_length=255,null=True,default=None)
    dependentOn = models.ForeignKey('self',null=True,default=None)

    def __str__(self):
        return self.name

class Capability(models.Model):
    name = models.CharField(max_length=255)
    dependentOn = models.ForeignKey('self',null=True,default=None)
    #module = models.CharField(max_length=255)
    statetypes = models.ManyToManyField(StateType)
    def __str__(self):
        return self.name

class ProfileType(models.Model):
    name = models.CharField(max_length=255)
    capabilities = models.ManyToManyField(Capability)
    system = models.BooleanField(default=True)

class Profile(models.Model):
    name = models.CharField(max_length=200)
    profiletype = models.ForeignKey(ProfileType,null=True)
    def __str__(self):
        return self.name
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
    hostSettings = models.ForeignKey(SettingsCategory,default=None,null=True)
    profileType = models.ForeignKey(ProfileType,default=None,null=True)

class State(models.Model):
    name = models.CharField(max_length=255)
    host = models.ForeignKey(Host)
    installed = models.BooleanField()
    statetype = models.ForeignKey(StateType)
    def __str__(self):
        return self.name

class Configuration(models.Model):
    name = models.CharField(max_length=200)
    hosts = models.ManyToManyField(Host)
    profile = models.ForeignKey(Profile)
    def __str__(self):
        return self.name
