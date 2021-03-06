/**
 * Created by dalaoshe on 16-10-19.
 */
    // User Model
var User = Backbone.Model.extend({
        // Default attributes for the user item.
        defaults: function () {
            return {
                /*
                used for login and receive push
                 */
                username: "",
                password:"",
                priviledge:2,
                real_name:"",
                id_number:"",
                uid:"",
                in_group:false
            };
        },
        validate: function (attrs, options) {
            if (attrs.end < attrs.start) {
                alert("can't end before it starts")
                return "can't end before it starts";
            }
        },
        register: function () {
            this.urlRoot = rootURL + "register/";
            this.save(null, {
                success: function (data) {
                    if (data.get('status') == SUCCESS) {
                        alert('注册成功！页面将自动跳转');
                        if(data.get('message') == TEACHER)
                            window.location.href = "middle.html";
                    }
                    else {
                        if (data.get('message') == HAS_LOGINED) {
                            alert('您已经登录了');
                            window.location.href = "middle.html";
                        }
                        else {
                            alert('注册失败！');
                        }
                    }
                },
                error: function (data) {
                    alert('未知错误 请求失败' + rootURL);
                }
            })
        },
        login: function () {
            this.urlRoot = rootURL + "login/";
            this.save(null, {
                success: function (data) {
                    if (data.get('status') == SUCCESS) {
                        alert('登录成功！');
                        setCookie("username",data.get('username'));
                        setCookie("privilege",data.get('privilege'));
                        window.location.href = "middle.html";
                    }
                    else {
                        if (data.get('message') == HAS_LOGINED) {
                            alert('您已经登录了');
                            window.location.href = "middle.html";
                        }
                        else {
                            alert('帐号密码错误');
                        }
                    }
                },
                error: function (data) {
                    alert('未知错误 请求失败'+ rootURL);
                }
            })
        },
        logout: function () {
            this.urlRoot = rootURL + "logout/";
            this.save(null, {
                success: function (data) {
                    if (data.get('status') == SUCCESS) {
                        delCookie("username");
                        delCookie("privilege");
                        alert('退出成功！');
                    }
                    else {
                        alert('您尚未登录！');
                    }
                    window.location.href = "index.html";
                }
            })
        },
        leaveGroup: function (uid,gid) {
            this.urlRoot = rootURL + "managegroup/?uid="+uid+"&gid="+gid+"&action=leave";
            this.fetch({
                success: function (data) {
                    if (data.get('status') == SUCCESS) {
                        // alert('123');
                        // alert('删除成功！');
                    }
                    else {
                        // alert(data.get('message'));
                    }
                }
            })
        },
        addGroup: function (uid,gid) {
            this.urlRoot = rootURL + "managegroup/?uid="+uid+"&gid="+gid+"&action=add";
            this.fetch({
                success: function (data) {
                    if (data.get('status') == SUCCESS) {
                        // alert('234');
                        // alert('加入成功！');

                    }
                    else {

                    }
                }
            })
        },
        fetchBasicInfo: function() {
            this.urlRoot = rootURL + "fetchBasicInfo/"
            this.fetch({
                success: function (data) {
                    if (data.get('status') == SUCCESS) {
                        // alert('234');
                        // alert('加入成功！');
                        $("#info_button").html(data.get('username'));
                    }
                    else {
                        $("#info_button").html(data.get(NEVER_LOGINED));
                    }
                }
            })
        },
        parse:function (response) {
             if(!response.user)
                 return response;
             if(response)
             return response.user;
        }
    });

var Userlist = Backbone.Collection.extend({
    model: User,
    url:rootURL,
    parse: function (response) {
        var json = eval('(' + response.users_list + ')');
       // console.dir(json);
       // alert(1);
        return json;
    },
    fetchAllStudent: function (gid) {
        this.url = rootURL + "fetchuser/?mode=0&gid=" + gid;
        this.fetch({
            success: function (collection, resp) {
                //console.dir(collection);
            },
            error: function () {
                alert('error');
            }
        });
    },
    fetchAllTeacher: function (gid) {
        this.url = rootURL + "fetchuser/?mode=1&gid=" + gid;
        this.fetch({
            success: function (collection, resp) {
                //console.dir(collection);
            },
            error: function () {
                alert('error');
            }
        });
    },
    fetchAllTeacherAndStudentInGroup: function (gid) {
        this.url = rootURL + "fetchuser/?mode=2&gid=" + gid;
        this.fetch({
            success: function (collection, resp) {
                //console.dir(collection);
            },
            error: function () {
                alert('error');
            }
        });
    }
});
function setCookie(name,value)
{
var Days = 30;
var exp = new Date();
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    }
  }
return ""
}

function delCookie(name)
{
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=getCookie(name);
if(cval!=null)
document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}