from django.conf.urls import patterns, url, include

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^$', 'App.views.home', name='home'),
                       url(r'^api/', include('App.api.urls')),
                       url(r'^logout/', 'App.views.log_out', name='log_out'),
                       url(r'^login/', 'App.views.log_in', name='log_in'),
                       url(r'^test/', 'App.views.test', name='test'),
                       )