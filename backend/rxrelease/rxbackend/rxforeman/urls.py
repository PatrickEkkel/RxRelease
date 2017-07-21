from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from .views import testview
from .views import foremansettingsview


urlpatterns = [
#    url(r'^/$', testview.index, name="create"),
    url(r'^settings/$', foremansettingsview.CreateView.as_view(), name="create"),
    url(r'^settings/(?P<pk>[0-9]+)/$', foremansettingsview.DetailsView.as_view(), name="details"),

]
