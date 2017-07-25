from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from .views import demonondemanduserviews

urlpatterns = [
    url(r'^users/$', demonondemanduserviews.CreateView.as_view(), name="create"),
    url(r'^users/(?P<pk>[0-9]+)/$', demonondemanduserviews.DetailsView.as_view(), name="details"),
    url(r'^users/vminfo/(?P<pk>[0-9]+)/$', demonondemanduserviews.DemoUserEnvironmentView.as_view(), name="vminfo"),
    url(r'^users/vmstatus/(?P<pk>[0-9]+)/$', demonondemanduserviews.DemoUserEnvironmentView.as_view(), name="vmstatus"),
    url(r'^users/vmreset/(?P<pk>[0-9]+)/$', demonondemanduserviews.PowerCycleVM.as_view(), name="vmreset"),
    url(r'^users/createdemovm/(?P<pk>[0-9]+)/$', demonondemanduserviews.CreateHost.as_view(), name="createdemovm"),

]
