(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{1095:function(e,n,o){"use strict";o.r(n);var i={data:function(){return{phoneVisible:!1,personTxt:"法人",legalPhone:"13888888888"}},methods:{openDialog:function(){this.phoneVisible=!0},phoneConfirm:function(e){console.log("点击确定按钮",e),this.phoneVisible=!1},phoneHide:function(){this.phoneVisible=!1}}},t=o(10),l=Object(t.a)(i,(function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",{staticClass:"t-dialog-demo",staticStyle:{width:"100%","min-height":"100px",padding:"15px"}},[o("el-button",{attrs:{type:"danger"},on:{click:e.openDialog}},[e._v("短信验证弹窗")]),e._v(" "),o("t-phone",{attrs:{phoneVisible:e.phoneVisible,legalPhone:e.legalPhone,personTxt:e.personTxt},on:{"update:visible":e.phoneHide,phoneConfirm:e.phoneConfirm}})],1)}),[],!1,null,null,null);n.default=l.exports}}]);