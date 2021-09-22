from django.shortcuts import render
from rest_framework.views import Response
from rest_framework.decorators import api_view
# Create your views here.
from api.serializer import *
from api.models import Task
from rest_framework import status



@api_view(http_method_names=["POST"])
def get_tasks(request):
    tasks = Task.objects.all()
    serializer = TasksSerializer(tasks, many=True)
    return Response(data=serializer.data)


@api_view(http_method_names=["POST"])
def update_task(request, task_id):
    task = Task.objects.get(id=task_id)
    print(request.data)

    task_status = request.data.get("completed")
    print(f"Task Status: {task_status}")
    task_title = request.data.get("title")
    print(f"Task Title: {task_title}")

    if task_status != None:
        task.completed = task_status

    elif task_title != None:
        task.title = task_title

    task.save()

    return Response(data=True)


@api_view(http_method_names=["POST"])
def create_task(request):
    serialzier = TasksSerializer(data=request.data)
    if serialzier.is_valid():
        serialzier.save()

    task_title = serialzier.data.get("title")
    task = Task.objects.get(title=task_title)
    task_id = task.id
    context = [True, task_id]
    return Response(data=context)
    
@api_view(http_method_names=["DELETE"])
def delete_task(request, task_id):
    task = Task.objects.get(id=task_id)
    task.delete()
    return Response(data=True)


