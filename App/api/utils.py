import json
from django.http import HttpResponse
from urlparse import parse_qs


def execute_meetup_api_action(meetup_api_uri, method, data, meetup_session, web_request=True):

    def get_json_response(raw_response):
        return json.loads(raw_response.content)

    def execute_action(_meetup_api_uri, _method, _data, _meetup_session):
        if _method == 'GET':
            return _meetup_session.get(_meetup_api_uri, params=_data)
        elif _method == 'POST':
            return _meetup_session.post(_meetup_api_uri, _data)
        elif _method == 'DELETE':
            return _meetup_session.delete(_meetup_api_uri, params=_data)
        elif _method == 'PUT':
            return _meetup_session.post(_meetup_api_uri, _data)
        else:
            raise Exception('Error in creating Meetup Session', 'HTTP method is not recognized')

    data = dict(data)
    response = execute_action(meetup_api_uri, method, data, meetup_session)

    print 'most recent url: {0}'.format(response.url)

    try:
        json_response = get_json_response(response)
        if not web_request:
            return json_response
        return HttpResponse(json.dumps(json_response), content_type='application/json')
    except AttributeError:
        return HttpResponse()


def get_meetup_session_from_request(request):
    return request.session['meetup_session']


def get_meetup_params(request, extra_meetup_params):

    data = {}

    if request.method == 'POST':
        data.update(request.POST.iteritems())

    if request.method == 'GET':
        data.update(request.GET.iteritems())

    if request.body != '':
        try:
            data.update(json.loads(request.body))
        except ValueError:
            pass

        try:
            qs_dict = parse_qs(request.body)
            for key in qs_dict:
                data[key] = qs_dict[key][0]
        except Exception:  # fwiw I don't think this happens...
            pass

    d = extra_meetup_params
    data.update((k, v) for k, v in d.iteritems() if v is not None)

    return data


def get_rsvp_uri(rsvp_id, method):
    if method == 'POST':
        uri = '/2/rsvp'
    if method == 'GET':
        if rsvp_id is None:
            uri = '/2/rsvps'
        else:
            uri = '/2/rsvp/{0}'.format(rsvp_id)
    return uri