#面向院系的学生工作信息系统

本项目旨在开发一套适合院系层面学生工作的信息系统，帮助提高学生工作的科学化、正规化、信息化水平。

## 如何设置开发环境

本系统使用 Python 2.7 开发，开发环境的设置步骤如下：

```
git clone git@bitbucket.org:info-system-thucst/nanxiang.git
cd nanxiang
pyvenv env
source env/bin/activate
pip install -U pip
pip install -r requirements.txt
```

测试开发
```
python manage.py runserver 0.0.0.0:8000
```


