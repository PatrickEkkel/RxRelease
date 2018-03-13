from django.http import HttpResponse
from django.db import models
from ..models import Profile
from ..models import ProfileType
from ..core.filler.baseFiller import BaseFiller
from ..core.filler.userFiller import UserFiller

def fill(request):
    userFiller = UserFiller()
    baseFiller = BaseFiller()

    userFiller.fillStandardUserSet()
    baseFiller.createBaseFillForSalt()

    # TODO: hier willen we dus alle code kwijt die de database initialiseert.
    response = "Filler"
    return HttpResponse(response)
