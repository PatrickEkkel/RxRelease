from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=50)
    def __str__(self):
        return self.name

class Configuration(models.Model):
    name = models.CharField(max_length=200)
    profile = models.ForeignKey(Profile)
    def __str__(self):
        return self.name
