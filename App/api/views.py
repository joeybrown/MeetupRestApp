import json
from django.http import HttpResponse


def get_group_info(request):
    meetup_session = request.session['meetup_session']
    group_details = meetup_session.get('2/groups', params={'group_urlname': 'memphis-technology-user-groups'})

    json_details = json.loads(group_details.content)['results'][0]

    return HttpResponse(json.dumps(json_details), content_type="application/json")


def get_group_events(request):
    meetup_session = request.session['meetup_session']
    group_details = meetup_session.get('2/events', params={'group_urlname': 'memphis-technology-user-groups', 'page': 20})

    json_details = json.loads(group_details.content)['results']

    return HttpResponse(json.dumps(json_details), content_type="application/json")


#def oauth(request):
#    oauth_verb = request.oauth_verb
#    oauth_url = request.oauth_url
#    oauth_params = request.oauth_params
#
#    if oauth_verb is 'get':
#        print oauth_verb
#
#    elif oauth_verb is 'delete':
#        print oauth_verb
#
#    elif oauth_verb is 'put':
#        print oauth_verb
#
#    elif oauth_verb is 'patch':
#        print oauth_verb
#
#    elif oauth_verb is 'delete':
#        print oauth_verb