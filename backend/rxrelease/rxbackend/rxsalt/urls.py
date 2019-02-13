from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from .views import saltsettingsview
from .views import saltformulasview
from .views import saltminionsview


urlpatterns = [
    #    url(r'^/$', testview.index, name="create"),
    url(r'^settings/$', saltsettingsview.CreateView.as_view(), name="create"),
    url(r'^settings/(?P<pk>[0-9]+)/$', saltsettingsview.DetailsView.as_view(), name="details"),
    url(r'^formulas/$', saltformulasview.CreateView.as_view(), name="create"),
    url(r'^formulas/(?P<pk>[0-9]+)/$', saltformulasview.DetailsView.as_view(), name="details"),
    url(r'^minions/$', saltminionsview.CreateView.as_view(), name="create"),
    url(r'^minions/(?P<pk>[0-9]+)/$', saltminionsview.DetailsView.as_view(), name="details"),

]
