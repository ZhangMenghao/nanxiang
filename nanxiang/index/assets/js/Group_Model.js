/**
 * Created by dalaoshe on 16-10-27.
 */
var Group = Backbone.Model.extend({
        // Default attributes for the user item.
        defaults: function () {
            return {
                id: "-1",
                name:"请选择组"
            };
        },
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
