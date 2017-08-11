from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from .views import profileviews
from .views import profiletypeviews
from .views import hostviews
from .views import capabilityviews
from .views import statesviews
from .views import configurationviews
from .views import testview


urlpatterns = [
    url(r'^$', testview.index, name='index'),
    url(r'^(?P<profile_id>[0-9]+)/test/$', testview.test, name='results'),
    url(r'^profiles/$', profileviews.CreateView.as_view(), name="create"),
    url(r'^profiles/(?P<pk>[0-9]+)/$', profileviews.DetailsView.as_view(), name="details"),

    url(r'^(?P<configuration_id>[0-9]+)/test/$', testview.test, name='results'),
    url(r'^configurations/$', configurationviews.CreateView.as_view(), name="create"),
    url(r'^configurations/(?P<pk>[0-9]+)/$', configurationviews.DetailsView.as_view(), name="details"),
    url(r'^configurations/profile/(?P<profile_id>.+)/$', configurationviews.ProfileView.as_view(), name="details"),

    url(r'^hosts/$', hostviews.CreateView.as_view(), name="create"),
    url(r'^hosts/(?P<pk>[0-9]+)/$', hostviews.DetailsView.as_view(), name="details"),

    url(r'^capabilities/$', capabilityviews.CreateView.as_view(), name="create"),
    url(r'^capabilities/(?P<pk>[0-9]+)/$', capabilityviews.DetailsView.as_view(), name="details"),

    url(r'^states/$', statesviews.CreateView.as_view(), name="create"),
    url(r'^states/(?P<pk>[0-9]+)/$', statesviews.DetailsView.as_view(), name="details"),

    url(r'^profiletypes/$', profiletypeviews.CreateView.as_view(), name="create"),
    url(r'^profiletypes/(?P<pk>[0-9]+)/$', profiletypeviews.DetailsView.as_view(), name="details"),

]
