// Load the application once the DOM is ready, using `jQuery.ready`:
$(function () {
    var user = new User;
    // Our overall **AppView** is the top-level piece of UI.
    var AppView = Backbone.View.extend({
        el: $(".page-container"),
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "click #register_btn": "register",
        },

        initialize: function () {
            this.model = new User();
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function () {

        },

        validateUsername: function () {
            var username = this.$("#un0").val();
            user.set({
                username: username
            });
        },

        validatePassword: function () {
            var password = this.$("#pw0").val();
            user.set({
                password: password
            });
        },

        register: function () {

            var pw0 = this.$("#pw0").val();
            var pw1 = this.$("#pw1").val();
            if(pw0 != pw1) {
                alert('两次密码不一致！');
                return;
            }

            user.set({
                password: pw0
            });

            var username = this.$("#un0").val();
            user.set({
                username: username
            });

            user.set({
                priviledge: parseInt(this.$("#pri").val())
            });
            user.register();
        }

    });

    // Finally, we kick things off by creating the **App**.
    var App = new AppView;
});
