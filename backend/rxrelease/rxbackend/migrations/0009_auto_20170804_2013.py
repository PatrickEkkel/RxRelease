# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-08-04 20:13
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rxbackend', '0008_host_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='host',
            old_name='Status',
            new_name='status',
        ),
    ]
