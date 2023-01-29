from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from english_language.models.word import Word
from english_language.rest.serializers.word import WordListSerializer, WordDetailSerializer


class WordListView(ListAPIView):
    serializer_class = WordListSerializer
    queryset = Word.objects.all()


class WordSmartListView(ListAPIView):
    model_class = Word

    def get_queryset(self):
        return self.model_class.objects

    def get(self, request, *args, **kwargs):
        context = {'results': []}
        return Response(context)


class WordCreateView(APIView):
    def post(self, request):
        data = request.data
        serializer = WordDetailSerializer(data=data)
        if serializer.is_valid():
            try:
                word = Word.objects.get(text=data['text'])
                if data['translation'] in word.translation:
                    return Response({'text': 'Данное слово/фраза уже существует'}, status=status.HTTP_400_BAD_REQUEST)
                word.translation = f"{word.translation}, {data['translation']}"
                word.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Word.DoesNotExist:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
