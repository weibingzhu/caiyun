(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"+sqD":function(t,e,n){"use strict";n.r(e);var i=n("omC7"),a=n.n(i),r=n("bS4n"),o=n.n(r),u=function(){return n.e(2).then(n.bind(null,"oR6W"))},s=window.$mixins.popupManager.$("create",u),p=window.$mixins.popupManager.$("update",u),c={mixins:[window.$mixins.pageList,window.$mixins.popupManager],components:{CreateFormPopup:s,UpdateFormPopup:p},data:function(){return{query:this.getQuery(o()({type:"1",title:"",key_word:""},this.$route.query)),pageData:{count:0,data:[]}}},methods:{fetch:function(t){var e=this,n=JSON.parse(a()(t));return this.$axios({url:"/v1/article",params:n}).then(function(t){e.pageData=t})},handleUpdate:function(t){this.pushOpen("update",t.article_id)},handleDelete:function(t,e){var n=this;this.$confirm("确认删除此文章","提示",{type:"warning"}).then(function(){return n.$axios({url:"/v1/article/"+t.article_id,method:"DELETE",options:{context:e.target}}).then(function(){n.fetch(n.query)})})}}},l=(n("//Bv"),n("VRG8")),d=Object(l.a)(c,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("create-form-popup",{attrs:{title:"创建"}}),t._v(" "),n("update-form-popup",{attrs:{title:"编辑"}}),t._v(" "),n("div",{staticClass:"watch-video"},[n("el-row",{attrs:{gutter:20}},t._l(12,function(e,i){return n("el-col",{key:i,staticStyle:{"margin-bottom":"20px"},attrs:{lg:6,md:8}},[n("e-section",{attrs:{title:"编号"+i+"监控"}},[n("div",{staticClass:"watch-video-item"},[n("span",[t._v("查看监控")])])])],1)}),1)],1)],1)},[],!1,null,null,null);e.default=d.exports},"//Bv":function(t,e,n){"use strict";var i=n("LdER");n.n(i).a},LdER:function(t,e,n){}}]);