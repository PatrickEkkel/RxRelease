# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2019-02-20 10:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rxbackend', '0012_auto_20190220_1040'),
    ]

    operations = [
        migrations.AlterField(
            model_name='saltformula',
            name='files',
            field=models.ManyToManyField(blank=True, null=True, to='rxbackend.File'),
        ),
    ]
