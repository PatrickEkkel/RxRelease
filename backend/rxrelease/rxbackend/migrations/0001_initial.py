# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-10-23 14:59
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import rxbackend.rxforeman.foremanapi.ForemanApi


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Capability',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('module', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Configuration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='CredentialsSetting',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='DemoOnDemandUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='DemoOnDemandVM',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='DockerComposeConfiguration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dockercomposeyaml', models.CharField(blank=True, default=0, max_length=1000)),
                ('configuration', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='rxbackend.Configuration')),
            ],
        ),
        migrations.CreateModel(
            name='ForemanHost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('foreman_host_id', models.CharField(default=0, max_length=4)),
                ('status', models.CharField(default=rxbackend.rxforeman.foremanapi.ForemanApi.HostStatus(b'UNRESOLVED'), max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ForemanSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('foremanUrl', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('hostgroup_id', models.CharField(max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='Host',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hostname', models.CharField(max_length=255)),
                ('ipaddress', models.CharField(max_length=15)),
                ('description', models.CharField(max_length=400)),
                ('status', models.CharField(default=b'UNMANAGED', max_length=255)),
                ('connectioncredentials', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='rxbackend.CredentialsSetting')),
            ],
        ),
        migrations.CreateModel(
            name='InstallHost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('host_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='KVSetting',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=255)),
                ('value', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='ProfileType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('capabilities', models.ManyToManyField(to='rxbackend.Capability')),
            ],
        ),
        migrations.CreateModel(
            name='SaltSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=255)),
                ('saltmaster', models.CharField(default=0, max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='SettingsCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('installed', models.BooleanField()),
                ('host', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rxbackend.Host')),
            ],
        ),
        migrations.CreateModel(
            name='StateType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('handler', models.CharField(max_length=255, null=True)),
                ('dependentOn', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='rxbackend.StateType')),
            ],
        ),
        migrations.CreateModel(
            name='StateTypeHandler',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('host_id', models.IntegerField()),
                ('statetype_id', models.IntegerField()),
                ('keyvalList', models.CharField(max_length=4000)),
                ('handlerType', models.CharField(max_length=255)),
                ('handlerCommand', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='state',
            name='statetype',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rxbackend.StateType'),
        ),
        migrations.AddField(
            model_name='profile',
            name='profiletype',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='rxbackend.ProfileType'),
        ),
        migrations.AddField(
            model_name='kvsetting',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rxbackend.SettingsCategory'),
        ),
        migrations.AddField(
            model_name='foremanhost',
            name='host',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='rxbackend.Host'),
        ),
        migrations.AddField(
            model_name='demoondemandvm',
            name='host',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='rxbackend.ForemanHost'),
        ),
        migrations.AddField(
            model_name='demoondemanduser',
            name='dodenv',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='rxbackend.DemoOnDemandVM'),
        ),
        migrations.AddField(
            model_name='credentialssetting',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rxbackend.SettingsCategory'),
        ),
        migrations.AddField(
            model_name='configuration',
            name='hosts',
            field=models.ManyToManyField(to='rxbackend.Host'),
        ),
        migrations.AddField(
            model_name='configuration',
            name='profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rxbackend.Profile'),
        ),
        migrations.AddField(
            model_name='capability',
            name='statetypes',
            field=models.ManyToManyField(to='rxbackend.StateType'),
        ),
    ]
