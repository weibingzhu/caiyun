(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"9/F7":function(t,e,n){},EhOQ:function(t,e,n){"use strict";var a=n("9/F7");n.n(a).a},IJFh:function(t,e,n){"use strict";var a=n("6ZY3"),i=n.n(a),s=n("bS4n"),l=n.n(s),o={mixins:[n("RqEg").a],methods:{render:function(){var t=this.option.series.map(function(t){return l()({type:"pie",radius:"55%",center:["50%","40%"]},t)});this.$$chart.setOption({tooltip:i()({trigger:"item",formatter:"{b} : {c}%"},this.option.tooltip),legend:l()({orient:"horizontal",x:"left",y:"bottom"},this.option.legend),color:this.option.color,calculable:!0,toolbox:{show:!0},series:t})}}},r=n("VRG8"),c=Object(r.a)(o,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"chart-pie"})},[],!1,null,null,null);e.a=c.exports},RqEg:function(t,e,n){"use strict";e.a={props:{theme:{type:String,default:"shine"},option:{type:Object}},watch:{option:function(t){t&&(this.$$chart?(this.$$chart.clear(),this.$nextTick(this.render)):this.initChart())}},mounted:function(){this.option&&this.initChart(),window.addEventListener("resize",this.handleResize)},beforeDestroy:function(){window.removeEventListener("resize",this.handleResize),this.$$chart&&this.$$chart.dispose&&this.$$chart.dispose(),this.$$chart=null},methods:{handleResize:function(){this.$$chart&&this.$$chart.resize&&this.$$chart.resize()},initChart:function(){var t=this;n.e(1).then(n.t.bind(null,"XD0E",7)).then(function(e){Promise.all([n.e(1),n.e(10)]).then(n.t.bind(null,"1CKb",7)).then(function(n){t.option&&(t.$$chart=e.default.init(t.$el,t.theme),t.render())})})},render:function(){this.$$chart.setOption(this.option)}}}},c28F:function(t,e,n){"use strict";n.r(e);var a=n("bS4n"),i=n.n(a),s={mixins:[n("RqEg").a],methods:{render:function(){if(this.option){var t=i()({tooltip:{trigger:"axis"},calculable:!0,yAxis:{type:"value"},grid:{left:"1%",right:"1%",bottom:"3%",top:"3%",containLabel:!0}},this.option);this.$$chart.setOption(t)}}}},l=n("VRG8"),o={components:{PolylineChart:Object(l.a)(s,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"chart-polyline"})},[],!1,null,null,null).exports,PieChart:n("IJFh").a},data:function(){for(var t=[],e=[],n=new Date,a=0;a<8;a++)t.push(new Date(n.getTime()+864e5*a).toLocaleDateString()),e.push(1e3*(a+1));return{chart:{option1:{xAxis:{type:"category",boundaryGap:!1,data:t},series:[{data:e,type:"line",smooth:!0,itemStyle:{normal:{color:"rgb(50, 193, 202)",lineStyle:{color:"rgb(50, 193, 202)"}}},areaStyle:{color:"rgba(50, 193, 202,0.2)"}}]},option2:{legend:{data:["东门(10%)","北门(40%)","南门(30%)","西门(20%)"]},series:[{type:"pie",radius:["56%","70%"],avoidLabelOverlap:!1,label:{normal:{show:!1,position:"center"}},data:[{value:10,name:"东门(10%)",itemStyle:{color:"rgba(247, 111, 134, 1)"}},{value:40,name:"北门(40%)",itemStyle:{color:"rgba(94, 178, 237, 1)"}},{value:30,name:"南门(30%)",itemStyle:{color:"rgba(42, 209, 172, 1)"}},{value:20,name:"西门(20%)",itemStyle:{color:"rgba(14, 104, 164, 1)"}}]}]}}}}},r=(n("EhOQ"),Object(l.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"console"},[n("h2",[t._v("优居美家物业服务有限责任公司（小区名称：深圳市东方天城）")]),t._v(" "),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:17}},[n("el-row",{staticClass:"statis-box",attrs:{gutter:16}},[n("el-col",{attrs:{span:6}},[n("div",{staticClass:"statis-item"},[t._v("\n            常住人口数："),n("br"),t._v(" "),n("em",[t._v("200000")])])]),t._v(" "),n("el-col",{attrs:{span:6}},[n("div",{staticClass:"statis-item"},[t._v("\n            总住户数："),n("br"),t._v(" "),n("em",[t._v("20000")])])]),t._v(" "),n("el-col",{attrs:{span:6}},[n("div",{staticClass:"statis-item"},[t._v("\n            总面积（平方米）："),n("br"),t._v(" "),n("em",[t._v("3000")])])]),t._v(" "),n("el-col",{attrs:{span:6}},[n("div",{staticClass:"statis-item"},[t._v("\n            车辆车位："),n("br"),t._v(" "),n("em",[t._v("20/30000")])])])],1)],1),t._v(" "),n("el-col",{attrs:{span:7}},[n("e-section",{staticClass:"weather"},[n("el-row",{attrs:{gutter:20}},[n("el-col",{staticClass:"tr",attrs:{span:12}},[n("img",{staticStyle:{height:"60px"},attrs:{src:"/static/images/qi.png"}}),t._v(" 37度\n          ")]),t._v(" "),n("el-col",{attrs:{span:12}},[t._v("\n            星期一 "),n("br"),t._v("\n            2020年10月12日\n          ")])],1)],1)],1)],1),t._v(" "),n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:17}},[n("e-section",{attrs:{title:"进出记录统计"}},[n("el-select",{staticStyle:{width:"100px"},attrs:{slot:"action",size:"mini",value:"1"},slot:"action"},[n("el-option",{attrs:{label:"每周",value:"1"}}),t._v(" "),n("el-option",{attrs:{label:"每月",value:"2"}})],1),t._v(" "),n("polyline-chart",{staticStyle:{height:"285px"},attrs:{option:t.chart.option1}})],1)],1),t._v(" "),n("el-col",{attrs:{span:7}},[n("e-section",{attrs:{title:"进出记录统计"}},[n("pie-chart",{staticStyle:{height:"300px"},attrs:{option:t.chart.option2}})],1)],1)],1),t._v(" "),n("e-section",[n("el-table",{staticClass:"table-primary",attrs:{data:[{},{},{},{},{},{},{},{},{},{},{},{}]}},[n("el-table-column",{attrs:{prop:"title",label:"楼名"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          C座1栋\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"title",label:"户型"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          4户\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"title",label:"楼层数"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          32层\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"title",label:"总户数"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          128户\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"title",label:"投诉情况"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{staticClass:"danger"},[t._v("10")]),t._v("/230\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"title",label:"报修情况"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",{staticClass:"danger"},[t._v("20")]),t._v("/230\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"title",label:"欠费情况"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.$index<3?n("e-danger",[t._v("欠费")]):[t._v("\n            正常\n          ")]]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"title",label:"楼层负责人"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("a",{staticClass:"link"},[t._v("张主管")])]}}])})],1)],1)],1)},[],!1,null,null,null));e.default=r.exports}}]);