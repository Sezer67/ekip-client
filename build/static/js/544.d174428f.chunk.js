(self.webpackChunkcliennt=self.webpackChunkcliennt||[]).push([[544],{6544:function(e,t,a){"use strict";a.r(t);var r=a(4165),n=a(5861),l=a(9439),s=a(1666),o=a(7309),i=a(5198),c=a(266),u=a(2426),d=a.n(u),f=a(2791),m=a(8316),h=a(3153),p=a(2199),x=a(9555),y=a(184);t.default=function(){var e=(0,f.useState)([]),t=(0,l.Z)(e,2),a=t[0],u=t[1],Y=(0,f.useState)({sellerNames:[],customerNames:[]}),g=(0,l.Z)(Y,2),v=g[0],D=g[1],w=(0,f.useState)({startDate:new Date,endDate:new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate())}),k=(0,l.Z)(w,2),S=k[0],j=k[1],P=(0,h.CG)((function(e){return e.notification.isLoading})),I=(0,h.TL)(),M=function(){var e=(0,n.Z)((0,r.Z)().mark((function e(){var t,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,I((0,p.wt)({isLoading:!0})),e.next=4,x._7.getAllSalesByDate(S);case 4:t=e.sent,a=t.data,u(a),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:return e.prev=12,I((0,p.wt)({isLoading:!1})),e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[0,9,12,15]])})));return function(){return e.apply(this,arguments)}}();(0,f.useEffect)((function(){M()}),[]),(0,f.useEffect)((function(){var e=[],t=[];a.forEach((function(a){var r=e.find((function(e){return e.text===a.ownerId.username})),n=t.find((function(e){return e.text===a.customerId.username}));r||e.push({text:a.ownerId.username,value:a.ownerId.username}),n||t.push({text:a.customerId.username,value:a.customerId.username})})),D({customerNames:t,sellerNames:e})}),[a]);if(P)return(0,y.jsx)("div",{className:"w-full h-full flex justify-center items-center",children:(0,y.jsx)("img",{alt:"",src:m.j8.H})});var _=[{title:"Sat\u0131c\u0131",dataIndex:"ownerId",key:"ownerId",filters:v.sellerNames,onFilter:function(e,t){return t.ownerId.username===e},render:function(e){return(0,y.jsx)("span",{children:e.username})}},{title:"M\xfc\u015fteri",dataIndex:"customerId",key:"customerId",filters:v.customerNames,onFilter:function(e,t){return t.customerId.username===e},render:function(e){return(0,y.jsx)("span",{children:e.username})}},{title:"\xdcr\xfcn Ad\u0131",dataIndex:"productId",key:"productId",render:function(e){return(0,y.jsx)("span",{children:e.name})}},{title:"Gelir",dataIndex:"totalPrice",key:"totalPrice",sorter:function(e,t){return e.totalPrice-t.totalPrice},render:function(e){return(0,y.jsxs)("span",{children:[e," \u20ba"]})}},{title:"Tarih",dataIndex:"answerAt",key:"answerAt",render:function(e){return(0,y.jsxs)("span",{children:[d()(e).format("DD/MM/YYYY HH:mm")," "]})}}];return(0,y.jsx)("div",{className:"p-3",children:(0,y.jsxs)("div",{className:"w-full",children:[(0,y.jsxs)("div",{className:"flex flex-row flex-wrap items-start",children:[(0,y.jsx)(s.Z.RangePicker,{locale:c.Z,onChange:function(e){j({startDate:new Date(e[0]._d),endDate:new Date(e[1]._d)})},defaultValue:[d()(S.startDate,"YYYY-MM-DD"),d()(S.endDate,"YYYY-MM-DD")],disabledDate:function(e){return e&&e>d()().endOf("day")},className:"mb-4"}),(0,y.jsx)(o.Z,{onClick:M,className:"mb-4 mt-4 sm:mt-0 sm:ml-4",type:"primary",children:"G\xf6r\xfcnt\xfcle"}),(0,y.jsx)("div",{className:"mt-5 sm:mt-1 ml-4",children:(0,y.jsxs)("span",{className:"font-semibold text-base",children:["Toplam ",a.length," sonu\xe7"]})})]}),(0,y.jsx)(i.Z,{locale:{triggerAsc:"Artan S\u0131ralama",triggerDesc:"Azalan S\u0131ralama",cancelSort:"S\u0131ralamay\u0131 \u0130ptal Et",filterReset:!1,filterConfirm:"Uygula"},dataSource:a,columns:_})]})})}},266:function(e,t,a){"use strict";var r=a(4836).default;t.Z=void 0;var n=r(a(434)),l=r(a(36)),s=r(a(4317)),o={lang:(0,n.default)({placeholder:"Tarih se\xe7",yearPlaceholder:"Y\u0131l se\xe7",quarterPlaceholder:"\xc7eyrek se\xe7",monthPlaceholder:"Ay se\xe7",weekPlaceholder:"Hafta se\xe7",rangePlaceholder:["Ba\u015flang\u0131\xe7 tarihi","Biti\u015f tarihi"],rangeYearPlaceholder:["Ba\u015flang\u0131\xe7 y\u0131l\u0131","Biti\u015f y\u0131l\u0131"],rangeMonthPlaceholder:["Ba\u015flang\u0131\xe7 ay\u0131","Biti\u015f ay\u0131"],rangeWeekPlaceholder:["Ba\u015flang\u0131\xe7 haftas\u0131","Biti\u015f haftas\u0131"]},l.default),timePickerLocale:(0,n.default)({},s.default)};t.Z=o},4317:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={placeholder:"Zaman se\xe7",rangePlaceholder:["Ba\u015flang\u0131\xe7 zaman\u0131","Biti\u015f zaman\u0131"]};t.default=a},36:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={locale:"tr_TR",today:"Bug\xfcn",now:"\u015eimdi",backToToday:"Bug\xfcne Geri D\xf6n",ok:"tamam",clear:"Temizle",month:"Ay",year:"Y\u0131l",timeSelect:"Zaman Se\xe7",dateSelect:"Tarih Se\xe7",monthSelect:"Ay Se\xe7",yearSelect:"Y\u0131l Se\xe7",decadeSelect:"On Y\u0131l Se\xe7",yearFormat:"YYYY",dateFormat:"M/D/YYYY",dayFormat:"D",dateTimeFormat:"M/D/YYYY HH:mm:ss",monthBeforeYear:!0,previousMonth:"\xd6nceki Ay (PageUp)",nextMonth:"Sonraki Ay (PageDown)",previousYear:"\xd6nceki Y\u0131l (Control + Sol)",nextYear:"Sonraki Y\u0131l (Control + Sa\u011f)",previousDecade:"\xd6nceki On Y\u0131l",nextDecade:"Sonraki On Y\u0131l",previousCentury:"\xd6nceki Y\xfczy\u0131l",nextCentury:"Sonraki Y\xfczy\u0131l"};t.default=a},434:function(e){function t(){return e.exports=t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},e.exports.__esModule=!0,e.exports.default=e.exports,t.apply(this,arguments)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports},4836:function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}}]);
//# sourceMappingURL=544.d174428f.chunk.js.map