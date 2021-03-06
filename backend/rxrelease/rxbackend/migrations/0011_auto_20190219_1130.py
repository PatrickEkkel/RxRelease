# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2019-02-19 11:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rxbackend', '0010_saltminion'),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('filename', models.CharField(max_length=255)),
                ('path', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='SaltFormula',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('file', models.CharField(max_length=8000)),
                ('status', models.CharField(default=0, max_length=255)),
                ('files', models.ManyToManyField(to='rxbackend.File')),
            ],
        ),
        migrations.DeleteModel(
            name='SaltFormulas',
        ),
    ]
