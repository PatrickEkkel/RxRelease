from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from .views import profileviews
from .views import testview


urlpatterns = [
    url(r'^$', testview.index, name='index'),
    url(r'^(?P<profile_id>[0-9]+)/test/$', testview.test, name='results'),
    url(r'^profiles/$', profileviews.CreateView.as_view(), name="create"),
    url(r'^profiles/(?P<pk>[0-9]+)/$', profileviews.DetailsView.as_view(), name="details"),
]
