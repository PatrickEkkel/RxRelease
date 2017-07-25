from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import dockercomposeconfigurationsview

urlpatterns = [
    url(r'^configurations/$', dockercomposeconfigurationsview.CreateView.as_view(), name="create"),
    url(r'^configurations/(?P<pk>[0-9]+)$', dockercomposeconfigurationsview.DetailsView.as_view(), name="details"),
    url(r'^configurations/test$', dockercomposeconfigurationsview.TestSSHLib.as_view(), name="TestSSHLib"),
]
