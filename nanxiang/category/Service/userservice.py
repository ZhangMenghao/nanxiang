from ..models import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import json

SUCCESS = 'SUCCESS'
DUPLICATE = 'DUPLICATE'
NO_EXIST = 'NO_EXIST'
MISMATCH = 'MISMATCH'
ERROR = 'ERROR'
INVALID = 'INVALID'

class DBService:
    @staticmethod
    def user_register(data):
        status = SUCCESS

        username = data['username']
        password = data['password']
        priviledge = int(data['priviledge'])

        try:
            if priviledge > 0:
                Teacher.objects.create_user(username=username,
                                            password=password, priviledge=priviledge)
            else:
                student = Student.objects.create_user(username=username,
                                            password=password, priviledge=priviledge, student_name='student')
                teachers = Teacher.objects.all()


                for teacher in teachers:
                    teacher.student.add(student)

                print 'student'
        except Exception as e:
            status = DUPLICATE
            print '[X]error when register, status:', status, ' ', e
        finally:
            return status

    @staticmethod
    def user_login(data, request):
        status = SUCCESS

        try:
            username = data['username']
            password = data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
            else:
                status = INVALID
        # no match
        except Exception, e:
            status = NO_EXIST
            print '[X]error when login, status:', status, ' ', e
        finally:
            return status

    @staticmethod
    def user_logout(request):
        status = SUCCESS
        logout(request)
        return status

    @staticmethod
    def get_user_by_username(username):
        user = None
        try:
            user = CustomUser.objects.get(username=username)
        except Exception, e:
            print '[X]error when get user by name=', username, ' ', e
            user = None
        finally:
            return user

    @staticmethod
    def get_user_by_uid(uid):
        user = None
        try:
            user = CustomUser.objects.get(id=uid)
        except Exception, e:
            print '[X]error when get user by id=', uid, ' ', e
            user = None
        finally:
            return user

    @staticmethod
    def insert_talk_record(data):
        status = SUCCESS
        try:
            sid = 0
            try:
                student = Student.objects.get(username=data['student_id'])
                sid = student.id
            except Exception, e:
                print "[X]error when insert talk record no student whose id=",data['student_id'], e
                status = ERROR
                return status

            talk_record = TalkRecord(
                tid=data['tid'], sid=sid,
                student_name=data['student_name'], student_sex=data['student_sex'], student_class=data['student_class'],
                student_id=data['student_id'], student_policy_role=data['student_policy_role'],
                student_nation=data['student_nation'], student_dorm_address=data['student_dorm_address'],
                student_phonenumber=data['student_phonenumber'],
                student_dorm_phonenumber=data['student_dorm_phonenumber'],
                student_home_address=data['student_home_address'],
                student_home_phonenumber=data['student_home_phonenumber'],
                student_email=data['student_email'], student_home_situation=data['student_home_situation'],
                student_study_situation=data['student_study_situation'],
                student_thought_situation=data['student_thought_situation'],
                student_live_situation=data['student_live_situation'],
                student_society_situation=data['student_society_situation'],
                teacher_name=data['teacher_name'], talk_time=data['talk_time'], talk_place=data['talk_place'],
                content=data['content'],
                recommend=data['recommend']
            )
            talk_record.save()
        except Exception, e:
            print "[X]error when save talkrecord ", e
            status = ERROR
        finally:
            return status

    @staticmethod
    def update_talk_record(data):
        status = SUCCESS
        import time,datetime
        try:

            talk_record = TalkRecord.objects.get(id=data['rid'])
            t_time = time.mktime(time.strptime(data['talk_time'], '%Y-%m-%d %H:%M:%S'))

            talk_record.student_name = data['student_name']
            talk_record.student_sex = data['student_sex']
            talk_record.student_class = data['student_class']
            talk_record.student_id = data['student_id']
            talk_record.student_policy_role = data['student_policy_role']
            talk_record.student_nation = data['student_nation']
            talk_record.student_dorm_address = data['student_dorm_address']
            talk_record.student_phonenumber = data['student_phonenumber']
            talk_record.student_dorm_phonenumber = data['student_dorm_phonenumber']
            talk_record.student_home_address = data['student_home_address']
            talk_record.student_home_phonenumber = data['student_home_phonenumber']
            talk_record.student_email = data['student_email']
            talk_record.student_home_situation = data['student_home_situation']
            talk_record.student_study_situation = data['student_study_situation']
            talk_record.student_thought_situation = data['student_thought_situation']
            talk_record.student_live_situation = data['student_live_situation']
            talk_record.student_society_situation = data['student_society_situation']
            talk_record.teacher_name = data['teacher_name']

            x = time.localtime(t_time)
            talk_record.talk_time = time.strftime('%Y-%m-%d %H:%M:%S', x)

            talk_record.talk_place = data['talk_place']
            talk_record.content = ['content']
            talk_record.recommend = data['recommend']

            talk_record.save()
        except Exception, e:
            print "[X]error when update talkrecord, id=", data['rid'], ' ', e
            status = ERROR
        finally:
            return status

    @staticmethod
    def delete_talk_record(data):
        status = SUCCESS
        try:
            tid = data['tid']
            sid = data['sid']
            talk_record = TalkRecord.objects.get(tid=tid, sid=sid)
            talk_record.delete()
        except Exception, e:
            print "[X]error when delete talkrecord, sid=", sid, ' tid=', tid, ' ', e
            status = ERROR
        finally:
            return status

    @staticmethod
    def get_all_talk_record_of_teacher(tid):
        talk_record_list = []
        teacher = None
        try:
            teacher = Teacher.objects.get(id=tid)
        except Exception, e:
            print '[X]error when get talk record of teacher ', e
            return talk_record_list

        for student in teacher.student.all():
            sid = student.id
            try:
                record = TalkRecord.objects.filter(tid=tid, sid=sid)
                talk_record_list.extend(record)
            except Exception, e:
                print "[X]error when get record tid=", tid, " sid=", sid, ' ', e

        return talk_record_list

    @staticmethod
    def get_record_by_tid_and_sid(tid, sid):
        record = None
        try:
            record = TalkRecord.objects.get(tid=tid, sid=sid)
        except Exception, e:
            print "[X]error when get record tid=", tid, " sid=", sid
            record = None
        finally:
            return record

    @staticmethod
    def is_teacher(id):
        be_teacher = False
        try:
            user = CustomUser.objects.get(id=id)
            be_teacher = user.priviledge > 0
        except Exception, e:
            print '[X]error when judge is teacher ', e
            be_teacher = False
        finally:
            return be_teacher

    @staticmethod
    def user_is_teacher(user):
        return user.priviledge > 0

    @staticmethod
    def get_all_student_info_in_json_mark_by_gid(gid):
        student_list = Student.objects.all()
        json_list = list()
        for student in student_list:
            student_info = dict()
            student_info['id_number'] = student.username
            student_info['real_name'] = student.username
            student_info['uid'] = student.id
            student_info['in_group'] = False
            json_list.append(student_info)

        return json.dumps(json_list)

    @staticmethod
    def get_all_teacher_info_in_json_mark_by_gid(gid):
        teacher_list = Teacher.objects.all()
        json_list = list()
        for teacher in teacher_list:
            teacher_info = dict()
            teacher_info['id_number'] = teacher.username
            teacher_info['real_name'] = teacher.username
            teacher_info['uid'] = teacher.id
            teacher_info['in_group'] = False
            json_list.append(teacher_info)

        return json.dumps(json_list)

    @staticmethod
    def get_all_member_info_in_json_in_gid(gid):
        teacher_list = Teacher.objects.all()
        json_list = list()
        for teacher in teacher_list:
            teacher_info = dict()
            teacher_info['id_number'] = teacher.username
            teacher_info['real_name'] = teacher.username
            teacher_info['uid'] = teacher.id
            teacher_info['in_group'] = False
            json_list.append(teacher_info)

        return json.dumps(json_list)

    @staticmethod
    def user_is_admin(user):
        return user.priviledge >= 2

    @staticmethod
    def get_talk_record_by_id(rid):
        record = TalkRecord.objects.get(id=rid)
        return record
