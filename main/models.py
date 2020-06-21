from django.db import models
from django.utils import timezone


class ScrapyItem(models.Model):
    unique_id = models.CharField(max_length=100, null=True)
    url = models.CharField(max_length=100, null=True)
    title = models.TextField(blank=True)
    review = models.TextField(blank=True)
    rating = models.TextField(blank=True)
    date = models.DateTimeField(default=timezone.now)
