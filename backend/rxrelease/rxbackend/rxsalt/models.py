from django.db import models

class SaltSettings(models.Model):
 username = models.CharField(max_length=255)
 saltmaster = models.CharField(max_length=255,default=0)

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
