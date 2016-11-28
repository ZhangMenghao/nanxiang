from django.shortcuts import render,render_to_response

# Create your views here.
from django.http import HttpResponse
from models import Talk_record


def helloworld(request):
    return HttpResponse("Hello, world.")

def input_record_form(request):
	return render_to_response('index.html')

def input_record(request):
	names = request.GET['names']
	entry = Talk_record(name= names)  
	entry.student_id = request.GET['student_id']
	entry.record = request.GET['record']
	entry.next_advice = request.GET['next_advice']
	entry.save()  
	resp = "name %s , student_id %s , record %s, next_advice %s" %(entry.name, entry.student_id, entry.record, entry.next_advice)   
	return HttpResponse(resp) 