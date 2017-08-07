from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from .views import saltsettingsview


urlpatterns = [
#    url(r'^/$', testview.index, name="create"),
    url(r'^settings/$', saltsettingsview.CreateView.as_view(), name="create"),
    url(r'^settings/(?P<pk>[0-9]+)/$', saltsettingsview.DetailsView.as_view(), name="details"),

]
