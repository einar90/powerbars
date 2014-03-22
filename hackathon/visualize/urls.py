from django.conf.urls import patterns, url

from views import view

urlpatterns = patterns('',
	url(r'^$', view),
)