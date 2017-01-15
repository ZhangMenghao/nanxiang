# -*- coding:utf-8 -*-
from __future__ import unicode_literals
import json
from django.db import models
from django.contrib.auth.models import User, UserManager


class CustomUser(User):
    objects = UserManager()
    """
    权限 0：本科 1：辅导员 2：班主任
    """
    priviledge = models.IntegerField(
        default=0)

    class Meta:
        default_related_name = 'category_customer'


class Student(CustomUser):
    objects = UserManager()
    student_name = models.CharField(max_length=64, null=True)

    class Meta:
        default_related_name = 'category_student'



class Teacher(CustomUser):
    objects = UserManager()
    student = models.ManyToManyField(
        Student)

    class Meta:
        default_related_name = 'category_teacher'



class TalkRecord(models.Model):
    tid = models.IntegerField(
        db_index=True)
    sid = models.IntegerField(
        db_index=True)

    """
    学生基本信息
    """
    student_name = models.CharField(max_length=64)
    student_sex = models.CharField(max_length=64)
    student_class = models.CharField(max_length=64)

    student_id = models.CharField(max_length=64)
    student_policy_role = models.CharField(max_length=64)
    student_nation = models.CharField(max_length=64)

    student_dorm_address = models.TextField()
    student_phonenumber = models.CharField(max_length=64)
    student_dorm_phonenumber = models.CharField(max_length=64)
    student_home_address = models.TextField()
    student_home_phonenumber = models.CharField(max_length=64)
    student_email = models.CharField(max_length=64)

    """
    学生基本状况
    """
    student_home_situation = models.TextField()
    student_study_situation = models.TextField()
    student_thought_situation = models.TextField()
    student_live_situation = models.TextField()
    student_society_situation = models.TextField()

    """
    谈话人基本信息
    """
    teacher_name = models.CharField(max_length=64)
    talk_time = models.DateTimeField(
        null=True)
    talk_place = models.TextField()

    """
    谈话内容
    """
    content = models.TextField()
    recommend = models.TextField()

    def __unicode__(self):
        return '%s' % (json.dumps(self.teacher_name) + json.dumps(self.student_name) + json.dumps(str(self.id)))



    def get_val(self, attr):
        val = getattr(self, attr)
        try:
            val = val.strftime('%Y-%m-%d %H:%M:%S').encode('utf8')
            return val
        except Exception, e:
            return getattr(self, attr)

    def toJSON(self):
        return dict([(attr, self.get_val(attr)) for attr in [f.name for f in self._meta.fields]])

    class Meta:
        index_together = [
            ["tid", "sid"],
        ]


# Create your models here.
