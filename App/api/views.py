from utils import execute_meetup_api_action, get_meetup_session_from_request


def get_data_from_request(method, get_dict, post_dict):
    return get_dict if method == 'GET' else post_dict


def get_group_info(request):
    meetup_api_uri = '2/groups'
    data = {'group_urlname': 'memphis-technology-user-groups'}
    meetup_session = get_meetup_session_from_request(request)
    return execute_meetup_api_action(meetup_api_uri, 'GET', data, meetup_session, 0)


def get_group_events(request):
    meetup_api_uri = '2/events'
    data = {'group_urlname': 'memphis-technology-user-groups',
            'page': 20}
    meetup_session = get_meetup_session_from_request(request)
    return execute_meetup_api_action(meetup_api_uri, 'GET', data, meetup_session)


def rsvps(request, rsvp_id=None):
    """
    http://www.meetup.com/meetup_api/docs/2/rsvps
    http://www.meetup.com/meetup_api/docs/2/rsvp/#create
    http://www.meetup.com/meetup_api/docs/2/rsvp/#get
    """
    meetup_api_uri = '2/rsvps' if rsvp_id is None else '2/rsvps/{0}'.format(rsvp_id)
    method = request.method
    data = dict(request.GET.iteritems()) if method == 'GET' else dict(request.POST.iteritems())
    meetup_session = get_meetup_session_from_request(request)
    return execute_meetup_api_action(meetup_api_uri, method, data, meetup_session)


def event(request, event_id=None):
    """
    get all events as well to compare uri structure
    http://www.meetup.com/meetup_api/docs/2/event/#create
    http://www.meetup.com/meetup_api/docs/2/event/#edit
    http://www.meetup.com/meetup_api/docs/2/event/#get
    http://www.meetup.com/meetup_api/docs/2/event/#delete
    """
    meetup_api_uri = '2/event' if event_id is None else '2/event/{0}'.format(event_id)
    method = request.method
    data = request.REQUEST
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
