from django.urls import path
from quiz.views import GetQuestionView, ValidateAnswerView

urlpatterns = [
    path('questions/', GetQuestionView.as_view(), name='get_question'),
    path('validate/<int:question_id>/', ValidateAnswerView.as_view(), name='validate_answer'),
]
