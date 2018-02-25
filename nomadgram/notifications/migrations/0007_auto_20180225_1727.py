# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-02-25 08:27
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0006_auto_20171219_2351'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='image',
            field=models.ForeignKey(blank=True, default=11, on_delete=django.db.models.deletion.CASCADE, to='images.Image'),
            preserve_default=False,
        ),
    ]
