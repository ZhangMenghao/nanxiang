/**
 * Created by dalaoshe on 16-10-21.
 */

var msg_list = new MessageList;

/*
 分页栏Tab对象
 */
var Tab = Backbone.Model.extend({
    defaults: function () {
        return {
            id: '0'
        };
    }
});
/*
 展示项
 */
var ItemView = Backbone.View.extend({
    tagName: "tr",
    msg_template: _.template($('#message-item-template').html()),
    type: "",

    initialize: function () {

    },
    // Re-render the message item
    render: function () {
        if (this.type == 'message')
            this.$el.html(this.msg_template(this.model.toJSON()));
        return this;
    }
});
/*
 展示表
 */
var TableView = Backbone.View.extend({
    tagName: 'div',
    id: 'table_container',
    className: 'table-responsive',
    tableTemplate: _.template($('#table-template').html()),
    messageTemplate: _.template($('#message-table-template').html()),
    tabTemplate: _.template($('#table-tab-template').html()),
    events: {
        "click .tab_index": "change"
    },
    initialize: function () {
        this.$el.html(this.tableTemplate());
        this.header = this.$("#table_header");
        this.body = this.$('#table_body');
        this.tab = this.$('#table_tab');
        this.initHeader();
        this.bindListener();
        this.fetchData();
        this.resetTable();
    },
    /*
     子类重写，初始化表头
     */
    initHeader: function () {
    },
    /*
     子类重写，建立collection与render的绑定关系
     */
    bindListener: function () {
    },
    /*
     子类重写，获取数据
     */
    fetchData: function () {
    },
    /*
     重新渲染分页栏
     */
    resetTab: function () {
        this.tab.html('');
        var i = 1;
        var tab = new Tab({id: '<<'});
        var s = this.tabTemplate(tab.toJSON());
        this.tab.append(s);
        for (i; i <= this.pageNum; ++i) {
            var tab = new Tab({id: i});
            var s = this.tabTemplate(tab.toJSON());
            this.tab.append(s);
        }
        var tab = new Tab({id: '>>'});
        var s = this.tabTemplate(tab.toJSON());
        this.tab.append(s);
    },

    /*
     子类重写，重新设置表的分页数和page参数并重新绘制表格
     */
    resetTable: function () {
    },
    /*
     响应分页栏点击，切换到对应的分页
     */
    change: function (e) {
        var index = e.target.id;
        if (index == '<<') {
            if (this.pageId >0 )
                this.pageId -= 1;
            else {
                alert("已经是第一页了");
            }
        }
        else if (index == '>>') {
            if (this.pageId + 1 < this.pageNum ) {
                this.pageId += 1;
            }
            else {
                alert("没有更多了");
            }
        }
        else if (index != '>>' && index != '<<') {
            this.pageId = index - 1;
        }
        this.render();
    }
});
/*
  谈话记录表
 */
var MessageTableView = TableView.extend({
    list: msg_list,

    initHeader: function () {
        this.header.html(this.messageTemplate());
    },
    bindListener: function () {
        this.listenTo(this.list, 'add', this.resetTable);
        this.listenTo(this.list, 'reset', this.resetTable);
    },
    fetchData: function () {
        this.list.fetchAllMessageList();
    },
    setList: function (list) {
        this.list = list;
        this.resetTable();
    },
    resetTable: function () {
        this.pageId = 0;
        this.pageSize = 20;
        this.pageNum = Math.floor(this.list.length / this.pageSize);
        if (this.list.length % this.pageSize != 0) this.pageNum++;
        this.resetTab();
        this.render();
        //alert(1);
    },

    render: function () {
        this.body.html('');
        /*
         填充对应页的item
         */
        //this.list.comparator = 'title';
        var i = this.pageId * this.pageSize;
        var num = 1;

        //alert(msg_list.at(1));
        for (i; i < this.list.length; ++i) {

            if (num > this.pageSize) break;
            var msg = this.list.at(i);
            var view = new ItemView({model: msg});
            view.type = "message";
            this.body.append(view.render().el);
            num++;
        }

        return this;
    },
});

var AppView = Backbone.View.extend({
        el: $("#create_talk"),
        // Delegated events for creating new items, and clearing completed ones.
        talk_record_template: _.template($('#talk-record-template').html()),
        events: {
            "click #modify_btn": "modify"
        },
        initialize: function () {
            this.model = new Message();
            this.r_list = new MessageList();
            this.rid = 0;
            this.render();
            this.listenTo(this.r_list, 'add', this.modelchange);
            this.listenTo(this.r_list, 'reset', this.modelchange);
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        modelchange: function () {
            this.model = this.r_list.at(0)

            this.render();
        },
        render: function () {
            this.$("#talk_table").html(this.talk_record_template(this.model.toJSON()));
            return this;
        },
        updateModel:function (rid) {
            this.rid = rid;
            this.r_list.getRecord(rid);
        },
        modify: function () {
            var message = new Message;
            message.set({
                rid: this.rid,
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
            message.modifyRecord();

        }
});

var ManageView = Backbone.View.extend({
    el: $("#main_container"),
    events: {
        "click .check_record_btn": "checkRecord"
    },
    checkRecord: function (e) {
        var rid = e.target.id;

        this.$("#list_container").html("");
        this.render();
        document.getElementById("create_talk").style.display="inline";
        var App = new AppView;
        App.updateModel(rid);


    },
    initialize: function () {
        this.title = this.$("#list_header");
        this.tab_view = new MessageTableView;
        this.$("#list_container").append(this.tab_view.render().el);
        this.title.html("谈话记录");
         document.getElementById("create_talk").style.display="none";
    },
    render: function () {

    }

});

var mainview = new ManageView;

function sort_time(){
    var sort_list = mainview.tab_view.list.models;

    sort_list.sort(function (a,b) {
       // alert(a.get('params').get('group'));
        return a.get('time')<b.get('time');
    });
    //sort_list.sort(sortNumber);
    mainview.tab_view.list.models = sort_list;
    //alert(1);
    mainview.tab_view.setList(mainview.tab_view.list);
    //mainview.toMessage;

};

