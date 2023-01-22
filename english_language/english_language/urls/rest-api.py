from django.urls import path

from english_language.views.word import *


urlpatterns = [
    path('word/create/', WordCreateView.as_view()),
    path('word/all/', WordListView.as_view()),
]
