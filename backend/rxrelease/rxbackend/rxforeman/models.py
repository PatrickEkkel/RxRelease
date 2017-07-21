from django.db import models


class ForemanSettings(models.Model):
 username = models.CharField(max_length=255)
 password = models.CharField(max_length=255)
 foremanUrl = models.CharField(max_length=255)
 name = models.CharField(max_length=255)
 hostgroup_id = models.CharField(max_length=5)

 def save(self, *args, **kwargs):
  self.__class__.objects.exclude(id=self.id).delete()
  super(ForemanSettings, self).save(*args, **kwargs)

 @classmethod
 def load(cls):
  try:
   return cls.objects.get()
  except cls.DoesNotExist:
   return cls()
 def __str__(self):
  return self.name
