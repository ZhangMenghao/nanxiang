// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){
  var MiddleView = Backbone.View.extend({
    el: $("#page-container"),
    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "click #sn": "redirectToSnow",
      "click #manage_prj": "redirectToManage",
    },
    initialize: function() {
        this.model = new User();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {

    },

    redirectToManage: function () {
      window.location.href="manage.html";
    },

    redirectToSnow: function () {
      window.location.href="createtalk.html";
    }


  });
  // Finally, we kick things off by creating the **App**.
  var middle = new MiddleView;

});
