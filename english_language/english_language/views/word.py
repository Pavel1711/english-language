from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from english_language.models.word import Word


class WordListView(GenericAPIView):
    model_class = Word

    def get_queryset(self):
        return self.model_class.objects

    def get(self, request, *args, **kwargs):
        context = {'results': []}
        return Response(context)
