from django import template
from django.core.urlresolvers import reverse

register = template.Library()
 
@register.simple_tag(takes_context=True)
def login(context):
    try:
        name = context['name']
        url = reverse('log_out')
        return '<li class="dropdown"><a class="dropdown-toggle" style="cursor: pointer;" data-toggle="dropdown">' +\
               name + ' <b class="caret"></b></a><ul class="dropdown-menu"><li><a href="' +\
               url + '">Log Out</a></li></ul></li>'

    except KeyError:
        authorize_url = context['authorize_url']
        return '<li><a href="' + authorize_url + '"> Log In </a></li>'