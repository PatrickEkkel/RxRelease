from django.db import models
from ..models import Host


class SaltMinion(models.Model):
    minion_id = models.CharField(max_length=255)
    host = models.ForeignKey(Host, default=None, on_delete=models.PROTECT)
    accepted = models.BooleanField(default=False)


class SaltFormulas(models.Model):
    name = models.CharField(max_length=255)
    file = models.CharField(max_length=8000)
    status = models.CharField(max_length=255,default=0)


class SaltSettings(models.Model):
    username = models.CharField(max_length=255)
    saltmaster = models.CharField(max_length=255, default=0)

    def save(self, *args, **kwargs):
        self.__class__.objects.exclude(id=self.id).delete()
        super(SaltSettings, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        try:
            return cls.objects.get()
        except cls.DoesNotExist:
            return cls()

    def __str__(self):
        return self.name
