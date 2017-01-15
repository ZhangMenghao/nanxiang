#!/bin/bash
#migrate db

#below 5 cmd is to apply mysql as db
#echo "<=======install mysql=======>"
#sudo apt-get install mysql-server
#sudo apt-get install mysql-client
#sudo apt-get install libmysqlclient-dev
#sudo python ./install_resource/MySQL-python-1.2.3b1/setup.py build 
#sudo python ./install_resource/MySQL-python-1.2.3b1/setup.py install


echo "<=======install python 2.7=======>"
sudo apt-get install python
echo "<=======install python-pip=======>"
sudo apt-get install python-pip
echo "<=======install Django by pip=====>"
sudo pip install Django
echo "<======install django-cors-headers to allow options request test=====>"
pip install django-cors-headers
echo "<=======install python-dev nginx=====>"
sudo apt-get install python-dev nginx
echo "<=======install pip supervisor=====>"
sudo pip install supervisor
echo "<=======install pip gunicorn=====>"
sudo pip install gunicorn


#echo "<=======install pip uwsgi=====>"
#sudo pip install uwsgi
