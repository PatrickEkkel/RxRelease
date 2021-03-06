from django.db import models
from ..models import Host
from ..models import File
from ..models import ComplexState


class SaltMinion(models.Model):
    minion_id = models.CharField(max_length=255)
    host = models.ForeignKey(Host, default=None, on_delete=models.PROTECT)
    accepted = models.BooleanField(default=False)


class SaltFormula(models.Model):
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=255, default=0)
    files = models.ManyToManyField(File, blank=True)


class SaltStateLog(models.Model):
    minion = models.ForeignKey(SaltMinion, default=None, on_delete=models.PROTECT)
    complexState = models.ForeignKey(ComplexState, blank=True, default=None, null=True, on_delete=models.PROTECT)
    saltstate = models.CharField(max_length=255)
    test = models.BooleanField(default=None)
    type = models.CharField(max_length=255, default='')
    duration = models.CharField(max_length=255)
    comment = models.CharField(max_length=255)
    start_date = models.DateField()
    start_time = models.CharField(max_length=255, default=None)
    run_num = models.IntegerField(default=0)
    changes = models.CharField(max_length=4000, default='', blank=True)
    sls = models.CharField(max_length=255)
    result = models.BooleanField()


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
