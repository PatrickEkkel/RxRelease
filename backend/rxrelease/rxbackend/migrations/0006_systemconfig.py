# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-02-01 15:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rxbackend', '0005_host_profiletype'),
    ]

    operations = [
        migrations.CreateModel(
            name='SystemConfig',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('buildversion', models.CharField(max_length=150)),
                ('dbStatus', models.CharField(max_length=255)),
            ],
        ),
    ]