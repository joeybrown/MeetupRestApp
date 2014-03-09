from django.conf.urls import patterns, url, include

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^get_group_info/((?P<group_name>.+)/)?$', 'App.api.views.get_group_info', name='get_group_info'),
                       url(r'^get_group_events/$', 'App.api.views.get_group_events', name='get_group_events'),

                       url(r'^rsvps/events/(?P<event_id>.+)/$', 'App.api.views.rsvp', name='rsvps_by_event_id'),#POST
                       url(r'^rsvps/(?P<rsvp_id>.+)/$', 'App.api.views.rsvp', name='rsvp_by_rsvp_id'),#GET, POST

                       url(r'^events/$', 'App.api.views.event', name='event'),#POST
                       url(r'^events/(?P<event_id>.+)/$', 'App.api.views.event', name='event_by_id'),#GET, POST, DELETE, PUT, DELETE


                       url(r'^groups/(?P<group_id>.+)/events$', 'App.api.views.event', name='event_by_group_id'),
                       url(r'^events(/(?P<event_id>.+))?$', 'App.api.views.event', name='event_by_event_id'),

                       url(r'^profiles/(?P<group_id>.+)/(?P<member_id>.+)/$', 'App.api.views.profile',
                           name='profile_by_id'),
                       url(r'^profiles/$', 'App.api.views.profile', name='profile'),

                       )