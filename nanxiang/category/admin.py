from django.contrib import admin
from category.models import *

# Register your models here.
admin.site.register(TalkRecord)
admin.site.register(CustomUser)
admin.site.register(Teacher)
admin.site.register(Student)