/**
 * Created by dalaoshe on 16-10-21.
 */
var user_list = new Userlist;
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
    item_template: _.template($('#user-item-template').html()),
    type: "",
    id:"",
   // model:"",
    mode:0,
    gid:0,
    events: {
        "click .add_btn": "change"
    },
    initialize: function () {
        this.listenTo(this.model,"change",this.render);

    },
    // Re-render the message item
    render: function () {
        // alert("mode "+this.mode);
        // alert("in_group "+this.model.get('in_group'));
        if(this.mode == 1) {
            //只展示在分组的项
            if (this.model.get('in_group')) {
                this.$el.html(this.item_template(this.model.toJSON()));
            }
            else{
                window.location.href = "managegroup.html?gid="+this.gid;
            }
        }
        else if(this.mode == 0) {
            this.$el.html(this.item_template(this.model.toJSON()));
        }
        return this;
    },
    change: function () {
        if(this.model.get('in_group')) {
            this.model.leaveGroup(this.model.get("uid"),this.gid);
        }
        else {
            this.model.addGroup(this.model.get("uid"),this.gid);
        }
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
    userTemplate: _.template($('#user-table-template').html()),
    tabTemplate: _.template($('#table-tab-template').html()),
    events: {
        "click .tab_index": "change"
    },
    initialize: function () {
        this.$el.html(this.tableTemplate());
        this.header = this.$("#table_header");
        this.body = this.$('#table_body');
        this.tab = this.$('#table_tab');
        this.user_list = new Userlist;
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
  用户信息表
 */
var UserTableView = TableView.extend({
    list: user_list,
    mode: 0,
    gid:0,
    initHeader: function () {
        this.header.html(this.userTemplate());
    },
    bindListener: function () {
        this.listenTo(this.list, 'add', this.resetTable);
        this.listenTo(this.list, 'reset', this.resetTable);
    },
    fetchData: function () {

    },
    fetchAllStudent: function (gid) {
       // this.list.clean();
        this.list.fetchAllStudent(gid);
    },
    fetchAllTeacher: function (gid) {
      //  this.list.clean();
        this.list.fetchAllTeacher(gid);
    },
    fetchAllTeacherAndStudentInGroup: function (gid) {
      //  this.list.clean();
        this.list.fetchAllTeacherAndStudentInGroup(gid);

    },
    setList: function (list) {
      //  this.list.clean();
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
    setMode:function (mode) {
        this.mode = mode;
    },
    setGid:function (gid) {
        this.gid = gid;
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
            var user = this.list.at(i);
            var view = new ItemView({model: user});
            view.mode = this.mode;
            view.gid = this.gid;
            this.body.append(view.render().el);
            num++;
        }

        return this;
    }
});

var GroupManageView = Backbone.View.extend({
    el: $("#main_container"),
    gid: 0,
    events: {
        "click #look_up_member_btn": "displayMember",
        "click #look_up_student_btn": "displayStudent",
        "click #look_up_teacher_btn": "displayTeacher",
        "click .add_teacher_btn": "addTeacher",
        "click .delete_teacher_btn": "deleteTeacher",
        "click .add_student_btn": "addStudent",
        "click .delete_student_btn": "deleteStudent"
    },
    displayMember: function () {
        this.tab_view.setMode(1);

        this.tab_view.fetchAllTeacherAndStudentInGroup(this.gid);
    },
    displayTeacher: function () {
        this.tab_view.setMode(0);
        this.tab_view.fetchAllTeacher(this.gid);
    },
    displayStudent: function () {
        this.tab_view.setMode(0);
        this.tab_view.fetchAllStudent(this.gid);
    },
    initialize: function () {
        this.title = this.$("#list_header");
        this.tab_view = new UserTableView;
        this.gid = getParam("gid");
        this.tab_view.setMode(1);
        this.tab_view.setGid(this.gid);
        this.tab_view.fetchAllTeacherAndStudentInGroup(this.gid);
        this.$("#list_container").append(this.tab_view.render().el);
        this.title.html("小组信息");
    },
    render: function () {

    }

});

function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}

var mainview = new GroupManageView;


