# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2020-02-17 16:11
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rxbackend', '0033_auto_20200217_1608'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='configuration',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.PROTECT, to='rxbackend.Configuration'),
        ),
    ]
