# Generated by Django 2.1.4 on 2019-02-24 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rxbackend', '0013_auto_20190220_1046'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='saltformula',
            name='file',
        ),
        migrations.AlterField(
            model_name='saltformula',
            name='files',
            field=models.ManyToManyField(blank=True, to='rxbackend.File'),
        ),
    ]
