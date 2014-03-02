import json
from django.http import HttpResponse


def execute_meetup_api_action(meetup_api_uri, method, data, meetup_session, response_index=None):

    def get_json_response(raw_response, index):
        if index is None:
            return json.loads(raw_response.content)['results']
        else:
            return json.loads(raw_response.content)['results'][index]

    def execute_action(_meetup_api_uri, _method, _data, _meetup_session):
        if _method == 'GET':
            return _meetup_session.get(_meetup_api_uri, params={_data})
        elif _method == 'POST':
            return _meetup_session.post(_meetup_api_uri, params={_data})
        elif _method == 'DELETE':
            return _meetup_session.delete(_meetup_api_uri, params={_data})
        else:
            raise Exception('Error in creating Meetup Session', 'HTTP method is not recognized')

    response = execute_action(meetup_api_uri, method, data, meetup_session)
    json_response = get_json_response(response, response_index)
    return HttpResponse(json.dumps(json_response), content_type="application/json")