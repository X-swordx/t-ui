(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{1102:function(e,t,l){"use strict";l.r(t);var a={name:"dhFormDemo",data:function(){return{formOpts:{ref:null,formData:{account:null,password:null,name:null,sex:null,hobby:[],phone:null,qq:null,accountType:null,email:null,desc:null,number:null,status:null},fieldList:[{label:"账号",value:"account",type:"input",comp:"el-input",event:"account"},{label:"密码",value:"password",type:"password",comp:"el-input"},{label:"昵称",value:"name",type:"input",comp:"el-input",isTrim:!0},{label:"性别",value:"sex",type:"select-arr",comp:"el-select",list:"sexList",bind:{disabled:!1},arrLabel:"key",arrKey:"value"},{label:"平台用户",value:"accountType",type:"select-obj",comp:"el-select",list:"accountTypeList",childSlotName:"accountType"},{label:"状态",value:"status",type:"select-arr",list:"statusList",comp:"el-select",arrLabel:"key",arrKey:"value"},{label:"爱好",value:"hobby",type:"checkbox",comp:"el-checkbox-group",list:"hobbyList",event:"checkbox"},{label:"手机号码",value:"phone",type:"input",comp:"el-input",bind:{maxlength:11}},{label:"QQ",value:"qq",type:"input",comp:"el-input"},{label:"邮箱",value:"email",type:"input",comp:"el-input"},{label:"计数器",value:"number",type:"inputNumber",bind:{controls:!1,min:2,max:99},comp:"el-input-number"},{label:"描述",value:"desc",type:"textarea",comp:"el-input",widthSize:1}],operatorList:[{label:"提交",type:"danger",fun:this.submitForm},{label:"重置",type:"primary",fun:this.resetForm}],listTypeInfo:{hobbyList:[{label:"吉他",value:"0"},{label:"看书",value:"1"},{label:"美剧",value:"2"},{label:"旅游",value:"3"},{label:"音乐",value:"4"}],sexList:[{key:"女",value:1},{key:"男",value:0}],accountTypeList:{0:"手机用户",1:"论坛用户",2:"平台用户"},statusList:[{key:"启用",value:1},{key:"停用",value:0}]}}}},methods:{handleEvent:function(e,t){switch(e){case"checkbox":console.log("handleEvent事件监听".concat(e,"："),t,e)}},submitForm:function(){var e=this;this.formOpts.ref.validate((function(t){t&&console.log("最终数据",e.formOpts.formData)}))},resetForm:function(){Object.assign(this.$data.formOpts.formData,this.$options.data().formOpts.formData)}}},n=l(10),o=Object(n.a)(a,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"dh-form-demo"},[l("t-form",{attrs:{"ref-obj":e.formOpts.ref,formOpts:e.formOpts,widthSize:1},on:{"update:refObj":function(t){return e.$set(e.formOpts,"ref",t)},"update:ref-obj":function(t){return e.$set(e.formOpts,"ref",t)},handleEvent:e.handleEvent}})],1)}),[],!1,null,null,null);t.default=o.exports}}]);