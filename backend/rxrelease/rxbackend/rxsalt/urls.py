from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from .views import saltsettingsview
from .views import saltstatelogviews
from .views import saltformulasview
from .views import saltminionsview
from .views import saltactionviews


urlpatterns = [
    url(r'^logs/$', saltstatelogviews.CreateView.as_view(), name="create"),
    url(r'^logs/(?P<pk>[0-9]+)/$', saltstatelogviews.DetailsView.as_view(), name="details"),

    url(r'^settings/$', saltsettingsview.CreateView.as_view(), name="create"),
    url(r'^settings/(?P<pk>[0-9]+)/$', saltsettingsview.DetailsView.as_view(), name="details"),
    url(r'^formulas/$', saltformulasview.CreateView.as_view(), name="create"),
    url(r'^formulas/(?P<pk>[0-9]+)/$', saltformulasview.DetailsView.as_view(), name="details"),
    url(r'^minions/$', saltminionsview.CreateView.as_view(), name="create"),
    url(r'^minions/(?P<pk>[0-9]+)/$', saltminionsview.DetailsView.as_view(), name="details"),
    url(r'^actions/run/$', saltactionviews.CreateView.as_view(), name="create"),


]
