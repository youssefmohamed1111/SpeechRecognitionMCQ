from django.db import models


class Question(models.Model):
    text = models.CharField(max_length=255)  # Question
    correct_answer = models.CharField(max_length=255)

    def __str__(self):
        return self.text
    
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    text = models.CharField(max_length=255) # Answer
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text