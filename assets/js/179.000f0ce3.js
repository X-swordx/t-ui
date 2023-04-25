(window.webpackJsonp=window.webpackJsonp||[]).push([[179],{1249:function(e,t,n){"use strict";n.r(t);var r=n(10),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"vue-项目-菜单权限及按钮级权限控制"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vue-项目-菜单权限及按钮级权限控制"}},[e._v("#")]),e._v(" Vue 项目 菜单权限及按钮级权限控制")]),e._v(" "),n("h3",{attrs:{id:"实现思路"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#实现思路"}},[e._v("#")]),e._v(" 实现思路")]),e._v(" "),n("p",[e._v("1.页面展示需要鉴权的所有按钮，需要先鉴权菜单权限的显示与隐藏。")]),e._v(" "),n("p",[e._v("2.勾选每个角色或者用户所能看的权限保存在数据库。该权限数据是一个权限字段的数组。")]),e._v(" "),n("p",[e._v("3.全局自定义指令（directive）控制按钮权限数据的方法，登入时获取后端传来的按钮权限数组。")]),e._v(" "),n("p",[e._v("4.在每个按钮中调用该指令，并传入该操作的权限字段和后端保存的权限字段进行匹配，能匹配则该操作按钮可显示")]),e._v(" "),n("h3",{attrs:{id:"具体代码如下"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#具体代码如下"}},[e._v("#")]),e._v(" 具体代码如下")]),e._v(" "),n("ol",[n("li",[n("strong",[e._v("获取登录用户所有权限")])])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("// 获取权限菜单(存在store下modules下user.js的actions中)\n getMenuTree ({ commit, state }) {\n   return new Promise((resolve, reject) => {\n     getMenuTree(state.token).then(response => {\n       const data = response.result\n       if (!data) {\n         reject('验证失败，请重新登录')\n       }\n       // 存菜单结构\n       commit('SET_ROLES', data)\n       // 重置按钮权限\n       btns = []\n       const btn = findAllBtn(data)\n       // 存所有按钮权限\n       commit('SET_BUTTONS', btn)\n       resolve(data)\n     }).catch(error => {\n       reject(error)\n     })\n   })\n }\n// 递归获取按钮list\nlet btns = []\nexport function findAllBtn (list) {\n list.forEach(val => {\n // 与后台协商所有菜单资源（resCode)下的type是1表菜单，2为按钮\n   if (val.type === '1') {\n     if (val.children && val.children.length > 0) {\n       findAllBtn(val.children)\n     }\n   } else {\n     btns.push(val.reCode)\n   }\n })\n}\n")])])]),n("ol",{attrs:{start:"2"}},[n("li",[n("strong",[e._v("对比菜单权限的方法")])])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("在store下modules下新建一个permission.js(获取最终动态权限菜单）\n/**\n* @param  {Array} userRouter 后台返回的用户权限json\n* @param  {Array} allRouter  前端配置好的所有动态路由的集合\n* @return {Array} realRoutes 过滤后的路由\n*/\nexport function recursionRouter (userRouter = [], allRouter = []) {\n let realRoutes = []\n allRouter.forEach(val => {\n   userRouter.forEach(item => {\n     if (val.path.includes('/')) {\n       if (item.resCode === val.path.split('/')[1]) {\n         val.children = recursionRouter(item.children, val.children)\n         realRoutes.push(val)\n       }\n     } else {\n       if (item.resCode === val.path) {\n         if (item.children && item.children.length > 0) {\n           val.children = recursionRouter(item.children, val.children)\n         }\n         realRoutes.push(val)\n       }\n     }\n   })\n })\n realRoutes.push({ path: '*', redirect: '/404', isShow: true })\n // console.log(222, realRoutes)\n return realRoutes\n}\n// asyncRouterMap本地配置好的所有动态路由的集合\nconst actions = {\n generateRoutes ({ commit }, roles) {\n   return new Promise(resolve => {\n     let accessedRoutes = recursionRouter(roles, [...asyncRouterMap])\n     commit('SET_ROUTES', accessedRoutes)\n     resolve(accessedRoutes)\n   })\n }\n}\n")])])]),n("p",[e._v("对比菜单权限需要在全局路由守卫中如下操作")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("router.beforeEach(async (to, from, next) => {\n // 确定用户是否已登录\n const hasToken = getToken()\n // 判断是否有token\n if (hasToken) {\n   // 运营端登录\n   if (to.path === '/login') {\n     // 如果已登录，则重定向到主页\n     next({ path: '/' })\n     NProgress.done()\n   } else {\n     // 确定用户是否已获得了他的权限角色\n     const hasRoles = store.getters.roles && store.getters.roles.length > 0\n     if (hasRoles) {\n       next()\n     } else {\n       // 角色必须是对象数组\n       const roles = await store.dispatch('user/getMenuTree')\n         // 根据角色生成可访问路由映射\n         const accessRoutes = await store.dispatch('permission/generateRoutes', roles)\n         // 清空静态路由\n         resetRouter()\n         // 动态添加可访问路由\n         router.addRoutes(accessRoutes)\n         // hack 方法，以确保addRoutes是完整的\n         // 设置replace: true，这样导航就不会留下历史记录\n         next({ ...to, replace: true })\n     }\n   }\n } else {\n   // 在免登录白名单，直接进入\n   if (whiteList.indexOf(to.path) !== -1) {\n     next()\n   } else {\n     // 没有访问权限的其他页面被重定向到登录页面\n     next(`/login?redirect=${to.path}`)\n     NProgress.done()\n   }\n }\n})\n")])])]),n("ol",{attrs:{start:"3"}},[n("li",[n("strong",[e._v("全局自定义指令")])])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("// 需要全局注入（即在main.js引入）\nimport Vue from 'vue'\nimport store from '@/store'\n/**\n * 使用：v-permission=\"'resCode'\"\n *   resCode 按钮资源（即路由path）\n * **/\nVue.directive('permission', {\n  inserted (el, vDir) {\n    let btnPermission = store.getters.buttons\n    if (vDir.value) {\n      if (!btnPermission.includes(vDir.value)) {\n        el.parentNode.removeChild(el)\n      }\n    }\n  }\n})\n")])])]),n("ol",{attrs:{start:"4"}},[n("li",[n("strong",[e._v("页面中使用")])])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('<el-button type="primary" @click="roleExport" v-permission="\'ent-role-export\'">导出</el-button>\n')])])]),n("h3",{attrs:{id:"如图"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#如图"}},[e._v("#")]),e._v(" 如图")]),e._v(" "),n("p",[e._v("初始"),n("img",{attrs:{src:"https://img-blog.csdnimg.cn/2020062411591456.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N3aW44OTUx,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}}),e._v("\n取消权限后\n"),n("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200624120202117.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N3aW44OTUx,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}}),e._v(" "),n("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200624120249906.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N3aW44OTUx,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}})]),e._v(" "),n("hr"),e._v(" "),n("h3",{attrs:{id:"相关文章"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#相关文章"}},[e._v("#")]),e._v(" 相关文章")]),e._v(" "),n("p",[n("a",{attrs:{href:"https://blog.csdn.net/cwin8951/article/details/104479606",target:"_blank",rel:"noopener noreferrer"}},[e._v("基于elementUI中table组件二次封装（Vue项目）"),n("OutboundLink")],1)]),e._v(" "),n("hr"),e._v(" "),n("p",[n("a",{attrs:{href:"https://blog.csdn.net/cwin8951/article/details/104415090",target:"_blank",rel:"noopener noreferrer"}},[e._v("axios二次封装，接口统一存放,满足RESTful风格"),n("OutboundLink")],1)]),e._v(" "),n("hr"),e._v(" "),n("p",[n("a",{attrs:{href:"https://blog.csdn.net/cwin8951/article/details/106644118",target:"_blank",rel:"noopener noreferrer"}},[e._v("keep-alive不能缓存多层级路由(vue-router)菜单问题解决"),n("OutboundLink")],1)]),e._v(" "),n("hr"),e._v(" "),n("p",[n("a",{attrs:{href:"https://wocwin.github.io/blog/",target:"_blank",rel:"noopener noreferrer"}},[e._v("基于ElementUi再次封装基础组件文档"),n("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=s.exports}}]);