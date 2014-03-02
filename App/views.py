from django.shortcuts import render


def home(request):
    return render(
        request,
        "main.html",
        {}
    )


def log_in(request):
    return render(
        request,
        "main.html",
        {}
    )


def log_out(request):
    request.session.flush()
    return render(request, 'logout.html', {})


def test(request):
    x = request.session['meetup_session']
    y = x.get('2/member/self', params={'page': '20'})

    r = x.get('2/groups', params={'group_id': 1606258})

    return render(
        request,
        "main.html",
        {}
    )