import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from .models import Question
from .serializers import QuestionSerializer


@api_view(['GET'])
def get_question(request):
    questions = Question.objects.prefetch_related('choices').all()
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@csrf_exempt
def validate_answer(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        return Response({'error': 'Question does not exist'}, status=404)

    serializer = QuestionSerializer(question)  # Use serializer to access choices
    correct_choice = serializer.data['choices'][0] if serializer.data['choices'] else None  # Assuming only one correct choice

    submitted_answer = request.data.get('answer')
    is_correct = submitted_answer == question.correct_answer  # Access choice text
    data = {'result': 'correct' if is_correct else 'incorrect', 'answer': submitted_answer}
    return Response(data)
