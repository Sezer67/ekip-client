"use strict";(self.webpackChunkcliennt=self.webpackChunkcliennt||[]).push([[266],{9871:function(e,t,n){var r=n(4165),a=n(5861),o=n(9439),l=n(7561),s=n(7309),c=n(2791),i=n(6871),u=n(8316),d=n(6419),f=n(4183),v=n(3845),p=n(121),h=n(3153),m=n(8428),x=n(9555),w=n(184);t.Z=function(e){var t,n,y=e.product,b=e.editable,g=(0,c.useState)(!1),C=(0,o.Z)(g,2),k=C[0],Z=C[1],N=(0,h.CG)((function(e){return e.user})),j=(0,h.CG)((function(e){return e.product})),E=y.images&&v.y(y.images[0]),V=(0,h.TL)(),D=(0,i.s0)(),R=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var t,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,k){e.next=10;break}return e.next=4,x._7.addProduuctToFavorites({productId:y.id});case 4:t=e.sent,n=t.data,V((0,m.a3)(n)),Z(!0),e.next=13;break;case 10:return e.next=12,x._7.removeProductToFavorites(y.id);case 12:V((0,m.Ni)({id:y.id}));case 13:e.next=17;break;case 15:e.prev=15,e.t0=e.catch(0);case 17:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(){return e.apply(this,arguments)}}(),H=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(N.user.role!==d.hN.u.Customer){e.next=10;break}return e.prev=1,e.next=4,x._7.updateProductById(y.id,{showCount:1});case 4:V((0,m.ZE)({id:y.id})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),console.log(e.t0);case 10:p.G(D,"/product/".concat(y.id)),V((0,m.CE)(y));case 12:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(){return e.apply(this,arguments)}}();return(0,c.useEffect)((function(){if(N.user.role===f.u.Customer||j.favorites){var e=j.favorites.find((function(e){return e.productId.id===y.id}));Z(!!e)}}),[y,j.favorites,N]),(0,w.jsxs)("div",{className:"relative min-w-[17rem]  w-80 shadow-md bg-white p-3 m-3 rounded-md  flex flex-col cursor-pointer hover:shadow-xl transition-shadow duration-300",children:[(0,w.jsx)("div",{onClick:b?function(){p.G(D,"".concat(d.eE.y.PRODUCT_EDIT_QUERY_ID,"/").concat(y.id)),V((0,m.CE)(y))}:R,className:"absolute top-1 right-1 w-8 h-8 bg-white rounded-full flex justify-center items-center ".concat(b||N.user.role===d.hN.u.Customer?"":"hidden"," "),children:(0,w.jsx)("img",{src:b?u.ci.eP:k?u.ci.t1:u.ci.S3,className:"w-4 h-4",alt:"fav"})}),(0,w.jsx)("div",{className:"flex h-[100px] justify-center mb-1 w-full border-b",children:E?(0,w.jsx)("img",{src:E,alt:"asd",className:"w-full object-contain max-h-[100px] "}):(0,w.jsx)("span",{className:"text-red-700 italic ",children:"\xdcr\xfcne ait bir resim mevcut de\u011fil."})}),(0,w.jsxs)("div",{onClick:H,className:"flex flex-col mb-3",children:[(0,w.jsx)("span",{className:"text-orange font-semibold text-lg  cursor-pointer",children:y.name}),y.ownerId?(0,w.jsxs)("span",{className:"text-thirdy text-[.65rem] italic mb-2",children:[null===(t=y.ownerId)||void 0===t?void 0:t.firstName.concat(" ",null===(n=y.ownerId)||void 0===n?void 0:n.lastName)," ","taraf\u0131ndan"]}):null,(0,w.jsxs)("div",{className:"flex flex-row flex-wrap items-center justify-between",children:[(0,w.jsxs)("span",{className:"text-secondary font-semibold text-lg",children:[y.price," \u20ba"]}),y.stock<50&&(0,w.jsxs)("span",{className:"text-thirdy text-xs",children:["Kalan Stok: ",y.stock]})]}),(0,w.jsxs)("div",{className:"flex flex-row items-center justify-between flex-wrap",children:[(0,w.jsxs)("div",{className:"flex flex-row items-center",children:[(0,w.jsx)(l.Z,{allowHalf:!0,disabled:!0,defaultValue:y.ratingPoint}),(0,w.jsxs)("span",{className:"pt-1 ml-2 text-thirdy",children:["(",y.ratingCount,")"]})]}),(0,w.jsx)(s.Z,{onClick:H,className:"hover:!bg-blue-400 hover:!text-light",children:"G\xf6r\xfcnt\xfcle"})]})]})]})}},3845:function(e,t,n){n.d(t,{o:function(){return r},y:function(){return a}});var r=function(e){return new Promise((function(t,n){var r=new FileReader;r.onload=function(e){var n;t(null===(n=e.target)||void 0===n?void 0:n.result)},r.onerror=function(e){n(e)},r.readAsDataURL(e)}))},a=function(e){return"data:image/png;base64,"+e}},4266:function(e,t,n){n.r(t);n(2791);var r=n(9871),a=n(3153),o=n(184);t.default=function(){var e=(0,a.CG)((function(e){return e.product}));return(0,o.jsxs)("div",{className:"p-3",children:[(0,o.jsx)("h3",{className:"text-xl text-primary font-bold",children:"FAVOR\u0130 \xdcR\xdcNLER\u0130N\u0130Z"}),(0,o.jsx)("div",{className:"w-full flex flex-row flex-wrap",children:e.favorites&&e.favorites.map((function(e){return(0,o.jsx)(r.Z,{product:e.productId},e.id)}))})]})}},7561:function(e,t,n){n.d(t,{Z:function(){return E}});var r=n(7462),a=n(1413),o=n(2791),l={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"}}]},name:"star",theme:"filled"},s=n(4291),c=function(e,t){return o.createElement(s.Z,(0,a.Z)((0,a.Z)({},e),{},{ref:t,icon:l}))};c.displayName="StarFilled";var i=o.forwardRef(c),u=n(4942),d=n(5671),f=n(3144),v=n(136),p=n(7277),h=n(4304),m=n(1694),x=n.n(m),w=n(1354);var y=function(e){(0,v.Z)(n,e);var t=(0,p.Z)(n);function n(){var e;(0,d.Z)(this,n);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).onHover=function(t){var n=e.props;(0,n.onHover)(t,n.index)},e.onClick=function(t){var n=e.props;(0,n.onClick)(t,n.index)},e.onKeyDown=function(t){var n=e.props,r=n.onClick,a=n.index;13===t.keyCode&&r(t,a)},e}return(0,f.Z)(n,[{key:"getClassName",value:function(){var e=this.props,t=e.prefixCls,n=e.index,r=e.value,a=e.allowHalf,o=e.focused,l=n+1,s=t;return 0===r&&0===n&&o?s+=" ".concat(t,"-focused"):a&&r+.5>=l&&r<l?(s+=" ".concat(t,"-half ").concat(t,"-active"),o&&(s+=" ".concat(t,"-focused"))):(s+=" ".concat(t,l<=r?"-full":"-zero"),l===r&&o&&(s+=" ".concat(t,"-focused"))),s}},{key:"render",value:function(){var e=this.onHover,t=this.onClick,n=this.onKeyDown,r=this.props,a=r.disabled,l=r.prefixCls,s=r.character,c=r.characterRender,i=r.index,u=r.count,d=r.value,f="function"===typeof s?s(this.props):s,v=o.createElement("li",{className:this.getClassName()},o.createElement("div",{onClick:a?null:t,onKeyDown:a?null:n,onMouseMove:a?null:e,role:"radio","aria-checked":d>i?"true":"false","aria-posinset":i+1,"aria-setsize":u,tabIndex:a?-1:0},o.createElement("div",{className:"".concat(l,"-first")},f),o.createElement("div",{className:"".concat(l,"-second")},f)));return c&&(v=c(v,this.props)),v}}]),n}(o.Component);function b(){}var g=function(e){(0,v.Z)(n,e);var t=(0,p.Z)(n);function n(e){var r;(0,d.Z)(this,n),(r=t.call(this,e)).stars=void 0,r.rate=void 0,r.onHover=function(e,t){var n=r.props.onHoverChange,a=r.getStarValue(t,e.pageX);a!==r.state.cleanedValue&&r.setState({hoverValue:a,cleanedValue:null}),n(a)},r.onMouseLeave=function(){var e=r.props.onHoverChange;r.setState({hoverValue:void 0,cleanedValue:null}),e(void 0)},r.onClick=function(e,t){var n=r.props.allowClear,a=r.state.value,o=r.getStarValue(t,e.pageX),l=!1;n&&(l=o===a),r.onMouseLeave(),r.changeValue(l?0:o),r.setState({cleanedValue:l?o:null})},r.onFocus=function(){var e=r.props.onFocus;r.setState({focused:!0}),e&&e()},r.onBlur=function(){var e=r.props.onBlur;r.setState({focused:!1}),e&&e()},r.onKeyDown=function(e){var t=e.keyCode,n=r.props,a=n.count,o=n.allowHalf,l=n.onKeyDown,s="rtl"===n.direction,c=r.state.value;t===w.Z.RIGHT&&c<a&&!s?(c+=o?.5:1,r.changeValue(c),e.preventDefault()):t===w.Z.LEFT&&c>0&&!s||t===w.Z.RIGHT&&c>0&&s?(c-=o?.5:1,r.changeValue(c),e.preventDefault()):t===w.Z.LEFT&&c<a&&s&&(c+=o?.5:1,r.changeValue(c),e.preventDefault()),l&&l(e)},r.saveRef=function(e){return function(t){r.stars[e]=t}},r.saveRate=function(e){r.rate=e};var a=e.value;return void 0===a&&(a=e.defaultValue),r.stars={},r.state={value:a,focused:!1,cleanedValue:null},r}return(0,f.Z)(n,[{key:"componentDidMount",value:function(){var e=this.props,t=e.autoFocus,n=e.disabled;t&&!n&&this.focus()}},{key:"getStarDOM",value:function(e){return(0,h.Z)(this.stars[e])}},{key:"getStarValue",value:function(e,t){var n=this.props,r=n.allowHalf,a="rtl"===n.direction,o=e+1;if(r){var l=this.getStarDOM(e),s=function(e){var t=function(e){var t,n,r=e.ownerDocument,a=r.body,o=r&&r.documentElement,l=e.getBoundingClientRect();return t=l.left,n=l.top,{left:t-=o.clientLeft||a.clientLeft||0,top:n-=o.clientTop||a.clientTop||0}}(e),n=e.ownerDocument,r=n.defaultView||n.parentWindow;return t.left+=function(e){var t=e.pageXOffset,n="scrollLeft";if("number"!==typeof t){var r=e.document;"number"!==typeof(t=r.documentElement[n])&&(t=r.body[n])}return t}(r),t.left}(l),c=l.clientWidth;(a&&t-s>c/2||!a&&t-s<c/2)&&(o-=.5)}return o}},{key:"focus",value:function(){this.props.disabled||this.rate.focus()}},{key:"blur",value:function(){this.props.disabled||this.rate.blur()}},{key:"changeValue",value:function(e){var t=this.props.onChange;"value"in this.props||this.setState({value:e}),t(e)}},{key:"render",value:function(){for(var e=this.props,t=e.count,n=e.allowHalf,r=e.style,a=e.prefixCls,l=e.disabled,s=e.className,c=e.character,i=e.characterRender,d=e.tabIndex,f=e.direction,v=this.state,p=v.value,h=v.hoverValue,m=v.focused,w=[],b=l?"".concat(a,"-disabled"):"",g=0;g<t;g+=1)w.push(o.createElement(y,{ref:this.saveRef(g),index:g,count:t,disabled:l,prefixCls:"".concat(a,"-star"),allowHalf:n,value:void 0===h?p:h,onClick:this.onClick,onHover:this.onHover,key:g,character:c,characterRender:i,focused:m}));var C=x()(a,b,s,(0,u.Z)({},"".concat(a,"-rtl"),"rtl"===f));return o.createElement("ul",{className:C,style:r,onMouseLeave:l?null:this.onMouseLeave,tabIndex:l?-1:d,onFocus:l?null:this.onFocus,onBlur:l?null:this.onBlur,onKeyDown:l?null:this.onKeyDown,ref:this.saveRate,role:"radiogroup"},w)}}],[{key:"getDerivedStateFromProps",value:function(e,t){return"value"in e&&void 0!==e.value?(0,a.Z)((0,a.Z)({},t),{},{value:e.value}):t}}]),n}(o.Component);g.defaultProps={defaultValue:0,count:5,allowHalf:!1,allowClear:!0,style:{},prefixCls:"rc-rate",onChange:b,character:"\u2605",onHoverChange:b,tabIndex:0,direction:"ltr"};var C=g,k=n(1929),Z=n(5945),N=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},j=o.forwardRef((function(e,t){var n=e.prefixCls,a=e.tooltips,l=N(e,["prefixCls","tooltips"]),s=o.useContext(k.E_),c=s.getPrefixCls,i=s.direction,u=c("rate",n);return o.createElement(C,(0,r.Z)({ref:t,characterRender:function(e,t){var n=t.index;return a?o.createElement(Z.Z,{title:a[n]},e):e}},l,{prefixCls:u,direction:i}))}));j.defaultProps={character:o.createElement(i,null)};var E=j}}]);
//# sourceMappingURL=266.8c539763.chunk.js.map