from django.contrib import admin
from english_language.models import *


class WordAdmin(admin.ModelAdmin):
    base_model = Word
    list_display = ['text', 'translation', 'type']
    search_fields = ['text', 'translation']


admin.site.register(Word, WordAdmin)
