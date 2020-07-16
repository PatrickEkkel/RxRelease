# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2020-02-17 16:08
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rxbackend', '0032_host_profile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='configuration',
            name='hosts',
        ),
        migrations.RemoveField(
            model_name='configuration',
            name='profile',
        ),
        migrations.AddField(
            model_name='profile',
            name='configuration',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, to='rxbackend.Configuration'),
            preserve_default=False,
        ),
    ]
