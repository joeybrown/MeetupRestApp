from django.conf.urls import patterns, url, include

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

                       #SOAP-like URLS (Non-RESTful)
                       url(r'^get_group_info/((?P<group_name>.+)/)?$', 'App.api.views.get_group_info', name='get_group_info'),
                       url(r'^get_group_events/$', 'App.api.views.get_group_events', name='get_group_events'),
                       url(r'^get_user_meetup_id/$', 'App.api.views.get_user_meetup_id', name='get_user_meetup_id'),

                       #RESTful URLs
                       url(r'^rsvps(/(?P<rsvp_id>.+))?$', 'App.api.views.rsvp', name='rsvp'),
                       url(r'^events(/(?P<event_id>.+))?$', 'App.api.views.event', name='event'),
                       )