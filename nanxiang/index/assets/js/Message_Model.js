/**
 * Created by dalaoshe on 16-10-19.
 */
var Message = Backbone.Model.extend({
    // Default attributes for the user item.
    defaults: function () {
        return {
    rid: 0,
    tid: 0,
    sid: 0,

    //学生基本信息
    student_name: '',
    student_sex: '',
    student_class:'',

    student_id: '',
    student_policy_role: '',
    student_nation:'',

    student_dorm_address:'',
    student_phonenumber:'',
    student_dorm_phonenumber:'',
    student_home_address:'',
    student_home_phonenumber:'',
    student_email:'',


    //学生基本状况

    student_home_situation:'',
    student_study_situation:'',
    student_thought_situation:'',
    student_live_situation:'',
    student_society_situation:'',


    //谈话人基本信息

    teacher_name:'',
    talk_time:'',

    talk_place:'',


    //谈话内容
    content:'',
    recommend:''
        };
    },
    validate: function (attrs, options) {
        if (attrs.end < attrs.start) {
            alert("can't end before it starts")
            return "can't end before it starts";
        }
    },
    createRecord: function () {
        this.urlRoot = rootURL + "createrecord/";
        this.save(null, {
            success: function (data) {
                if (data.get('status') == SUCCESS) {
                    alert('创建成功！');
                }
                else {
                    if (data.get('message') == DUPLICATE) {
                        alert('骚年，请不要重复发送！');
                    }
                    else if (data.get('message') == REJECTED) {
                        alert('骚年，你没有权限！');
                    }
                    else if (data.get('message') == NEVER_LOGINED){
                        alert('骚年，请先登录！');
                    }
                    else {
                        alert(data.get('message'));
                    }
                }
            }
        });
    },
    modifyRecord: function () {
        this.urlRoot = rootURL + "updaterecord/";
        this.save(null, {
            success: function (data) {
                if (data.get('status') == SUCCESS) {
                    alert('修改成功！');
                }
                else {
                    if (data.get('message') == REJECTED) {
                        alert('骚年，你没有权限！');
                    }
                    else if (data.get('message') == NEVER_LOGINED){
                        alert('骚年，请先登录！');
                    }
                    else {
                        alert(data.get('status') + "1234");
                    }
                }
            }
        });
    }
    // parse: function (response) {
    //     if(response.status == SUCCESS || response.status == ERROR)
    //         return response;
    //
    //     //this.title = response.title;
    //    // var date = new Date(response.time);
    //    // this.time = date.toLocaleString();
    //     return response;
    // }
});

var MessageList = Backbone.Collection.extend({
    model: Message,
    url:rootURL,
    parse: function (response) {
        var json = eval('(' + response.record_list + ')');
      //  console.dir(json);
        return json;
    },
    fetchAllMessageList:function() {
        this.url = rootURL + "fetchallrecord/";
        this.fetch({
            success: function (collection, resp) {
              //  console.dir("collection: ", collection);
            },
            error: function () {
               // alert('error');
            }
        });
    },
    getRecord: function (rid) {
        this.url = rootURL + "getrecord/?rid="+rid;
        this.fetch({
            success: function (collection, resp) {
               // console.dir("collection: ", collection);
            },
            error: function () {
              //  alert('error');
            }
        });
    }
});
