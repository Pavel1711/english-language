from rest_framework import serializers
from english_language.models.word import Word


class WordDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ['text', 'translation', 'right_answer',
                  'wrong_answer', 'type', 'wrong_form']


class WordListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = '__all__'
