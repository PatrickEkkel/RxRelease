# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2019-05-01 13:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rxbackend', '0020_auto_20190429_2143'),
    ]

    operations = [
        migrations.AddField(
            model_name='saltstatelog',
            name='test',
            field=models.BooleanField(default=None),
        ),
        migrations.AddField(
            model_name='saltstatelog',
            name='type',
            field=models.CharField(default='', max_length=255),
        ),
    ]