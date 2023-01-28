from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from english_language.models.word import Word
from english_language.rest.serializers.word import WordDetailSerializer


class WordListView(GenericAPIView):
    model_class = Word

    def get_queryset(self):
        return self.model_class.objects

    def get(self, request, *args, **kwargs):
        context = {'results': []}
        return Response(context)


class WordCreateView(APIView):
    def post(self, request):
        serializer = WordDetailSerializer(data=request.data)
        if serializer.is_valid():
            if Word.objects.filter(text=request.data['text']).exists() == True:
                return Response({'text': 'Данное слово/фраза уже существует'}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
