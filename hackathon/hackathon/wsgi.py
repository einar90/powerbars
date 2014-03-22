"""
WSGI config for hackathon project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/howto/deployment/wsgi/
"""

# Setup for future calls from urllib2
from urllib2 import build_opener, install_opener, HTTPBasicAuthHandler, HTTPPasswordMgrWithDefaultRealm

url = 'https://api.demosteinkjer.no'
username = '0a88d7571c964d879e4d36609c3f08a4'
password = '95ff08db29b04b0598e192fc9d22bb00'

passwordManager = HTTPPasswordMgrWithDefaultRealm()
passwordManager.add_password(None, url, username, password)
authHandler = HTTPBasicAuthHandler(passwordManager)
opener = build_opener(authHandler)
install_opener(opener)

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hackathon.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
