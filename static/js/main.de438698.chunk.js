(this.webpackJsonpwhatfingtimeisit=this.webpackJsonpwhatfingtimeisit||[]).push([[0],{74:function(e,t,n){},80:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),i=n(33),a=n.n(i),o=n(4),s=n(34),u=n.n(s),l=n(9),j=n(44),b=n(1),d=n(18),O=n(21),f=n(26),m=n(27),h=n.n(m),v=n(35),x=n(11),p=n(2),g=Object(c.createContext)(0);function C(){return function(){var e=new Date;return e.setMilliseconds(0),e.setSeconds(e.getSeconds()+1),+e}()-Date.now()}function w(e){var t,n=!1;function c(){n||(e(),r())}function r(){n||(t=function(e){return setTimeout(e,C())}(c))}return r(),function(){n||(n=!0,clearTimeout(t))}}function N(e){var t=e.children,n=Object(c.useState)((function(){return Date.now()})),r=Object(o.a)(n,2),i=r[0],a=r[1];return Object(c.useEffect)((function(){return w((function(){return a(Date.now())}))}),[a]),Object(p.jsx)(g.Provider,{value:i,children:t})}var A,S,y=n(83),k=y.reduce((function(e,t){return e[t.name]=t,e}),{}),E=(y.map((function(e){return e.name})).sort(),n(31));!function(e){e.NAWest="NA-West",e.NACentral="NA-Central",e.NAMountain="NA-Mountain",e.NAEast="NA-East",e.Europe="Europe",e.India="India",e.MidWest="Mid-West",e.SouthAmerica="S America",e.Asia="Asia",e.SEAsia="SE Asia"}(S||(S={}));var M=(A={},Object(x.a)(A,S.NAWest,"America/Los_Angeles"),Object(x.a)(A,S.NACentral,"America/Mexico_City"),Object(x.a)(A,S.NAMountain,"America/Phoenix"),Object(x.a)(A,S.NAEast,"America/New_York"),Object(x.a)(A,S.Europe,"Europe/Zurich"),Object(x.a)(A,S.India,"Asia/Kolkata"),Object(x.a)(A,S.MidWest,"America/New_York"),Object(x.a)(A,S.SouthAmerica,"America/Santiago"),Object(x.a)(A,S.Asia,"Asia/Tokyo"),Object(x.a)(A,S.SEAsia,"Asia/Ho_Chi_Minh"),A);function z(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:E.DateTime.TIME_SIMPLE,n=(new E.DateTime).setZone(e);return{localizedAdjustedTime:n.toLocaleString(t),timezoneObject:k[e],adjustedTime:n}}function T(e,t){return Object.fromEntries(Object.entries(e).map((function(e){var n=Object(o.a)(e,2),c=n[0],r=n[1];return[c,t(c,r)]})))}function D(){return I.apply(this,arguments)}function I(){return(I=Object(v.a)(h.a.mark((function e(){var t,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://us-central1-erics-world.cloudfunctions.net/query-timezones-go");case 2:return t=e.sent,e.next=5,t.json();case 5:return(n=e.sent).forEach((function(e){M[e.timezone]&&(e.timezone=M[e.timezone])})),console.log(n),e.abrupt("return",n);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var P=n(85),W=[];var _=Object(c.createContext)({people:{},addPerson:function(){},removePerson:function(){}}),V=localStorage.getItem("people"),J=function(){return V?JSON.parse(V):{}};function F(e){var t=e.children,n=Object(c.useState)(J),r=Object(o.a)(n,2),i=r[0],a=r[1],s=Object(P.a)("staff",D,{placeholderData:W}).data||W,u=Object(c.useCallback)((function(e){var t=Object.assign({},i),n=Object.assign({},e,{id:(Math.random()+1).toString(36).substring(7)});t[n.id]=n,a(t)}),[i]),l=Object(c.useCallback)((function(e){var t=Object.assign({},i);delete t[e],a(t)}),[i]);return Object(c.useEffect)((function(){localStorage.setItem("people",JSON.stringify(i))}),[i]),Object(c.useEffect)((function(){var e,t=Object.assign({},i),n=!1,c=Object(O.a)(s);try{for(c.s();!(e=c.n()).done;){var r=e.value;t[r.id]?t[r.id].timezone!==r.timezone&&(t[r.id].timezone=r.timezone,n=!0):(t[r.id]=r,n=!0)}}catch(o){c.e(o)}finally{c.f()}n&&a(t)}),[s,i]),Object(p.jsx)(_.Provider,{value:{people:i,addPerson:u,removePerson:l},children:t})}var G=n(51),L=n.n(G),R=Object(c.createContext)({colorCodings:{},colorCodingStyles:{},autocolor:function(){}});function Y(e){return e.reduce((function(e,t){return(e[t.timezone]||(e[t.timezone]=[])).push(t),e}),{})}function Z(e){var t=e.children,n=Object(c.useContext)(_).people,r=Object(f.a)("color-codings",{}),i=Object(o.a)(r,2),a=i[0],s=i[1],u=Object(c.useMemo)((function(){return T(a,(function(e,t){var n=Object(o.a)(t,2);return{"--color-coding-bg":n[0],"--color-coding-text":n[1]}}))}),[a]),l=Object(c.useCallback)((function(){var e=Y(Object.values(n)),t=Object.keys(e).length,c=L()({count:t,lightMin:19,lightMax:21,samples:3200}).map((function(e){return{color:e,sort:Math.random()}})).sort((function(e,t){return e.sort-t.sort})).map((function(e){return e.color})),r={};Object.values(e).forEach((function(e){var t,n=c.pop(),i=Object(O.a)(e);try{for(i.s();!(t=i.n()).done;){var a=t.value;r[a.id]=[n.hex("rgb"),n.brighten(4).hex("rgb")]}}catch(o){i.e(o)}finally{i.f()}})),s(r)}),[n,s]);return Object(p.jsx)(R.Provider,{value:{colorCodings:a,colorCodingStyles:u,autocolor:l},children:t})}var q=Object(c.createContext)({});function B(e){var t=e.children,n=Object(c.useContext)(_).people,r=Object(c.useContext)(g),i=Object(c.useMemo)((function(){return T(n,(function(e,t){return Object.assign({},t,z(t.timezone))}))}),[n,r]);return Object(p.jsx)(q.Provider,{value:i,children:t})}function H(e,t){var n=Object(f.a)(t,{}),r=Object(o.a)(n,2),i=r[0],a=r[1];return Object(c.useEffect)((function(){var t=Object.assign({},i);Object.values(e).forEach((function(e){var n=e.id;"undefined"===typeof t[n]&&(t[n]=function(e){var t=Object.values(e).sort((function(e,t){return t-e}));return(Object(o.a)(t,1)[0]||0)+1}(i))})),a(t)}),[e]),[Object(c.useMemo)((function(){return function(e,t){return Object.values(e).sort((function(e,n){return t[e.id]-t[n.id]}))}(e,i)}),[e,i]),function(e){return a(Object.fromEntries(e.map((function(e,t){return[e.id,t]}))))}]}var K=n(8),Q=n(20),U=n(5);function X(e){var t=e.item,n=e.children,c=Object(Q.e)({id:t.id}),r=c.attributes,i=c.listeners,a=c.transform,o=c.transition,s=c.isSorting,u=c.setNodeRef;return Object(p.jsx)(n,Object(b.a)(Object(b.a)({item:t,ref:u,style:{transition:o||void 0,transform:s?void 0:U.a.Translate.toString(a)}},r),i))}function $(e){var t=e.items,n=e.onOrderChanged,r=e.children,i=e.strategy,a=void 0===i?Q.f:i,s=Object(c.useState)(null),u=Object(o.a)(s,2),l=u[0],j=u[1],b=Object(c.useMemo)((function(){return l?t.find((function(e){return e.id===l})):null}),[l,t]),d=Object(K.o)(Object(K.n)(K.e),Object(K.n)(K.d,{coordinateGetter:Q.d})),O=Object(c.useCallback)((function(e){var c=e.over,r=e.active;c&&r.id!==c.id&&n&&n(function(e,t,n){var c=e.findIndex((function(e){return e.id===t})),r=e.findIndex((function(e){return e.id===n}));return Object(Q.b)(e,c,r)}(t,r.id,c.id)),j(null)}),[t,n]),f=Object(c.useCallback)((function(e){var t=e.active;j(t.id)}),[]);return Object(p.jsxs)(K.a,{sensors:d,collisionDetection:K.f,onDragStart:f,onDragEnd:O,children:[Object(p.jsx)(Q.a,{items:t,strategy:a,children:t.map((function(e){return Object(p.jsx)(X,{item:e,children:r},e.id)}))}),Object(p.jsx)(K.b,{children:b?Object(p.jsx)(r,{item:b}):null})]})}var ee=Object(c.forwardRef)((function(e,t){var n=e.item,c=n.id,r=n.name,i=n.timezoneObject.abbreviation,a=n.localizedAdjustedTime,o=Object(d.a)(e,["item"]);return Object(p.jsx)(R.Consumer,{children:function(e){var n=e.colorCodingStyles;return Object(p.jsxs)("div",Object(b.a)(Object(b.a)({className:"person","data-id":c},o),{},{style:Object(b.a)(Object(b.a)({},n[c]||{}),o.style||{}),ref:t,children:[Object(p.jsx)("span",{className:"person-name",children:r}),Object(p.jsx)("span",{className:"person-spacer"}),Object(p.jsxs)("span",{className:"person-time",children:[Object(p.jsx)("span",{className:"person-current-time",children:a}),Object(p.jsx)("span",{className:"pesron-timezone",children:i})]})]}))}})}));function te(){var e=H(Object(c.useContext)(q),"sidebar-sort-order"),t=Object(o.a)(e,2),n=t[0],r=t[1];return Object(p.jsx)("div",{className:"sidebar",children:Object(p.jsx)($,{items:n,onOrderChanged:r,children:ee})})}var ne=Object(c.forwardRef)((function(e,t){var n=e.item,r=Object(d.a)(e,["item"]),i=Object(c.useContext)(R).colorCodingStyles;return Object(p.jsxs)("div",Object(b.a)(Object(b.a)({className:"grid-person"},r),{},{style:Object(b.a)(Object(b.a)({},i[n.id]),r.style||{}),ref:t,children:[Object(p.jsx)("span",{className:"grid-person-name",children:n.name}),Object(p.jsx)("span",{className:"grid-person-time",children:n.localizedAdjustedTime})]}))}));function ce(){return Object(f.a)("grid-settings",{columns:4,fontScale:3})}function re(){var e=ce(),t=Object(o.a)(e,2),n=t[0],r=t[1],i=n.columns,a=Object(c.useCallback)((function(e){if(!(e>8||e<1)){var t=Object.assign({},n);t.columns=e,r(t)}}),[n,r]),s=Object(c.useCallback)((function(){return a(i+1)}),[i,a]),u=Object(c.useCallback)((function(){return a(i-1)}),[i,a]);return Object(p.jsxs)("div",{className:"switcher-group",children:[Object(p.jsx)("div",{className:"switcher-item",onClick:function(){return u()},children:"-"}),Object(p.jsxs)("div",{className:"switcher-label",children:[n.columns," Columns"]}),Object(p.jsx)("div",{className:"switcher-item",onClick:function(){return s()},children:"+"})]})}function ie(){var e=ce(),t=Object(o.a)(e,2),n=t[0],r=t[1],i=n.fontScale,a=Object(c.useCallback)((function(e){r(Object.assign({},n,{fontScale:e}))}),[n,r]);return Object(p.jsxs)("div",{className:"switcher-group",children:[Object(p.jsx)("div",{className:"switcher-label",children:"Font Scale: "}),[1,2,3,4].map((function(e){return Object(p.jsxs)("div",{className:u()("switcher-item",{active:i===e}),onClick:function(){return a(e)},children:[e,"x"]},e)}))]})}function ae(){return H(Object(c.useContext)(q),"grid-sort-order")}function oe(){var e=ae(),t=Object(o.a)(e,2),n=t[0],r=t[1],i=Object(c.useCallback)((function(){r(Object.values(Y(n)).map((function(e){return e.sort((function(e,t){return e.name.localeCompare(t.name)}))})).sort((function(e,t){return t.length-e.length})).flat())}),[n,r]);return Object(p.jsx)("div",{className:"switcher-item",onClick:function(){return i()},children:"Group by Timezone"})}n(74);var se=[{name:"Table View",id:"table",component:function(){return Object(p.jsx)("div",{})}},{name:"World View",id:"world",component:function(){return Object(p.jsx)("div",{})}},{name:"Grid View",id:"grid",component:function(){var e=ae(),t=Object(o.a)(e,2),n=t[0],c=t[1],r=ce(),i=Object(o.a)(r,1)[0],a=i.columns,s=i.fontScale;return Object(p.jsx)("div",{className:"grid-view",style:{gridTemplateColumns:"repeat(".concat(a,", minmax(0, 1fr))")},"attr-font-scale":s,children:Object(p.jsx)($,{items:n,onOrderChanged:c,strategy:Q.c,children:ne})})},toolbarView:function(){return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(ie,{}),Object(p.jsx)(re,{}),Object(p.jsx)(oe,{})]})}}];function ue(){var e=Object(c.useState)(!1),t=Object(o.a)(e,2),n=t[0],r=t[1];return Object(p.jsx)(l.c,{children:se.map((function(e){var t=e.id,c=e.toolbarView;return c?Object(p.jsxs)(l.a,{path:"/view/".concat(t),children:[n?Object(p.jsx)(c,{}):null,Object(p.jsx)("div",{className:u()("switcher-item",{active:n}),onClick:function(){return r(!n)},children:"Settings"})]},t):null}))})}function le(){return Object(p.jsx)(j.a,{basename:"",children:Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)("div",{className:"view-switcher",children:[se.map((function(e){var t=e.id,n=e.name;return Object(p.jsx)(j.b,{className:"switcher-item",to:"/view/".concat(t),children:n},t)})),Object(p.jsx)("div",{className:"switcher-spacer"}),Object(p.jsx)(ue,{}),Object(p.jsx)(R.Consumer,{children:function(e){var t=e.autocolor;return Object(p.jsx)("div",{className:"switcher-item",onClick:function(){return t()},children:"Color by Timezone"})}})]}),Object(p.jsx)(te,{}),Object(p.jsx)(l.c,{children:se.map((function(e){var t=e.id,n=e.component;return Object(p.jsx)(l.a,{path:"/view/".concat(t),children:Object(p.jsx)(n,{})},t)}))})]})})}var je=n(84),be=n(50),de=new je.a;a.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(be.a,{client:de,children:Object(p.jsx)(F,{children:Object(p.jsx)(N,{children:Object(p.jsx)(B,{children:Object(p.jsx)(Z,{children:Object(p.jsx)(le,{})})})})})})}),document.getElementById("root"))}},[[80,1,2]]]);
//# sourceMappingURL=main.de438698.chunk.js.map