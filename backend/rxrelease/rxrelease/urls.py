from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^accounts/', include('accounts.urls',namespace="accounts")),
    url(r'^rxbackend/', include('rxbackend.urls')),
    url(r'^rxbackend/rxdockercompose/', include('rxbackend.rxdockercompose.urls')),
    url(r'^rxbackend/rxforeman/', include('rxbackend.rxforeman.urls')),
    url(r'^rxbackend/rxdod/', include('rxbackend.rxdod.urls')),
    url(r'^rxbackend/rxsalt/', include('rxbackend.rxsalt.urls')),
    url(r'^admin/', admin.site.urls),
]
