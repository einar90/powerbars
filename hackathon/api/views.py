from BeautifulSoup import BeautifulSoup
import json
from urllib import urlencode
from urllib2 import Request, urlopen, HTTPError

from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

def home(request, start=0, stop=None, step=10):
	if not stop: 
		stop = int(start) + int(step)

	url = 'https://api.demosteinkjer.no/?startIndex=%s&stopIndex=%s' % (int(start), int(stop))
	req = Request(url)
	
	dictionary = {'meters': []}

	try:
		response = urlopen(req)
		soup = BeautifulSoup(response.read())
		anchors = soup.findAll('a')

		for link in anchors:
			if link.has_key('rel'):
				if link['rel'] == 'self':
					mrid = link.find(text=True)
					meter = {'mRID': mrid, 'url': reverse('api.views.meter', args=(mrid, )) }
					dictionary['meters'].append( meter ) 
				elif link['rel'] == 'next':
					#new_step = int(step)
					#new_start = int(stop) + 1
					#new_stop = int(stop) + new_step

					dictionary['next'] = reverse('api.views.home', args=(int(stop) + 1, int(stop) + int(step), int(step)))
				elif link['rel'] == 'prev':
					dictionary['prev'] = reverse('api.views.home', args=(int(start) - int(step), int(start) - 1, int(step))) #link['href'] #reverse( 'api.views.home', args=( start=int(stop) + 1, step=int(step) ) )

	except HTTPError, e:
		context['errors'] = str(e)

	return HttpResponse(json.dumps(dictionary), content_type='application/json')

def meter(request, mrid, seriesType='ActivePlus', start='2014-01-01', stop='2014-03-01', interval='Week'):
	url = 'https://api.demosteinkjer.no/meters/%s' % mrid
	values = {'seriesType': seriesType, 'dateFrom': start, 'dateTo': stop, 'intervalType': interval}
	data = urlencode(values)
	req = Request(url, data)

	dictionary = {'meter': mrid}
	context = {}

	try:
		response = urlopen(req)
		soup = BeautifulSoup(response.read())
		context['soup'] = soup
		anchors = soup.findAll('a')

		context['soup'] = anchors

		for link in anchors:
			if link.has_key('rel'):
				if link['rel'] == 'up':
					dictionary['up'] = reverse('api.views.meter', args=(mrid, ))
			else:
				dictionary['download'] = link['href']

	except HTTPError, e:
		context['errors'] = str(e)

	#return render(request, 'meter.html', context)
	return HttpResponse(json.dumps(dictionary, indent=4), content_type='application/json')

def practical(request, mrid, year=2014, month=None):
	if not month:
		start = '%s-01-01' % year
		stop = '%s-12-31' % year
		interval = 'Month'
	else:
		start = '%s-%s-01' % (year, month)
		stop = '%s-%s-31' % (year, month)
		interval = 'Week'
	
	return meter(request, mrid, 'ActivePlus', start, stop, interval)

def download(request, id):
	url = 'https://api.demosteinkjer.no/downloads/%s' % id
	headers = {'Accept': 'application/json'}
	req = Request(url, headers=headers)

	dictionary = {}

	try:
		response = urlopen(req)
		return HttpResponse(response.read(), content_type='application/json')

	except HTTPError, e:
		context['errors'] = str(e)

	return render(request, 'meter.html', context)