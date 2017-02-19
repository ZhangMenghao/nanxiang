// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){
  var MiddleView = Backbone.View.extend({
    el: $("#page-container"),
    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "click #sn": "redirectToSnow",
      "click #manage_prj": "redirectToManage",
        "click #manage_group": "redirectToManageGroup",
        "click #manage_all_group": "redirectToManageAllGroup"
    },
    initialize: function() {
        this.model = new User();
        var privilege = getCookie("privilege");
        if(privilege == "0") {//student
          $("#manage_all_group").hide();
          $("#sn").hide();
          $("#manage_prj").hide();
        }
        else if(privilege != "3") {//teacher
          $("#manage_all_group").hide();
        }
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {

    },

    redirectToManage: function () {
      window.location.href="manage.html";
    },

      redirectToManageGroup: function () {
      window.location.href="managegroup.html";
    },
      redirectToManageAllGroup: function () {
      window.location.href="group.html";
    },

    redirectToSnow: function () {
      window.location.href="createtalk.html";
    }


  });
  // Finally, we kick things off by creating the **App**.
  var middle = new MiddleView;

});


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