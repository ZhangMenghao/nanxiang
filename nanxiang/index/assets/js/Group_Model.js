/**
 * Created by dalaoshe on 16-10-27.
 */
var Group = Backbone.Model.extend({
        // Default attributes for the user item.
        defaults: function () {
            return {
                gid: "",
                gname:""
            };
        },
        saveGroup: function () {
            this.urlRoot = rootURL + "creategroup/";
            this.save(null, {
                success: function (data) {
                    if (data.get('status') == SUCCESS) {
                        alert('创建成功！');
                    }
                    else {
                        alert(data.get('message'));
                    }
                    window.location.href = "group.html";
                }
            })
        },
        deleteGroup: function () {
            alert(22);
            this.urlRoot = rootURL + "deletegroup/";
            this.save(null, {
                success: function (data) {
                    if (data.get('status') == SUCCESS) {
                        alert('删除成功！');
                    }
                    else {
                        alert(data.get('message'));
                    }
                    window.location.href = "group.html";
                }
            })
        }
    });

var GroupList = Backbone.Collection.extend({
    model: Group,
    url:rootURL+"getgroups/",
    parse: function (response) {
        var json = eval('(' + response.group_list + ')');
        return json;
    },
    fetchAllGroupList:function() {
        this.url = rootURL+"getgroups/",
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
