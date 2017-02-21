#面向院系的学生工作信息系统

本项目旨在开发一套适合院系层面学生工作的信息系统，帮助提高学生工作的科学化、正规化、信息化水平。

## 如何设置开发环境

本系统使用 Python 2.7 django 1.11开发，开发环境的设置步骤如下：

```
git clone git@bitbucket.org:info-system-thucst/nanxiang.git
cd nanxiang
./install.sh
```

django开发入门https://andrew-liu.gitbooks.io/django-blog/content/index.html

测试开发
```
cd nanxiang
python manage.py runserver 0.0.0.0:8000
```
网站首页http://本机ip:8000/index.html
## 迁移注意事项
将nanxiang/index/assets/js/config.js里面rootURL的ip地址换成开发电脑本机ip
将nanxiang/nanxiang/settings.py里面ALLOWED_HOSTS的ip地址换成开发电脑本机ip地址

