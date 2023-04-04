from rest_framework import serializers
from english_language.models.word import Word


class WordDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ['text', 'translation', 'rating', 'type', 'past_form']


class WordListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = '__all__'
