"use strict";(self.webpackChunkcliennt=self.webpackChunkcliennt||[]).push([[375],{8375:function(e,r,t){t.r(r),t.d(r,{default:function(){return y}});var n=t(4165),a=t(5861),s=t(5945),i=t(5198),c=t(2791),l=t(2347),u=t(5543),o=t(8316),d=t(4183),f=t(3153),x=t(2199),m=t(8249),p=t(9555),h=["bg-pink","bg-primary","bg-thirdy"],v=["text-primary","text-light","text-primary"],b=[{text:d.e.customer,value:d.u.Customer},{text:d.e.seller,value:d.u.Seller}],j=t(184),y=function(){var e=(0,f.CG)((function(e){return e.user})),r=(0,f.CG)((function(e){return e.notification.isLoading})),t=(0,f.TL)();(0,c.useEffect)((function(){var e=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t((0,x.wt)({isLoading:!0})),e.next=4,l.b.get("".concat(u.Y,"/user/all"));case 4:r=e.sent,a=r.data,t((0,m.BA)(a)),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:return e.prev=12,t((0,x.wt)({isLoading:!1})),e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[0,9,12,15]])})));return function(){return e.apply(this,arguments)}}();e()}),[t]);var y=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(r,a){var s;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.W4.updateUser(r,{isFreeze:a});case 3:s=e.sent,s.data,t((0,m.TP)({id:r,isFreeze:a})),e.next=11;break;case 8:throw e.prev=8,e.t0=e.catch(0),e.t0;case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(r,t){return e.apply(this,arguments)}}(),g=[{title:"PP",dataIndex:"profilePicture",key:"profilePicture",render:function(r){var t=Math.floor(3*Math.random());return(0,j.jsx)("div",{className:"".concat(h[t]," w-8 h-8 rounded-full flex justify-center items-center ").concat(v[t]),children:r?(0,j.jsx)("img",{alt:"img",src:r,className:"w-8 h-8 rounded-full object-cover"}):(0,j.jsx)("span",{children:e.user.firstName.charAt(0).toUpperCase()})})}},{title:"Kullan\u0131c\u0131 Ad\u0131",dataIndex:"username",key:"username",render:function(e){return(0,j.jsx)("span",{className:"text-primary text-base font-semibold",children:e})}},{title:"Ad Soyad",dataIndex:"firstName",key:"firstName",render:function(e,r){return(0,j.jsx)("span",{className:"text-primary text-base font-semibold",children:e.concat(" ",r.lastName)})}},{title:"Mail",dataIndex:"email",key:"email",render:function(e){return(0,j.jsx)("span",{className:"text-primary",children:e})}},{title:"Hesap Tipi",dataIndex:"role",key:"role",render:function(e){return(0,j.jsx)("div",{className:"w-full flex justify-center items-center",children:(0,j.jsx)("span",{className:"text-primary w-[80px] text-center px-2 py-1 border ".concat(e===d.u.Customer?"bg-blue-200 border-blue-300 ":"bg-red-300 border-red-400"),children:d.e[e]})})},filters:b,onFilter:function(e,r){return r.role===e}},{title:"Bakiye",dataIndex:"balance",key:"balance",render:function(e){return(0,j.jsxs)("span",{className:"text-primary",children:[e," \u20ba"]})},sorter:function(e,r){return e.balance-r.balance}},{title:"",dataIndex:"actions",key:"actions",render:function(e,r){return(0,j.jsx)("div",{className:"flex flex-row",children:r.isFreeze?(0,j.jsx)("div",{onClick:function(){return y(r.id,!r.isFreeze)},className:"cursor-pointer w-6 h-6",children:(0,j.jsx)(s.Z,{title:"Hesab\u0131 Aktif Et",children:(0,j.jsx)("img",{src:o.ci.bQ,alt:"freeze"})})}):(0,j.jsx)("div",{onClick:function(){return y(r.id,!r.isFreeze)},className:"cursor-pointer w-6 h-6",children:(0,j.jsx)(s.Z,{title:"Hesab\u0131 Dondur",children:(0,j.jsx)("img",{src:o.ci.vV,alt:"freeze"})})})})}}];return r?(0,j.jsx)("div",{className:"w-full h-full flex justify-center items-center",children:(0,j.jsx)("img",{alt:"",src:o.j8.H})}):(0,j.jsx)("div",{className:"p-3",children:(0,j.jsx)("div",{className:"w-full",children:(0,j.jsx)(i.Z,{locale:{triggerAsc:"Artan S\u0131ralama",triggerDesc:"Azalan S\u0131ralama",cancelSort:"S\u0131ralamay\u0131 \u0130ptal Et",filterReset:!1,filterConfirm:"Uygula"},scroll:{x:!0},className:"w-full",columns:g,dataSource:e.allUsers})})})}}}]);
//# sourceMappingURL=375.9201fcc4.chunk.js.map