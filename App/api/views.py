from utils import execute_meetup_api_action, get_meetup_session_from_request, get_meetup_params, get_rsvp_uri
from django.views.decorators.csrf import csrf_exempt
from django.http import QueryDict
import json


def get_group_info(request, group_name):
    meetup_api_uri = '2/groups'
    data = {'group_urlname': group_name or 'memphis-technology-user-groups'}
    meetup_session = get_meetup_session_from_request(request)
    return execute_meetup_api_action(meetup_api_uri, 'GET', data, meetup_session)


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
    """
    /rsvps/events/{event_id} - GET, POST the RSVPs for event
    http://www.meetup.com/meetup_api/docs/2/rsvps
    http://www.meetup.com/meetup_api/docs/2/rsvp/#create

    /rsvps/{event_id} - GET the detail of a particular RSVP
    http://www.meetup.com/meetup_api/docs/2/rsvp/#get
    """
    method = request.method
    meetup_api_uri = get_rsvp_uri(rsvp_id, method)
    data = get_meetup_params(request, {'rsvp_id': rsvp_id, 'event_id': event_id})
    meetup_session = get_meetup_session_from_request(request)
    return execute_meetup_api_action(meetup_api_uri, method, data, meetup_session)

@csrf_exempt
def event(request, event_id=None):
    """
    get all events as well to compare uri structure
    http://www.meetup.com/meetup_api/docs/2/event/#create
    http://www.meetup.com/meetup_api/docs/2/event/#edit
    http://www.meetup.com/meetup_api/docs/2/event/#get
    http://www.meetup.com/meetup_api/docs/2/event/#delete
    """
    #def get_patch_params(_meetup_session, _meetup_api_uri, request_body, _event_id):
    #    request_body_dict = QueryDict(request_body)
    #
    #    response = execute_meetup_api_action(_meetup_api_uri, 'GET', {'event_id': _event_id}, _meetup_session)
    #    response_data = json.loads(response.DATA)
    #
    #    response_data.update(request_body_dict)  # merge the two dicts
    #    return response_data

    meetup_api_uri = '2/event' if event_id is None else '2/event/{0}'.format(event_id)
    method = request.method
    data = get_meetup_params(request, {'event_id': event_id})

    #if request.method == 'PATCH':
    #    data = get_patch_params(QueryDict(request.body), event_id)

    meetup_session = get_meetup_session_from_request(request)
    return execute_meetup_api_action(meetup_api_uri, method, data, meetup_session)


def profile(request, group_id=None, member_id=None):
    """
    http://www.meetup.com/meetup_api/docs/2/profiles/
    http://www.meetup.com/meetup_api/docs/2/profile#create
    http://www.meetup.com/meetup_api/docs/2/profile/#edit
    http://www.meetup.com/meetup_api/docs/2/profile/#get
    http://www.meetup.com/meetup_api/docs/2/profile/#delete
    """
    meetup_api_uri = '2/profile' if (member_id is None and group_id is None) else\
        '2/profile/{0}/{1}'.format(group_id, member_id)
    method = request.method
    data = request.REQUEST
    meetup_session = get_meetup_session_from_request(request)
    return execute_meetup_api_action(meetup_api_uri, method, data, meetup_session)
