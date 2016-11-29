from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Talk_record(models.Model):  
    name = models.CharField(max_length=100)  
    student_id = models.CharField(max_length=100)
    record = models.CharField(max_length=100)
    next_advice = models.CharField(max_length=100)

    def __str__(self) :
        return self.title