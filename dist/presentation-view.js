!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("next-core-utilities"),require("next-core-object"),require("lodash.bind")):"function"==typeof define&&define.amd?define("presentation-view",["next-core-utilities","next-core-object","lodash.bind"],t):"object"==typeof exports?exports["presentation-view"]=t(require("next-core-utilities"),require("next-core-object"),require("lodash.bind")):e["presentation-view"]=t(e["next-core-utilities"],e["next-core-object"],e["lodash.bind"])}(this,(function(e,t,i){return function(e){var t={};function i(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(s,n,function(t){return e[t]}.bind(null,n));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/dist/",i(i.s=3)}([function(t,i){t.exports=e},function(e,i){e.exports=t},function(e,t){e.exports=i},function(e,t,i){"use strict";i.r(t),i.d(t,"View",(function(){return c}));var s=i(1),n=i(0);const r=i(2),l=/^(\S+)\s*(.*)$/;class o extends s.AugmentedObject{constructor(e){super(e),e&&e.name?this._name=e.name:this._name="Untitled",e&&e.permissions?this._permissions=e.permissions:this._permissions={include:[],exclude:[]},e&&e.tagName?this.tagName=e.tagName:this.tagName="div",e&&e.el?this._el=e.el:this._el="",e&&e.model?this.model=e.model:this.model=null,e&&e.collection?this.collection=e.collection:this.collection=null,e&&e.id?this.id=e.id:this.id=0,e&&e.className?this._style=e.className:this._style="",e&&e.style?this._style=e.style:this._style="",e&&e.attributes?this.attributes=e.attributes:this.attributes={},this.cid=Object(n.uniqueId)("view"),e&&e.noEL||this._ensureElement(),e&&e.template?this.template=e.template:this.template="",this.options=e}get el(){return this._el}set el(e){this._el=e}render(){return this}remove(){return this._removeElement(),this.stopListening(),this}_removeElement(){let e=this._el;this._el&&Object(n.isString)(this._el)&&(e=document.querySelector(this._el)),e&&(e.innerHTML="")}setElement(e){return this.undelegateEvents(),this._el=e,this.delegateEvents(),this}delegateEvents(e){if(e||(e=Object(n.result)(this,"events")),!e)return this;let t;for(t in this.undelegateEvents(),e){let i=e[t];if(Object(n.isFunction)(i)||(i=this[i]),!i)continue;const s=t.match(l);this.delegate(s[1],s[2],r(i,this))}return this}delegate(e,t,i){const s=document.querySelectorAll(t);if(s){const t=Array.from(s);let n=0;const r=t.length;for(n=0;n<r;n++)t[n].addEventListener(e,i)}return this}undelegateEvents(){if(this._el){let e=this._el;if(Object(n.isString)(this._el)&&(e=document.querySelector(this._el)),e){const t=e.cloneNode(!0);t&&t.parentNode&&e.parentNode.replaceChild(t,e)}}return this}undelegate(e,t,i){if(this._el){let s=this._el;if(Object(n.isString)(this._el)&&(s=document.querySelector(this._el)),s){const n=s.querySelectorAll(t);if(n){const t=Array.from(n);let s=0;const r=t.length;for(s=0;s<r;s++)t[s].removeEventListener(e,i)}}}return this}_createElement(e){return document.createElement(e)}_ensureElement(){if(this._el)this.setElement(this._el);else{const e=Object(n.extend)({},Object(n.result)(this,"attributes"));this.id&&(e.id=this.id),this._style&&(e.class=this._style);const t=this._createElement(this.tagName),i=document.querySelector("body");i&&i.appendChild(t),t&&this.setElement(t),this._setAttributes(e)}}_setAttributes(e){let t;for(t in e)if(this._el){let i=this._el;Object(n.isString)(this._el)&&(i=document.querySelector(this._el)),i&&i.setAttribute(t,e[t])}}set name(e){this._name=e}get name(){return this._name}addPermission(e,t){if(t||(t=!1),null!==e&&!Array.isArray(e)){(t?this._permissions.exclude:this._permissions.include).push(e)}}removePermission(e,t){if(t||(t=!1),null!==e&&!Array.isArray(e)){const i=t?this._permissions.exclude:this._permissions.include;i.splice(i.indexOf(e),1)}}set permissions(e){this._permissions=e}get permissions(){return this._permissions}clearPermissions(){this._permissions={include:[],exclude:[]}}matchesPermission(e,t){return t||(t=!1),-1!==(t?this._permissions.exclude:this._permissions.include).indexOf(e)}canDisplay(){return!0}}var u=o;var c=class extends u{constructor(e){super(e)}render(){if(this._el&&this.template){let e=this._el;Object(n.isString)(this._el)&&(e=document.querySelector(this._el)),e&&(e.innerHTML=this.template)}return this}remove(){if(this.undelegateEvents(),this.off(),this.stopListening(),this._el){let e=this._el;Object(n.isString)(this._el)&&(e=document.querySelector(this._el)),e&&(e.innerHTML="")}return this}}}])}));
//# sourceMappingURL=presentation-view.js.map