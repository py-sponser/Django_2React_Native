from django.urls import path
from api import views

app_name = "api"

urlpatterns = [
    path("tasks/", views.get_tasks, name="get_tasks"),
    path("task/<str:task_id>/update/", views.update_task, name="update_task"),
    path("task/create/", views.create_task, name="create_task"),
    path("task/<str:task_id>/delete/", views.delete_task, name="delete_task"),
]