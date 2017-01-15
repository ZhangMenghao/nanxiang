#!/bin/bash
#sudo cp settings.py YunbaiduYouknow_Web/settings.py
sudo python manage.py makemigrations
sudo python manage.py migrate
sudo python manage.py runserver 0.0.0.0:8000
