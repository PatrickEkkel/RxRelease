from django.db import models


class SaltAction(models.Model):
    managed = False
    action = models.CharField(max_length=255)
    minion = models.CharField(max_length=255)
    formula = models.CharField(max_length=255)
    test = models.BooleanField()
