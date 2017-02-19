"""Talk9 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import *
from category.views import *
from nanxiang import settings
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login/$', login),
    url(r'^logout/$', logout),
    url(r'^register/$', register),
    url(r'^createrecord/$', create_talk_record),
    url(r'^fetchallrecord/$', get_talk_record_list),
    url(r'^updaterecord/$', update_talk_record),
    url(r'^getrecord/$', get_talk_record),
    url(r'^fetchuser/$', fetch_user),
    url(r'^managegroup/$', manage_group),
    url(r'^creategroup/$', create_group),
    url(r'^getgroups/$', get_groups),
    url(r'^fetchBasicInfo/$', fetch_basic_info)
]
# direct to index folder
urlpatterns += static(settings.INDEX_URL, document_root=settings.INDEX_DIR)
