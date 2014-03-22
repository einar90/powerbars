from django.conf.urls import patterns, url

from views import home, meter

urlpatterns = patterns('',
	url(r'^$', 																home),
	url(r'^start/(?P<start>\d+)/step/(?P<step>\d+)/$', 						home),
	url(r'^start/(?P<start>\d+)/$', 										home),
	url(r'^step/(?P<step>\d+)/$', 											home),
	url(r'^start/(?P<start>\d+)/stop/(?P<stop>\d+)/step/(?P<step>\d+)/$', 	home),
	url(r'^meter/(?P<mrid>\w+)/$', 											meter),
	url(r'^meter/(?P<mrid>\w+)/type/(?P<seriesType>[\w-]+)/start/(?P<start>[\w-]+)/stop/(?P<stop>[\w-]+)/interval/(?P<interval>[\w-]+)/$', meter),
)