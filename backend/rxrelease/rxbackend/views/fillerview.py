from django.http import HttpResponse
from django.db import models
from ..models import Profile
from ..models import ProfileType
# TODO: this is a violation of the one way principle, consider removing this dependency
from rxbackend.rxsalt.filler.saltFiller import SaltFiller
from ..core.filler.baseFiller import BaseFiller
from ..core.filler.userFiller import UserFiller
from ..core.filler.testFiller import TestFiller


def testFill(request):
    userFiller = UserFiller()
    testFiller = TestFiller()
    #baseFiller = BaseFiller()

    userFiller.fillStandardUserSet()
    testFiller.createFillerForTest()
    #3baseFiller.createBaseFillForSalt()

    # TODO: hier willen we dus alle code kwijt die de database initialiseert.
    response = "TestFiller"
    return HttpResponse(response)

def saltFill(request):
    response = 'Saltfiller'
    saltFiller = SaltFiller()
    saltFiller.createFillerForTest()
    return HttpResponse(response)

def fill(request):
    userFiller = UserFiller()
    baseFiller = BaseFiller()

    userFiller.fillStandardUserSet()
    baseFiller.createBaseFillForSalt()

    # TODO: hier willen we dus alle code kwijt die de database initialiseert.
    response = "Filler"
    return HttpResponse(response)
