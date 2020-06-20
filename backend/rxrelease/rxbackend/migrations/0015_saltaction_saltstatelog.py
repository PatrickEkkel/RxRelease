# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2019-04-24 10:57
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rxbackend', '0014_auto_20190224_2057'),
    ]

    operations = [
        migrations.CreateModel(
            name='SaltAction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action', models.CharField(max_length=255)),
                ('minion', models.CharField(max_length=255)),
                ('formula', models.CharField(max_length=255)),
                ('test', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='SaltStateLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('saltstate', models.CharField(max_length=255)),
                ('duration', models.TimeField()),
                ('comment', models.CharField(max_length=255)),
                ('start_date', models.DateTimeField()),
                ('sls', models.CharField(max_length=255)),
                ('result', models.BooleanField()),
                ('minion', models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, to='rxbackend.SaltMinion')),
            ],
        ),
    ]