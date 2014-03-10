from utils import execute_meetup_api_action, get_meetup_session_from_request, get_meetup_params, get_rsvp_uri
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json


def get_group_info(request, group_name):
    meetup_api_uri = '2/groups'
    data = {'group_urlname': group_name or 'memphis-technology-user-groups'}
    meetup_session = get_meetup_session_from_request(request)
    return execute_meetup_api_action(meetup_api_uri, 'GET', data, meetup_session)


def get_user_meetup_id(request):
    meetup_session = get_meetup_session_from_request(request)
    user = execute_meetup_api_action('2/member/self', 'GET', {}, meetup_session, False)
    return HttpResponse(json.dumps(user.get('id')), content_type='application/json')


def get_group_events(request):
    def get_group_events_data(q):
        d = {'page': 20, 'fields': 'self'}
        d.update(q)
        return d
    meetup_api_uri = '2/events'
    data = get_group_events_data(request.GET)
    meetup_session = get_meetup_session_from_request(request)
    return execute_meetup_api_action(meetup_api_uri, 'GET', data, meetup_session)


@csrf_exempt
def rsvp(request, rsvp_id=None, event_id=None):
    def get_event_id(_rsvp_id, _meetup_session):
        # meetup doesn't support PUT or Delete, so we must improvise and use POST with event_id
        rsvp_info = execute_meetup_api_action('/2/rsvp/{0}'.format(_rsvp_id), 'GET', {}, _meetup_session, False)
        event_info = rsvp_info.get('event')
        return event_info.get('id')

    def get_method(_method):
        # meetup doesn't support PUT or Delete, so we must improvise
        if is_special_request(_method):
            return 'POST'
        return _method

    def is_special_request(_method):
        return _method == 'PUT' or _method == 'DELETE'

    method = get_method(request.method)
    meetup_session = get_meetup_session_from_request(request)
    meetup_api_uri = get_rsvp_uri(rsvp_id, method)
    data = {}
    if is_special_request(request.method):
        event_id = get_event_id(rsvp_id, meetup_session)
        if request.method == 'DELETE':
            data = get_meetup_params(request, {'rsvp_id': rsvp_id, 'event_id': event_id, 'rsvp': 'no'})
    if data is not None:
        data = get_meetup_params(request, {'rsvp_id': rsvp_id, 'event_id': event_id})
    return execute_meetup_api_action(meetup_api_uri, method, data, meetup_session)

@csrf_exempt
def event(request, event_id=None):
    meetup_api_uri = '2/event' if event_id is None else '2/event/{0}'.format(event_id)
    method = request.method
    data = get_meetup_params(request, {'event_id': event_id})
    meetup_session = get_meetup_session_from_request(request)
    return execute_meetup_api_action(meetup_api_uri, method, data, meetup_session)
