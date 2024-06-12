from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from .models import Question
from .serializers import QuestionSerializer


class GetQuestionView(View):
    
    @method_decorator(api_view(['GET']))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def get(self, request):
        questions = Question.objects.prefetch_related('choices').all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

class ValidateAnswerView(View):

    @method_decorator(api_view(['GET', 'POST']))
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def get_object(self, question_id):
        try:
            return Question.objects.get(pk=question_id)
        except Question.DoesNotExist:
            raise NotFound(detail='Question does not exist')

    def get(self, request, question_id):
        question = self.get_object(question_id)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    def post(self, request, question_id):
        question = self.get_object(question_id)
        serializer = QuestionSerializer(question)
        
        submitted_answer = request.data.get('answer')
        is_correct = submitted_answer == question.correct_answer
        data = {'result': 'correct' if is_correct else 'incorrect', 'answer': submitted_answer}
        return Response(data)
