from django.conf.urls import patterns, url

from views import index, templates

urlpatterns = patterns('', 
	url(r'^$', index),
	url(r'^template/(?P<templateName>[\w-]+)/$', templates)
)