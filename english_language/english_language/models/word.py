from django.db import models


# =========================================================================================================
# Word
# =========================================================================================================
class Word(models.Model):
    NOUN = 'noun'
    ADJECTIVE = 'adjective'
    VERB = 'verb'
    PHRASE = 'phrase'
    WORD_TYPES = (
        (NOUN, 'Существительное'),
        (ADJECTIVE, 'Прилагательное'),
        (VERB, 'Глагол'),
        (PHRASE, 'Фраза'),
    )
    text = models.CharField(verbose_name='Слово', max_length=128)
    translation = models.CharField(verbose_name='Перевод', max_length=128)
    right_answer = models.IntegerField(
        verbose_name='Правильный ответ', default=0)
    wrong_answer = models.IntegerField(
        verbose_name='Неправильный ответ', default=0)
    type = models.CharField(
        verbose_name='Тип', choices=WORD_TYPES, max_length=64, default=NOUN)
    wrong_form = models.CharField(
        verbose_name='Неправильная форма', blank=True, null=True, max_length=64)

    class Meta:
        verbose_name = 'Слово'
        verbose_name_plural = 'Слова'
