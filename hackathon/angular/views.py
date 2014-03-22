from django.shortcuts import render

# Create your views here.
def index(request):
	return render(request, 'index.html', {})

def templates(request, templateName):
	template_name = '%s.html' % templateName
	return render(request, template_name, {})