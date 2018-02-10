from django.http import HttpResponse
from django.db import models
from ..models import Profile
from ..models import ProfileType
from ..core.filler.baseFiller import BaseFiller

def fill(request):

    baseFiller = BaseFiller()
    baseFiller.createBaseFillForSalt()

    # TODO: hier willen we dus alle code kwijt die de database initialiseert.
    response = "Filler"
    return HttpResponse(response)
