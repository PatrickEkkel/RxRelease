from django.http import HttpResponse
from rest_framework import generics


def index(request):
    return HttpResponse("Hello, world. Welcome to the foreman plugin of rxrelease")
