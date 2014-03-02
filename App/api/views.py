from utils import execute_meetup_api_action


def get_group_info(request):
    meetup_api_uri = '2/groups'
    data = {'group_urlname': 'memphis-technology-user-groups'}
    meetup_session = request.session['meetup_session']
    return execute_meetup_api_action(meetup_api_uri, 'GET', data, meetup_session, 0)


def get_group_events(request):
    meetup_api_uri = '2/events'
    data = {'group_urlname': 'memphis-technology-user-groups', 'page': 20}
    meetup_session = request.session['meetup_session']
    return execute_meetup_api_action(meetup_api_uri, 'GET', data, meetup_session)


def rsvps(request, rsvp_id=None):
    """
    http://www.meetup.com/meetup_api/docs/2/rsvps
    http://www.meetup.com/meetup_api/docs/2/rsvp/#create
    http://www.meetup.com/meetup_api/docs/2/rsvp/#get
    """
    meetup_api_uri = '2/rsvps' if rsvp_id is None else '2/rsvps/{0}'.format(rsvp_id)
    method = request.method
    data = request.REQUEST
    meetup_session = request.session['meetup_session']
    return execute_meetup_api_action(meetup_api_uri, method, data, meetup_session)

