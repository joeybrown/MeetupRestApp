import json
from django.http import HttpResponse, QueryDict


def execute_meetup_api_action(meetup_api_uri, method, data, meetup_session):

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

    print 'most recent url:'.format(response.url)

    try:
        json_response = get_json_response(response)
        return HttpResponse(json.dumps(json_response), content_type='application/json')
    except AttributeError:
        return HttpResponse()


def get_meetup_session_from_request(request):
    return request.session['meetup_session']


def get_meetup_params(request, meetup_params_from_uri):

    data = {}

    if request.method == 'POST':
        data.update(request.POST.iteritems())

    if request.body is not None:
        data.update(json.loads(request.body))

    for key in meetup_params_from_uri:
        if meetup_params_from_uri[key] is not None:
            try:
                data[key] = meetup_params_from_uri[key]
            except NameError:
                data = {key: meetup_params_from_uri[key]}

    return data


def get_rsvp_uri(rsvp_id, method):
        if method == 'POST':
            uri = '2/rsvp'
        if method == 'GET':
            if rsvp_id is None:
                uri = '2/rsvps'
            else:
                uri = '2/rsvp/{0}'.format(rsvp_id)
        return uri