from __future__ import unicode_literals

#from django.db import models

# Create your models here.
from mongoengine import *  
connect('test')  
  
class Talk_record(Document):  
    name = StringField(max_length=100)  
    student_id = StringField(max_length=100)
    record = StringField(max_length=100)
    next_advice = StringField(max_length=100)