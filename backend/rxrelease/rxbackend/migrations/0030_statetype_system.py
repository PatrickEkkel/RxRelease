# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2020-01-23 15:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rxbackend', '0029_module_statetypepanel'),
    ]

    operations = [
        migrations.AddField(
            model_name='statetype',
            name='system',
            field=models.BooleanField(default=False),
        ),
    ]
