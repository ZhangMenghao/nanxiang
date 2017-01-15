// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){
  var user = new User;
  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({
    el: $(".page-container"),
    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "click #register": "redirectToRegister",
      "click #login": "login",
      "onchange #un0": "usernameChange",
      "onblur #pw0": "passwordChange",
    },
    initialize: function() {
        this.model = new User();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {

    },

    usernameChange: function() {
        var username = this.$("#un0").val();
        user.set({
          username: username
        });
    },

    passwordChange: function() {
        var password = this.$("#pw0").val();
        user.set({
          password: password
        });
    },

    login: function () {
        var password = this.$("#pw0").val();
        user.set({
          password: password
        });

        var username = this.$("#un0").val();
        user.set({
          username: username
        });

        user.login();     
        
    },

    redirectToRegister: function () {
      window.location.href="register.html";
    }

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;
});
