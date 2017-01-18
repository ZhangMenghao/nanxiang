# -*- coding: utf-8 -*-
# Create your views here.

from .response import *
from .Service.userservice import *

HAS_LOGINED = 'has_logined'
NEVER_LOGINED = 'never_logined'
HAS_LOGOUT = 'has_logout'
REJECTED = 'rejected'
TEACHER = 'teacher'
STUDENT = 'student'

def logout(request):
    response = Response()
    if not request.user.is_authenticated():
        response.setErrorStatus(NEVER_LOGINED)
        return response.getJsonHttpResponse()
    DBService.user_logout(request)
    response.setSuccessStatus(HAS_LOGOUT)
    return response.getJsonHttpResponse()


def login(request):
    response = Response()
    data = json.loads(request.body)
    print '[login]data: ', data
    #拒绝重复登录
    if request.user.is_authenticated:
        response.setErrorStatus(HAS_LOGINED)
        return response.getJsonHttpResponse()

    try:
        username = data['username']
        status = DBService.user_login(data, request)
        if status == SUCCESS:
            user = DBService.get_user_by_username(username)
            if DBService.user_is_teacher(user=user):
                response.setSuccessStatus(TEACHER)
            else:
                response.setSuccessStatus(STUDENT)

        else:
            response.setErrorStatus(MISMATCH)
    except Exception as e:
        print '[X]login error: ', e
        response.setErrorStatus(e)
    finally:
        return response.getJsonHttpResponse()


def register(request):
    """
    注册
    :param request:
    :return:
    """
    response = Response()
    data = json.loads(request.body)
    print data['username']
    try:
        #注册用户，若用户已经存在将失败，注册后存储在数据库的密码为md5格式
        status1 = DBService.user_register(data)
        if status1 == SUCCESS:
            login(request)
            user = DBService.get_user_by_username(data['username'])
            if user.priviledge > 0:
                response.setSuccessStatus(TEACHER)
            else:
                response.setSuccessStatus(STUDENT)
        else:
            response.setErrorStatus(status1)
    except Exception, e:
        print '[X]register fail: ', e
        response.setErrorStatus(e)
    finally:
        return response.getJsonHttpResponse()


def get_talk_record_list(request):
    """
    请求json数组格式的谈话记录列表
    """
    response = Response()
    if not request.user.is_authenticated():
        response.setErrorStatus(NEVER_LOGINED)
        return response.getJsonHttpResponse()

    try:
        tid = request.user.id
        record_list = DBService.get_all_talk_record_of_teacher(tid=tid)
        print "packed\n"
        record_json_list = list()
        for record in record_list:
            record_json_list.append(record.toJSON())
        response.setData(key='record_list', data=json.dumps(record_json_list))
        response.setSuccessStatus('packed!')
    except Exception, e:
        print '[X]pack talk list fail: ', e
        response.setErrorStatus(e)
    finally:
        return response.getJsonHttpResponse()


def create_talk_record(request):
    """
    建立谈话记录
    """
    response = Response()
    if not request.user.is_authenticated():
        response.setErrorStatus(NEVER_LOGINED)
        return response.getJsonHttpResponse()

    data = json.loads(request.body)
    data['tid'] = request.user.id
    try:
        if not DBService.is_teacher(request.user.id):
            response.setErrorStatus(REJECTED)
        else:
            status, message = DBService.insert_talk_record(data)
            if status == SUCCESS:
                response.setSuccessStatus(status)
            else:
                response.setErrorStatus(message)
    except Exception, e:
        print '[X]create talk record fail: ', e
        response.setErrorStatus(e)
    finally:
        return response.getJsonHttpResponse()


def update_talk_record(request):
    """
    修改谈话记录
    """
    response = Response()
    if not request.user.is_authenticated():
        response.setErrorStatus(NEVER_LOGINED)
        return response.getJsonHttpResponse()

    data = json.loads(request.body)

    try:
        status = DBService.update_talk_record(data)
        if status == SUCCESS:
            response.setSuccessStatus(status)
        else:
            response.setErrorStatus(status)
    except Exception, e:
        print '[X]update talk record fail: ', e
        response.setErrorStatus(e)
    finally:
        return response.getJsonHttpResponse()


def get_talk_record(request):
    """
    获得谈话记录
    """
    response = Response()
    rid = request.GET['rid']
    if not request.user.is_authenticated():
        response.setErrorStatus(NEVER_LOGINED)
        return response.getJsonHttpResponse()

    try:
        record = DBService.get_talk_record_by_id(rid=rid)
        record_list = list()
        record_list.append(record.toJSON())
        response.setData(key='record_list', data=json.dumps(record_list))
        response.setSuccessStatus(SUCCESS)
    except Exception, e:
        print '[X]update talk record fail: ', e
        response.setErrorStatus(e)
    finally:
        return response.getJsonHttpResponse()


def fetch_user(request):
    """
    获取用户信息
    """
    response = Response()
    #检查是否登录
    if not request.user.is_authenticated():
        response.setErrorStatus(NEVER_LOGINED)
        return response.getJsonHttpResponse()
    #检查是否是admin权限
    user = DBService.get_user_by_uid(request.user.id)
    if not DBService.user_is_admin(user):
        print '[priviledfe]',user.priviledge
        response.setErrorStatus(REJECTED)
        return response.getJsonHttpResponse()

    mode = int(request.GET['mode'])
    gid = int(request.GET['gid'])
    print "gid:",gid
    try:
        user_list = None
        if mode == 0:
            #获取所有学生
            user_list = DBService.get_all_student_info_in_json_mark_by_gid(gid)

        elif mode == 1:
            #获取所有老师
            user_list = DBService.get_all_teacher_info_in_json_mark_by_gid(gid)

        elif mode == 2:
            #获取组内所有人
            user_list = DBService.get_all_member_info_in_json_in_gid(gid)

        response.setData(key='users_list', data=user_list)
        response.setSuccessStatus(SUCCESS)
    except Exception, e:
        print '[X]update talk record fail: ', e
        response.setErrorStatus(e)
    finally:
        return response.getJsonHttpResponse()


def manage_group(request):
    """
    修改组
    """
    response = Response()
    #检查是否登录
    if not request.user.is_authenticated():
        response.setErrorStatus(NEVER_LOGINED)
        return response.getJsonHttpResponse()
    #检查是否是admin权限
    user = DBService.get_user_by_uid(request.user.id)
    if not DBService.user_is_admin(user):
        print '[priviledfe]',user.priviledge
        response.setErrorStatus(REJECTED)
        return response.getJsonHttpResponse()

    uid = int(request.GET['uid'])
    gid = int(request.GET['gid'])
    action = request.GET['action']
    try:
        print "[X]manage:", uid
        user = DBService.get_user_by_uid(uid)
        group = GroupService.get_group_by_gid(gid=gid)

        info = dict()
        info['id_number'] = user.username
        info['real_name'] = user.username
        info['uid'] = user.id
        info['in_group'] = False
        if action == 'add':
            GroupService.add_user_to_group(user, group)
            info['in_group'] = True
        elif action == 'leave':
            GroupService.remove_user_of_group(user,group)
            info['in_group'] = False

        response.setData(key='user', data=info)
        response.setSuccessStatus(SUCCESS)
    except Exception, e:
        print '[X]update talk record fail: ', e
        response.setErrorStatus(e)
    finally:
        return response.getJsonHttpResponse()


def get_groups(request):
    """
    获取所有组
    :param request:
    :return:
    """
    response = Response()
    #检查是否登录
    if not request.user.is_authenticated():
        response.setErrorStatus(NEVER_LOGINED)
        return response.getJsonHttpResponse()
    #检查是否是admin权限
    user = DBService.get_user_by_uid(request.user.id)
    if not DBService.user_is_admin(user):
        print '[priviledfe]', user.priviledge
        response.setErrorStatus(REJECTED)
        return response.getJsonHttpResponse()

    g_list = GroupService.get_all_group()
    response.setData(key='group_list', data=json.dumps(g_list))
    response.setSuccessStatus('fetch groups')
    return response.getJsonHttpResponse()


def create_group(request):
    """
    创建组
    :param request:
    :return:
    """
    response = Response()
    #检查是否登录
    if not request.user.is_authenticated():
        response.setErrorStatus(NEVER_LOGINED)
        return response.getJsonHttpResponse()
    #检查是否是admin权限
    user = DBService.get_user_by_uid(request.user.id)
    if not DBService.user_is_admin(user):
        print '[priviledfe]', user.priviledge
        response.setErrorStatus(REJECTED)
        return response.getJsonHttpResponse()

    data = json.loads(request.body)
    gname = data['gname']

    try:
        status = GroupService.create_group(gname)
        response.setData(key='create', data=gname)
        response.setSuccessStatus(status)
    except Exception, e:
        print "[X]create group error: ", e
        status = ERROR
        response.setErrorStatus(status)
    finally:
        return response.getJsonHttpResponse()