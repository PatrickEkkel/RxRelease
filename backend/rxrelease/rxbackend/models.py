from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Module(models.Model):
    name = models.CharField(max_length=255)
    active = models.BooleanField(default=False)
    menuoptionname = models.CharField(max_length=255)
    configurationPanel = models.CharField(max_length=255, default=None)
    statetypePanel = models.CharField(max_length=255, default=None)


class SettingsCategory(models.Model):
    name = models.CharField(max_length=255)
    prefix = models.CharField(max_length=255, default=None, null=True)

    def __str__(self):
        return self.name


class CredentialsSetting(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    category = models.ForeignKey(SettingsCategory, on_delete=models.PROTECT)


# dbStatus verteld ons meer over of de filler al gedraaid is
# Tevens slaan we de huidige versie van de filler ook op in de db, kan
# later handig zijn als we een versie ergens hebben draaien en we moeten upgraden
# naar een nieuwere versie
class SystemConfig(models.Model):
    buildversion = models.CharField(max_length=150)
    dbStatus = models.CharField(max_length=255)


class StateType(models.Model):
    name = models.CharField(max_length=255)
    state_settings = models.ForeignKey(SettingsCategory, default=None, null=True,
                                         on_delete=models.PROTECT)

    connection_credentials = models.ForeignKey(SettingsCategory, default=None, null=True,
                                         on_delete=models.PROTECT,related_name='connection_credentials_category')
    handler = models.CharField(max_length=255, null=True)
    module = models.CharField(max_length=255, null=True, default=None)
    jobtype = models.CharField(max_length=255, null=True, default="SIMPLE_STATE")
    dependentOn = models.ForeignKey('self', null=True, default=None, on_delete=models.PROTECT)
    system = system = models.BooleanField(default=False)


    def __str__(self):
        return self.name


class Capability(models.Model):
    name = models.CharField(max_length=255)
    dependentOn = models.ForeignKey('self', null=True, default=None, on_delete=models.PROTECT)
    statetypes = models.ManyToManyField(StateType)

    def __str__(self):
        return self.name


class File(models.Model):
    filename = models.CharField(max_length=255)
    path = models.CharField(max_length=255)

    def __str__(self):
        return self.path + self.filename


class Profile(models.Model):
    name = models.CharField(max_length=200)
    inherited = models.ForeignKey('self',null=True, default=None, on_delete=models.PROTECT)
    default_configuration = models.ForeignKey('Configuration', related_name='+',null=True,default=None,on_delete=models.PROTECT)
    def __str__(self):
        return self.name

class Host(models.Model):
    hostname = models.CharField(max_length=255)
    ipaddress = models.CharField(max_length=15)
    description = models.CharField(max_length=400)
    status = models.CharField(max_length=255, default="UNMANAGED")
    profile = models.ForeignKey(Profile,on_delete=models.PROTECT)
    connectioncredentials = models. \
        ForeignKey(CredentialsSetting, default=None, null=True, on_delete=models.PROTECT)
    hostSettings = models. \
        ForeignKey(SettingsCategory, default=None, null=True, on_delete=models.PROTECT)


class Configuration(models.Model):
    name = models.CharField(max_length=200)
    hosts = models.ManyToManyField(Host)
    profile = models.ForeignKey(Profile, on_delete=models.PROTECT)
    capability = models.ForeignKey(Capability, on_delete=models.PROTECT, default=None, blank=True, null=True)
    def __str__(self):
        return self.name


class KVSetting(models.Model):
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    category = models.ForeignKey(SettingsCategory, on_delete=models.PROTECT)


class SimpleState(models.Model):
    installed = models.BooleanField(default=False)
    last_successfull_run = models.DateTimeField(auto_now=True)


class ComplexState(models.Model):
    status = models.CharField(max_length=255, default="NOT_APPLIED")
    last_successfull_run = models.DateTimeField(auto_now=True)


class RepeatableState(models.Model):
    last_successfull_run = models.DateTimeField(auto_now=True)


class State(models.Model):
    name = models.CharField(max_length=255)
    host = models.ForeignKey(Host, on_delete=models.PROTECT)
    statetype = models.ForeignKey(StateType, on_delete=models.PROTECT)
    simple_state = models. \
        ForeignKey(SimpleState, default=None, null=True, on_delete=models.PROTECT)
    complex_state = models.ForeignKey(ComplexState, default=None, null=True,
                                      on_delete=models.PROTECT)
    repeatable_state = models.ForeignKey(RepeatableState, default=None, null=True,
                                         on_delete=models.PROTECT)

    def __str__(self):
        return self.name



class WizardStatus(models.Model):
    wizard_id = models.CharField(max_length=200)
    wizard_status = models.CharField(max_length=200, default=None)

    def __str__(self):
        return self.wizard_id


class ConfigurationTab(models.Model):
    tabname = models.CharField(max_length=25)
    component_tag = models.CharField(max_length=255)
    module = models.ForeignKey(Module, default=None, null=True, on_delete=models.PROTECT)
