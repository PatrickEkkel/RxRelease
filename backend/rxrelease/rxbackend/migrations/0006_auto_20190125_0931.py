# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2019-01-25 09:31
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rxbackend', '0005_auto_20190121_2328'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='complexstate',
            name='base_state',
        ),
        migrations.RemoveField(
            model_name='repeatablestate',
            name='base_state',
        ),
        migrations.RemoveField(
            model_name='simplestate',
            name='base_state',
        ),
        migrations.AddField(
            model_name='state',
            name='RepeatableState',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, to='rxbackend.RepeatableState'),
        ),
        migrations.AddField(
            model_name='state',
            name='complex_state',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, to='rxbackend.ComplexState'),
        ),
        migrations.AddField(
            model_name='state',
            name='simple_state',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, to='rxbackend.SimpleState'),
        ),
    ]
