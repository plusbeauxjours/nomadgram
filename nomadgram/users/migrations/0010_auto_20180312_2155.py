# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-03-12 12:55
from __future__ import unicode_literals

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_user_push_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=imagekit.models.fields.ProcessedImageField(default=1, upload_to=''),
            preserve_default=False,
        ),
    ]