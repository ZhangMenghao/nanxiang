
jQuery(document).ready(function() {

    $('.page-container form').submit(function(){
        var username = $(this).find('.username').val();
        var password = $(this).find('.password').val();
        if(username == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '27px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.username').focus();
            });
            return false;
        }
		
        if(password == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '96px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password').focus();
            });
            return false;
        }
    });

    $('.page-container form .username, .page-container form .password').keyup(function(){
        $(this).parent().find('.error').fadeOut('fast');
    });

});
function tiao(){
     window.location.href="success.html";
}
function tiaorg(){
     window.location.href="register.html";
}
window.onload=function(){

    //登录按钮跳转
    document.getElementById('login').addEventListener("click", function() {
    var username= document.getElementById('un0').value;
    var password= document.getElementById('pw0').value;
    alert(username+" "+password);
    tiao();
    
});
    
    document.getElementById('register').addEventListener("click", function() {
    tiaorg()
});

    

}
