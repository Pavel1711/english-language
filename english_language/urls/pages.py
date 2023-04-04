from django.urls import path, include

from english_language.views.pages import *

urlpatterns = [
    path('', index),
    path('trainer/', index),
    path('create/word/', index),
]
