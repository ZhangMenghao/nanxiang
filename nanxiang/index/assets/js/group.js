/**
 * Created by dalaoshe on 16-10-21.
 */
var group_list = new GroupList;
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
    item_template: _.template($('#group-item-template').html()),
    type: "",
    events: {
        "click .manage_group_btn": "toManage",
        "click .delete_group_btn": "deleteGroup"
    },
    initialize: function () {
        this.listenTo(this.model,"change",this.render);
    },
    // Re-render the message item
    render: function () {
        this.$el.html(this.item_template(this.model.toJSON()));
        return this;
    },
    toManage: function () {
        window.location.href = "managegroup.html?gid="+this.model.get('gid');
    },
    deleteGroup: function (e) {
        //alert(123);
        var gid = e.target.id;
        //alert(gid);
        var group = new Group;
        group.set({
            gid: gid
        });
        group.deleteGroup();

        //window.location.href = "managegroup.html?gid="+this.model.get('gid');
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
    groupTemplate: _.template($('#group-table-template').html()),
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
  用户信息表
 */
var GroupTableView = TableView.extend({
    list: group_list,
    initHeader: function () {
        this.header.html(this.groupTemplate());
    },
    bindListener: function () {
        this.listenTo(this.list, 'add', this.resetTable);
        this.listenTo(this.list, 'reset', this.resetTable);
    },
    fetchData: function () {
        this.list.fetchAllGroupList();
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
            var group = this.list.at(i);
            var view = new ItemView({model: group});
            this.body.append(view.render().el);
            num++;
        }

        return this;
    }
});

var GroupManageView = Backbone.View.extend({
    el: $("#main_container"),
    events: {
        "click #create_group_btn": "createGroup"
    },
    initialize: function () {
        this.title = this.$("#list_header");
        this.tab_view = new GroupTableView;
        this.$("#list_container").append(this.tab_view.render().el);
        this.title.html("小组管理");
    },
    render: function () {

    },
    createGroup: function () {
        var group = new Group;
        group.set({
            gname: this.$("#gname_input").val()
        })
        group.saveGroup();
    }

});

var mainview = new GroupManageView;


