
$(function () {
    var AppView = Backbone.View.extend({
        el: $("#create_talk"),
        // Delegated events for creating new items, and clearing completed ones.
        talk_record_template: _.template($('#talk-record-template').html()),
        events: {
            "click #create_btn": "create"
        },
        initialize: function () {
            this.model = new Message();
            this.render();
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function () {
            this.$("#talk_table").html(this.talk_record_template(this.model.toJSON()));
            return this;
        },
        create: function () {
            var message = new Message;
            message.set({
                tid: 0,
                sid: 0,

                //学生基本信息
                student_name: this.$("#student_name").val(),
                student_sex: this.$("#student_sex").val(),
                student_class: this.$("#student_class").val(),

                student_id: this.$("#student_id").val(),
                student_policy_role: this.$("#student_policy_role").val(),
                student_nation: this.$("#student_nation").val(),

                student_dorm_address: this.$("#student_dorm_address").val(),
                student_phonenumber: this.$("#student_phonenumber").val(),
                student_dorm_phonenumber: this.$("#student_dorm_phonenumber").val(),
                student_home_address: this.$("#student_home_address").val(),
                student_home_phonenumber: this.$("#student_home_phonenumber").val(),
                student_email: this.$("#student_email").val(),


                //学生基本状况

                student_home_situation: this.$("#student_home_situation").val(),
                student_study_situation: this.$("#student_study_situation").val(),
                student_thought_situation: this.$("#student_thought_situation").val(),
                student_live_situation: this.$("#student_live_situation").val(),
                student_society_situation: this.$("#student_society_situation").val(),


                //谈话人基本信息

                teacher_name: this.$("#teacher_name").val(),
                talk_time: this.$("#talk_time").val(),

                talk_place: this.$("#talk_place").val(),


                //谈话内容
                content: this.$("#content").val(),
                recommend: this.$("#recommend").val()

            });

            message.createRecord();


        }
    });
    // Finally, we kick things off by creating the **App**.
    var App = new AppView;
});


  
