from django.conf import settings
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout

# https://michaelwashburnjr.com/django-user-authentication/
# https://stackoverflow.com/questions/16458166/how-to-disable-djangos-csrf-validation
def logout_user(request):
    logout(request)
    return redirect('/accounts/login')
@csrf_exempt
def login_form(request):
    return render(request, 'accounts/login.html', {})

@csrf_exempt
def login_user(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        # the password verified for the user
        if user.is_active:
            login(request, user)
            #return redirect('/rxbackend/hosts')
            return HttpResponse(status=200)

    return HttpResponse(status=200)
