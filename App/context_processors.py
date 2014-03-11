from rauth import OAuth1Service
import os


def get_name(meetup_session):
    response = meetup_session.get('2/member/self', params={'page': '20'})
    user = response.json()
    return user['name']


def log_in_processor(request):
    s = request.session
    variables = {}

    try:
        meetup_session = request.session['meetup_session']
        s['meetup_session'] = meetup_session
        variables['name'] = get_name(meetup_session)

    except KeyError:
        meetup = OAuth1Service(
            name='meetup',
            consumer_key=os.environ['CONSUMER_KEY'],
            consumer_secret=os.environ['CONSUMER_PW'],
            request_token_url='https://api.meetup.com/oauth/request',
            access_token_url='https://api.meetup.com/oauth/access',
            authorize_url='http://www.meetup.com/authorize',
            base_url='https://api.meetup.com/',
        )

        try:
            request_token = s['request_token']
            request_token_secret = s['request_token_secret']
            meetup_session = meetup.get_auth_session(request_token,
                                                     request_token_secret,
                                                     method='POST')
            s['meetup_session'] = meetup_session
            variables['name'] = get_name(meetup_session)

        except KeyError:
            request_token, request_token_secret = meetup.get_request_token()
            authorize_url = meetup.get_authorize_url(request_token)

            s['request_token'] = request_token
            s['request_token_secret'] = request_token_secret
            variables['authorize_url'] = authorize_url

    return variables