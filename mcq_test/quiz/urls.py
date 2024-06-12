from django.urls import path

from .views import get_question, validate_answer

urlpatterns = [
    path('question/', get_question, name='get_question'),
    path('validate/<int:question_id>/', validate_answer, name='validate_answer'),
]
