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
                priviledge:2
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
                        if(data.get('message') == TEACHER)
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
                        alert('退出成功！');
                    }
                    else {
                        alert('您尚未登录！');
                    }
                    window.location.href = "index.html";
                }
            })
        },
    });

var Userlist = Backbone.Collection.extend({
    model: User,
    url:rootURL + "export/",
    parse: function (response) {
        var json = eval('(' + response.users_list + ')');

        return json;
    },
    fetchAllUserList:function() {
        this.url = rootURL + "export/?os_type=all&channel=all" ;
        this.fetch({
            success: function (collection, resp) {
                //console.dir(collection);
            },
            error: function () {
                alert('error');
            }
        });
    },
    fetchTargetUser:function(os_type,channel) {
        this.url = rootURL + "export/?os_type=" +os_type + "&channel=" + channel;
        this.fetch({
            success: function (collection, resp) {
                console.dir(collection);
            },
            error: function () {
                alert('error');
            }
        });
    }
});
