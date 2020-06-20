# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2019-02-13 11:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rxbackend', '0009_repeatablestate_last_successfull_run'),
    ]

    operations = [
        migrations.CreateModel(
            name='SaltMinion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('minion_id', models.CharField(max_length=255)),
                ('accepted', models.BooleanField(default=False)),
                ('host', models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, to='rxbackend.Host')),
            ],
        ),
    ]