from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^$', 'REST.views.home', name='home'),
                       url(r'^app/', include('App.urls')),
                       url(r'^admin/', include(admin.site.urls)),
                       )
