from .ForemanApi import *
from ..models import ForemanSettings
class ForemanManager:

 def __init_(self):
  pass

 def createNewVM(self):
  settings = ForemanSettings.objects.first()
  #settings = ForemanSettings()
  api = ForemanApi(settings)
  api.createHost()
