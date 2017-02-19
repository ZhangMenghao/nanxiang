import json
from django.http import HttpResponse
from django.http import StreamingHttpResponse
from Service.userservice import *
class Response:
    returnMap = {}
    def __init__(self):
        self.returnMap = {}
        return

    def setErrorStatus(self,message):
        self.returnMap['status'] = 'ERROR'
        self.returnMap['message'] = message

    def setSuccessStatus(self,message):
        self.returnMap['status'] = 'SUCCESS'
        self.returnMap['message'] = message

    def setData(self,key,data):
        self.returnMap[key] = data

    def getJsonHttpResponse(self):
        return HttpResponse(json.dumps(self.returnMap), content_type="application/json")

    def getStreamingHttpResponse(self):

        #response = StreamingHttpResponse(file_iterator(the_file_name))
        #response['Content-Type'] = 'application/octet-stream'
        #response['Content-Disposition'] = 'attachment;filename="{0}"'.format(
        #   the_file_name)

        return #response

    def set_user_info(self, uid):
        user = CustomUser.objects.get(id=uid)
        self.returnMap['username'] = user.username
        self.returnMap['student_id'] = user.username
        self.returnMap['privilege'] = user.priviledge
        return #response
