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
$("#info_button").html(getCookie('username'));