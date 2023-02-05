from django.db import models


# =========================================================================================================
# Word
# =========================================================================================================
class Word(models.Model):
    NOUN = 'noun'
    ADJECTIVE = 'adjective'
    VERB = 'verb'
    ADVERB = 'adverb'
    PHRASE = 'phrase'
    WORD_TYPES = (
        (NOUN, 'Существительное'),
        (ADJECTIVE, 'Прилагательное'),
        (VERB, 'Глагол'),
        (ADVERB, 'Наречие'),
        (PHRASE, 'Фраза'),
    )
    text = models.CharField(verbose_name='Слово', max_length=128)
    translation = models.CharField(verbose_name='Перевод', max_length=128)
    rating = models.IntegerField(
        verbose_name='Рейтинг', default=0)
    type = models.CharField(
        verbose_name='Тип', choices=WORD_TYPES, max_length=64, default=NOUN)
    past_form = models.CharField(
        verbose_name='Прошедшая форма', blank=True, null=True, max_length=64)

    class Meta:
        verbose_name = 'Слово'
        verbose_name_plural = 'Слова'
