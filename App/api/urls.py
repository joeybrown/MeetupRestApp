from django.conf.urls import patterns, url, include

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^getgroupinfo/', 'App.api.views.get_group_info', name='get_group_info'),
                       url(r'^getgroupevents/', 'App.api.views.get_group_events', name='get_group_events'),
                       )