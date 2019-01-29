from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken import views
from .views import profileviews
from .views import profiletypeviews
from .views import hostviews
from .views import capabilityviews
from .views import wizardviews
from .views import statesviews
from .views import simplestatesviews
from .views import repeatablestatesviews
from .views import configurationviews
from .views import statetypeviews
from .views import userviews
from .views import settingscategoryview
from .views import kvsettingsview
from .views import credentialssettingsview
from .views import moduleviews
from .views import testview
from .views import fillerview
from .views import configurationtabview

urlpatterns = [

    url(r'^api-token-auth/', views.obtain_auth_token),
    url(r'^$', testview.index, name='index'),
    url(r'^(?P<profile_id>[0-9]+)/test/$', testview.test, name='results'),
    url(r'^profiles/$', profileviews.CreateView.as_view(), name="create"),
    url(r'^filler/$',fillerview.fill, name="filler"),
    url(r'^testfiller/$',fillerview.testFill, name="filler"),
    url(r'^profiles/(?P<pk>[0-9]+)/$', profileviews.DetailsView.as_view(), name="details"),

    url(r'^(?P<configuration_id>[0-9]+)/test/$', testview.test, name='results'),
    url(r'^configurations/$', configurationviews.CreateView.as_view(), name="create"),
    url(r'^configurations/(?P<pk>[0-9]+)/$', configurationviews.DetailsView.as_view(), name="details"),
    url(r'^configurations/profile/(?P<profile_id>.+)/$', configurationviews.ProfileView.as_view(), name="byprofile"),

    url(r'^hosts/$', hostviews.CreateView.as_view(), name="create"),
    url(r'^hosts/(?P<pk>[0-9]+)/$', hostviews.DetailsView.as_view(), name="details"),
    url(r'^hosts/search/byprofiletype/$', hostviews.SearchByProfiletypeView.as_view(), name="search by profiletype"),
    url(r'^hosts/search/byhostname/$', hostviews.SearchByHostnameView.as_view(), name="search by hostname"),

    url(r'^modules/$', moduleviews.CreateView.as_view(), name="create"),
    url(r'^modules/(?P<pk>[0-9]+)/$', moduleviews.DetailsView.as_view(), name="details"),
    url(r'^modules/search/$', moduleviews.ModuleSearchView.as_view(), name="bymodulename"),

    url(r'^modules/configurationtabs/$', configurationtabview.CreateView.as_view(), name="create"),
    url(r'^modules/configurationtabs/(?P<pk>[0-9]+)/$', configurationtabview.DetailsView.as_view(), name="details"),

    url(r'^wizardstatus/$', wizardviews.CreateView.as_view(), name="create"),
    url(r'^wizardstatus/search/$', wizardviews.SearchView.as_view(), name="search"),
    url(r'^wizardstatus/(?P<pk>[0-9]+)/$', wizardviews.DetailsView.as_view(), name="details"),

    url(r'^capabilities/$', capabilityviews.CreateView.as_view(), name="create"),
    url(r'^capabilities/(?P<pk>[0-9]+)/$', capabilityviews.DetailsView.as_view(), name="details"),

    url(r'^simplestates/$',simplestatesviews.CreateView.as_view(),name="details"),
    url(r'^simplestates/(?P<pk>[0-9]+)/$', simplestatesviews.DetailsView.as_view(), name="details"),

    url(r'^repeatablestates/$',repeatablestatesviews.CreateView.as_view(),name="details"),
    url(r'^repeatablestates/(?P<pk>[0-9]+)/$', repeatablestatesviews.DetailsView.as_view(), name="details"),


    url(r'^states/$', statesviews.CreateView.as_view(), name="create"),
    url(r'^states/(?P<pk>[0-9]+)/$', statesviews.DetailsView.as_view(), name="details"),
    url(r'^states/host/install/(?P<pk>[0-9]+)/$', statesviews.InstallHostView.as_view(), name="byhost"),
    url(r'^states/search/$', statesviews.HostView.as_view(), name="byhost"),

    url(r'^users/$',userviews.CreateUserView.as_view(),name="create"),
    url(r'^users/(?P<pk>[0-9]+)/$', userviews.DetailsView.as_view(), name="details"),
    url(r'^profiletypes/$', profiletypeviews.CreateView.as_view(), name="create"),
    url(r'^profiletypes/(?P<pk>[0-9]+)/$', profiletypeviews.DetailsView.as_view(), name="details"),

    url(r'^settings/kvsettings$', kvsettingsview.CreateView.as_view(), name="create"),
    url(r'^settings/kvsettings/(?P<pk>[0-9]+)/$', kvsettingsview.DetailsView.as_view(), name="details"),
    url(r'^settings/search/$', kvsettingsview.SearchView.as_view(), name="byhost"),

    url(r'^settings/credentials$', credentialssettingsview.CreateView.as_view(), name="create"),
    url(r'^settings/credentials/(?P<pk>[0-9]+)/$', credentialssettingsview.DetailsView.as_view(), name="details"),
    url(r'^settings/credentials/search/$', credentialssettingsview.SearchView.as_view(), name="bycategory_id"),


    url(r'^settingscategory/$', settingscategoryview.CreateView.as_view(), name="create"),
    url(r'^settingscategory/(?P<pk>[0-9]+)/$', settingscategoryview.DetailsView.as_view(), name="details"),
    url(r'^settingscategory/search/$', settingscategoryview.SearchView.as_view(), name="byhost"),


    url(r'^statetypes/$', statetypeviews.CreateView.as_view(), name="create"),
    url(r'^statetypes/(?P<pk>[0-9]+)/$', statetypeviews.DetailsView.as_view(), name="details"),
    url(r'^statetypes/handlehoststate$', statetypeviews.HandleHostState.as_view(), name="create"),
    url(r'^statetypes/search/byname/$', statetypeviews.SearchbyNameView.as_view(), name="search by name"),

]
