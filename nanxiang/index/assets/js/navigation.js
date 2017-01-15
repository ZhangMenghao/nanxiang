/**
 * Created by dalaoshe on 16-10-19.
 */
var NavigationView = Backbone.View.extend({
    el: $("#find_nav"),
    // Delegated events for creating new items, and clearing completed ones.
    events: {
        "click #return_btn": "return_main",
        "click #logout_btn": "logout",
        "click #manage_btn": "jump_to_manage",
        "click #sendmsge_btn": "send_message"
    },
    initialize: function () {
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function () {

    },
    logout: function () {
        var user = new User;
        user.logout();
        // alert('11');
    },
    send_message: function () {
        window.location.href = "sendmessage.html"
    },
    return_main: function () {
        window.location.href = "middle.html";
    },
    jump_to_manage: function () {
        window.location.href = "manage.html";
    }
});

var navigation = new NavigationView;
