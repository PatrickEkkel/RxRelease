from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from .views import testview


urlpatterns = [
    url(r'^/$', testview.index, name="create"),
]
