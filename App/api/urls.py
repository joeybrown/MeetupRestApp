from django.conf.urls import patterns, url, include

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^get_group_info/$', 'App.api.views.get_group_info', name='get_group_info'),
                       url(r'^get_group_events/$', 'App.api.views.get_group_events', name='get_group_events'),

                       url(r'^rsvps/(?P<rsvp_id>.+)/$', 'App.api.views.rsvps', name='rsvps_by_id'),
                       url(r'^rsvps/$', 'App.api.views.rsvps', name='rsvps'),

                       url(r'^event/(?P<event_id>.+)/$', 'App.api.views.event', name='event_by_id'),
                       url(r'^event/$', 'App.api.views.event', name='event'),

                       url(r'^profile/(?P<group_id>.+)/(?P<member_id>.+)/$', 'App.api.views.rsvps',
                           name='profile_by_id'),
                       url(r'^profile/$', 'App.api.views.profile', name='profile'),

                       )