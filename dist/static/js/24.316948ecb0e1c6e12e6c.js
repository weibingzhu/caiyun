(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{uX2o:function(t,e,n){"use strict";n.r(e);var l=n("omC7"),a=n.n(l),r=n("bS4n"),u=n.n(r),o=function(){return n.e(23).then(n.bind(null,"BKCF"))},s=window.$mixins.popupManager.$("create",o),i=window.$mixins.popupManager.$("update",o),c={mixins:[window.$mixins.pageList,window.$mixins.popupManager],components:{CreateFormPopup:s,UpdateFormPopup:i},data:function(){return{query:this.getQuery(u()({type:"1",title:"",key_word:""},this.$route.query)),pageData:{count:0,data:[]}}},methods:{fetch:function(t){var e=this,n=JSON.parse(a()(t));return this.$axios({url:"/v1/article",params:n}).then(function(t){e.pageData=t})},handleUpdate:function(t){this.pushOpen("update",t.article_id)},handleDelete:function(t,e){var n=this;this.$confirm("确认删除此文章","提示",{type:"warning"}).then(function(){return n.$axios({url:"/v1/article/"+t.article_id,method:"DELETE",options:{context:e.target}}).then(function(){n.fetch(n.query)})})}}},p=n("VRG8"),f=Object(p.a)(c,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("create-form-popup",{attrs:{title:"创建"}}),t._v(" "),n("update-form-popup",{attrs:{title:"编辑"}}),t._v(" "),n("e-page-list-layout",[n("template",{slot:"search"},[n("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.handleTab},model:{value:t.query.type,callback:function(e){t.$set(t.query,"type",e)},expression:"query.type"}},[n("el-tab-pane",{attrs:{label:"全部",name:"1"}}),t._v(" "),n("el-tab-pane",{attrs:{label:"在职",name:"2"}}),t._v(" "),n("el-tab-pane",{attrs:{label:"离职",name:"0"}})],1),t._v(" "),n("el-form",t._b({attrs:{slot:"search"},nativeOn:{submit:function(e){return e.preventDefault(),t.handleSubmit(e)}},slot:"search"},"el-form",t.getFormProps(),!1),[n("el-form-item",{attrs:{label:"员工姓名"}},[n("el-input",{attrs:{placeholder:"请输入员工姓名"},model:{value:t.query.title,callback:function(e){t.$set(t.query,"title","string"==typeof e?e.trim():e)},expression:"query.title"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"联系电话"}},[n("el-input",{attrs:{placeholder:"请输入联系电话"},model:{value:t.query.title,callback:function(e){t.$set(t.query,"title","string"==typeof e?e.trim():e)},expression:"query.title"}})],1),t._v(" "),n("el-button",{attrs:{"native-type":"submit",size:"small"}},[t._v("搜索")]),t._v(" "),n("el-button",{attrs:{size:"small"},on:{click:function(e){return t.pushOpen("create")}}},[t._v("创建")])],1)],1),t._v(" "),n("el-table",t._g(t._b({attrs:{slot:"table",data:[{},{},{},{},{},{},{},{},{}]},slot:"table"},"el-table",t.getTableProps(),!1),t.getTableListeners()),[n("el-table-column",{attrs:{label:"员工姓名"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          江小杰\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"联系电话"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          186****030\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"部门"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          行政部门\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"职位"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          实习助理\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"月打卡率"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          80%\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"服务评级"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          5 星级\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"权 限"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          财务管理、监控管理\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.$index>3?n("e-danger",[t._v("离职")]):[t._v("\n            在职\n          ")]]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.handleUpdate(e.row,n)}}},[t._v("编辑")]),t._v(" "),n("el-button",{attrs:{type:"text"},on:{click:function(e){return t.$router.push({path:"/user/detail"})}}},[t._v("详情")])]}}])})],1)],2)],1)},[],!1,null,null,null);e.default=f.exports}}]);