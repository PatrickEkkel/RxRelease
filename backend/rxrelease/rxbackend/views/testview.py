from django.http import HttpResponse
from ..models import Profile

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
def test(request,profile_id):
    p =  Profile.objects.get(id=profile_id)
    response = "The profile you selected was %s."
    return HttpResponse(response % p.name)
