(function(e){function t(t){for(var n,r,c=t[0],o=t[1],l=t[2],d=0,m=[];d<c.length;d++)r=c[d],i[r]&&m.push(i[r][0]),i[r]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);p&&p(t);while(m.length)m.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],n=!0,c=1;c<a.length;c++){var o=a[c];0!==i[o]&&(n=!1)}n&&(s.splice(t--,1),e=r(r.s=a[0]))}return e}var n={},i={ggk:0},s=[];function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=n,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="../../";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var p=o;s.push(["d14a","chunk-vendors","chunk-common"]),a()})({"10fc":function(e,t,a){var n={"./heijin/bg_02.jpg":"8b12","./hongjin/bg_02.jpg":"ddda","./nihong/bg_02.jpg":"a60d"};function i(e){var t=s(e);return a(t)}function s(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}i.keys=function(){return Object.keys(n)},i.resolve=s,e.exports=i,i.id="10fc"},1766:function(e,t,a){e.exports=a.p+"img/win_icon_cash.a76c80a9.png"},"1da9":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"bg"},[n("img",{attrs:{src:e.bannerUrl,alt:""}})]),n("div",{staticClass:"bg bg2"},[n("p",{attrs:{id:"myScore"}},[n("img",{attrs:{src:a("53be")}}),n("span",{staticClass:"jf"},[e._v("我的积分："),n("strong",[e._v(e._s(e.userInfo.accumulatPoints))])]),n("span",{staticClass:"cqcs"},[e.gameDetail.freeCount>0&&1==e.gameDetail.hasIntegral?[1==e.gameDetail.gameFreeDay?[e._v("今日")]:e._e(),e._v("免费次数"),n("strong",[e._v(e._s(e.gameDetail.freeCount)+" 次")])]:[e._v("\n            抽奖需："+e._s(e.gameDetail.gameIntegral)+"积分/次\n          ")]],2)]),n("div",{staticClass:"eraser_box"},[n("div",{staticClass:"wrapper light"},[n("div",{staticClass:"eraser"},[e.start?n("scratch-card",{ref:"card",attrs:{"element-id":"scratchWrap",ratio:.5,"move-radius":15,skinName:e.gameDetail.skinName,coverImg:a("f0c4"),"start-callback":e.startCallback,"clear-callback":e.clearCallback}},[n("p",{staticClass:"e_info",attrs:{slot:"result"},slot:"result"},[e._v(e._s(e.winInfo))])]):e._e(),n("img",{directives:[{name:"show",rawName:"v-show",value:!e.start,expression:"!start"}],staticClass:"maskImg",attrs:{src:a("f0c4"),alt:""}}),n("button",{directives:[{name:"show",rawName:"v-show",value:!e.start,expression:"!start"}],on:{click:e.rollConditions}})],1)])])]),n("div",{staticClass:"bg"},[n("p",{staticClass:"link",on:{click:e.getPrize}},[e._v("查看我的中奖纪录 >>")])]),n("div",{staticClass:"bg zjbd"},[n("p",{staticClass:"title"},[e._v("中奖榜单")]),n("div",{staticClass:"box"},[n("div",{staticClass:"list",attrs:{id:"maqBox"}},[e.winList.length>0?n("ul",{class:{anim:!0===e.animate},attrs:{id:"con1"}},e._l(e.winList,function(t,a){return n("li",{key:a},[n("span",[e._v(e._s(t.nick))]),n("span",{staticClass:"ellipsis"},[e._v(e._s(t.price))]),n("span",[e._v(e._s(t.time))])])}),0):n("p",{staticClass:"noprizelist"},[e._v("暂无中奖纪录")])])])]),n("div",{staticClass:"bg info"},[n("p",{staticClass:"title"},[e._v("活动规则")]),n("div",{staticClass:"rule_box box"},[n("div",[n("p",[e._v(e._s(e.gameDetail.gameIntroduction))])])])]),n("div",{directives:[{name:"show",rawName:"v-show",value:(1===this.prize.prizeType||2===this.prize.prizeType)&&this.clear,expression:"(this.prize.prizeType === 1 || this.prize.prizeType === 2) && this.clear "}],staticClass:"win_cash alert"},[n("div",{staticClass:"wrapper_box"},[n("h3",{staticClass:"title"},[e._v("恭喜您")]),n("div",{staticClass:"alert_main"},[1===e.prize.prizeType?[n("p",{staticClass:"win_score_info"},[e._v("\n                获得"),n("span",{staticClass:"score"},[e._v(e._s(e.prize.prizeIntegral))]),e._v("积分\n              ")]),n("div",{staticClass:"win_score_box"},[n("img",{attrs:{src:a("41d7"),alt:""}}),n("span",{staticClass:"score_"},[e._v(e._s(e.prize.prizeIntegral))])]),n("p",{staticClass:"win_score_detail"},[n("span",{staticClass:"score"},[e._v(e._s(e.prize.prizeIntegral))]),e._v("积分已放入您的账户中\n              ")])]:e._e(),2===e.prize.prizeType?[n("p",{staticClass:"win_cash_info"},[e._v("获得1张\n                "),n("span",{staticClass:"cash ellipsis"},[e._v(e._s(e.prize.cardName))])]),n("div",{staticClass:"win_cash_box"},[n("img",{attrs:{src:a("44a6"),alt:""}}),n("span",{staticClass:"cash_"},[0===e.prize.cardType?[n("i",[e._v("￥")]),e._v(e._s(e.prize.cardDenomination)+"\n                  ")]:1===e.prize.cardType?[e._v("\n                    "+e._s(e.prize.cardDenomination)+"折\n                  ")]:[e._v("兑换")]],2),n("span",{staticClass:"quan"},[e._v("券")])]),n("p",{staticClass:"win_cash_detail"},[n("span",{staticClass:"cash"},[e._v(e._s(e.prize.cardName))]),e._v("已放入您的账户中\n              ")])]:e._e(),n("p",{staticClass:"win_cash_des"},[e._v(" 可在“我的-中奖记录”中查看")]),n("div",{staticClass:"win_cash_btn"},[n("button",{staticClass:"again",on:{click:e.close}},[e._v("\n                  "+e._s(1===e.prize.cardType?"再来一次":"确定")+"\n                ")]),1===e.prize.cardType?n("button",{staticClass:"get",on:{click:e.getPrize}},[e._v("立即领取")]):e._e()])],2),n("button",{staticClass:"close",on:{click:e.close}})])]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.showFail,expression:"showFail"}],staticClass:"fail alert"},[n("div",{staticClass:"wrapper_box"},[n("h3",{staticClass:"title"},[e._v("很遗憾")]),n("div",{staticClass:"alert_main"},[n("div",{staticClass:"win_fail_box"},[n("img",{attrs:{src:a("7d8e"),alt:""}})]),n("p",{staticClass:"win_score_detail"},[e._v(" 很遗憾")]),n("p",{staticClass:"win_score_des"},[e._v("没有获得任何奖品…")]),n("div",{staticClass:"win_score_btn"},[n("button",{staticClass:"again",on:{click:e.close}},[e._v("再来一次")])])]),n("button",{staticClass:"close",on:{click:e.close}})])]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.showMyPrize,expression:"showMyPrize"}],staticClass:"award_list alert",attrs:{scroll:"no"}},[n("div",{staticClass:"list_main"},[n("div",{staticClass:"close",on:{click:e.close}}),e._m(0),n("div",{staticClass:"award_main"},[n("dm-my-win-record",{attrs:{gameType:e.ggk,skinName:e.gameDetail.skinName,myWinRecordList:e.myWinRecordList,code:e.myWinRecordCode}})],1)])]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.integralLess,expression:"integralLess"}],staticClass:"score_no alert"},[n("div",[n("span",[e._v(e._s(e.warnInfo))])])]),n("dmConsumePrompt",{attrs:{ckey:"ggk",integral:e.gameDetail.gameIntegral,skinName:e.gameDetail.skinName,show:e.showPrompt},on:{handleClosePrompt:e.handleClosePrompt,cancel:e.cancel,play:e.play}},[n("span",{attrs:{slot:"consumeWarn"},slot:"consumeWarn"},[e._v(e._s(e.consumeWarn))])]),n("dmPartakeSill",{attrs:{gameName:"ggk",showPartake:e.attendCondition.show,msg:e.attendCondition.tipTitle,imgUrl:e.attendCondition.tipImageUrl}})],1)},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("dl",[a("dd",[e._v("奖品名称")]),a("dt",[e._v("领取状态")])])}],s=a("f347"),r=s["a"],c=r,o=a("2877"),l=Object(o["a"])(c,n,i,!1,null,null,null);t["default"]=l.exports},"1e32":function(e,t,a){e.exports=a.p+"img/bg_01.ee6e0a16.jpg"},"2f22":function(e,t,a){e.exports=a.p+"img/win_icon_score.be95b24e.png"},"2fb7":function(e,t,a){e.exports=a.p+"img/win_icon_score.6c7811ef.png"},"3a66":function(e,t,a){e.exports=a.p+"img/fail.5726af8e.png"},"3fed":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAW8AAACcCAYAAACwTSoXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVCNDIzMUNBNjg2MzExRTg5MzUzQjkzQThDQTM1RDIyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVCNDIzMUNCNjg2MzExRTg5MzUzQjkzQThDQTM1RDIyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUI0MjMxQzg2ODYzMTFFODkzNTNCOTNBOENBMzVEMjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUI0MjMxQzk2ODYzMTFFODkzNTNCOTNBOENBMzVEMjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5uqw7zAAAL50lEQVR42uzd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"},"41d7":function(e,t,a){e.exports=a.p+"img/game-popup-point-bg.5a2932eb.png"},"44a6":function(e,t,a){e.exports=a.p+"img/game-popup-coupon-bg.485dbd1c.png"},"45ef":function(e,t,a){e.exports=a.p+"img/bg_05.b04ee7af.jpg"},5848:function(e,t,a){var n={"./heijin/bg_04.jpg":"e792","./hongjin/bg_04.jpg":"8c51","./nihong/bg_04.jpg":"8a2d"};function i(e){var t=s(e);return a(t)}function s(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}i.keys=function(){return Object.keys(n)},i.resolve=s,e.exports=i,i.id="5848"},"5cc2":function(e,t,a){var n={"./custom/grey.jpg":"f0c4","./heijin/grey.jpg":"79d9","./hongjin/grey.jpg":"6453","./nihong/grey.jpg":"fd78"};function i(e){var t=s(e);return a(t)}function s(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}i.keys=function(){return Object.keys(n)},i.resolve=s,e.exports=i,i.id="5cc2"},"5ff6":function(e,t,a){e.exports=a.p+"img/bg_05.6344a4d8.jpg"},"61a7":function(e,t,a){var n={"./heijin/win_icon_score.png":"2fb7","./hongjin/win_icon_score.png":"9a6d","./nihong/win_icon_score.png":"2f22"};function i(e){var t=s(e);return a(t)}function s(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}i.keys=function(){return Object.keys(n)},i.resolve=s,e.exports=i,i.id="61a7"},6262:function(e,t,a){e.exports=a.p+"img/gua.04b4a2b5.jpg"},6453:function(e,t,a){e.exports=a.p+"img/grey.43658be7.jpg"},"6f5f":function(e,t,a){e.exports=a.p+"img/fail.5726af8e.png"},"73ad":function(e,t,a){var n={"./heijin/bg_05.jpg":"5ff6","./hongjin/bg_05.jpg":"d8e9","./nihong/bg_05.jpg":"45ef"};function i(e){var t=s(e);return a(t)}function s(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}i.keys=function(){return Object.keys(n)},i.resolve=s,e.exports=i,i.id="73ad"},7901:function(e,t,a){e.exports=a.p+"img/bg_01.747bdb63.jpg"},"79d9":function(e,t,a){e.exports=a.p+"img/grey.43658be7.jpg"},"7d8e":function(e,t,a){e.exports=a.p+"img/fail.5726af8e.png"},8092:function(e,t,a){var n={"./custom/gua.jpg":"6262","./heijin/gua.jpg":"d0f0","./hongjin/gua.jpg":"8471","./nihong/gua.jpg":"fb3b"};function i(e){var t=s(e);return a(t)}function s(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}i.keys=function(){return Object.keys(n)},i.resolve=s,e.exports=i,i.id="8092"},"818f":function(e,t,a){},8227:function(e,t,a){var n={"./heijin/bg_03.jpg":"918c","./hongjin/bg_03.jpg":"8688","./nihong/bg_03.jpg":"b87e"};function i(e){var t=s(e);return a(t)}function s(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}i.keys=function(){return Object.keys(n)},i.resolve=s,e.exports=i,i.id="8227"},8471:function(e,t,a){e.exports=a.p+"img/gua.04b4a2b5.jpg"},8688:function(e,t,a){e.exports=a.p+"img/bg_03.60bcb757.jpg"},"8a2d":function(e,t,a){e.exports=a.p+"img/bg_04.abcba9b3.jpg"},"8b12":function(e,t,a){e.exports=a.p+"img/bg_02.725f16ec.jpg"},"8bbf":function(e,t){e.exports=Vue},"8c51":function(e,t,a){e.exports=a.p+"img/bg_04.c6a06f8e.jpg"},"8e57":function(e,t,a){var n={"./custom/fail.png":"7d8e","./heijin/fail.png":"6f5f","./hongjin/fail.png":"c05e","./nihong/fail.png":"3a66"};function i(e){var t=s(e);return a(t)}function s(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}i.keys=function(){return Object.keys(n)},i.resolve=s,e.exports=i,i.id="8e57"},"910a":function(e,t,a){e.exports=a.p+"img/win_icon_cash.35a74223.png"},"918c":function(e,t,a){e.exports=a.p+"img/bg_03.f6d97483.jpg"},"928f":function(e,t,a){e.exports=a.p+"img/bg_01.5fb91184.jpg"},"9a6d":function(e,t,a){e.exports=a.p+"img/win_icon_score.ab6e6aff.png"},"9e34":function(e,t,a){var n={"./heijin/win_icon_cash.png":"3fed","./hongjin/win_icon_cash.png":"910a","./nihong/win_icon_cash.png":"1766"};function i(e){var t=s(e);return a(t)}function s(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}i.keys=function(){return Object.keys(n)},i.resolve=s,e.exports=i,i.id="9e34"},a60d:function(e,t,a){e.exports=a.p+"img/bg_02.fc8c0185.jpg"},b87e:function(e,t,a){e.exports=a.p+"img/bg_03.8035a106.jpg"},bdbb:function(e,t,a){var n={"./custom/bg_01.jpg":"928f","./heijin/bg_01.jpg":"1e32","./hongjin/bg_01.jpg":"f334","./nihong/bg_01.jpg":"7901"};function i(e){var t=s(e);return a(t)}function s(e){var t=n[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}i.keys=function(){return Object.keys(n)},i.resolve=s,e.exports=i,i.id="bdbb"},c05e:function(e,t,a){e.exports=a.p+"img/fail.5726af8e.png"},c606:function(e,t,a){"use strict";var n=a("818f"),i=a.n(n);i.a},d0f0:function(e,t,a){e.exports=a.p+"img/gua.614521ba.jpg"},d14a:function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("8bbf"),i=a.n(n),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:e.skinName,attrs:{id:"ggk"}},[a(e.component,{tag:"component",attrs:{gameWxInfoDetail:e.gameWxInfoDetail,gameId:e.gameId,memberId:e.memberId,warn:e.warn},on:{reset:e.handleReset}})],1)},r=[],c=(a("96cf"),a("3b8d")),o=a("ed08"),l=a("0005"),p={name:"dzp",data:function(){return{gameId:"",memberId:"",integralLess:!1,skinName:"",component:"",gameWxInfoDetail:{},warn:{}}},methods:{getGameWxInfoDetail:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(t,n){var s,r,c,p;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(l["d"])({gameId:t,memberId:n});case 2:s=e.sent,r=s.result.gameDetail,Object(o["d"])(r.gameName),this.gameWxInfoDetail=s.result,this.skinName=r.skinName,"custom"===r.skinName?(c=a("1da9").default,i.a.component("custom",i.a.extend(c)),this.component="custom"):(p=a("d798").default,i.a.component("skin",i.a.extend(p)),this.component="skin");case 8:case"end":return e.stop()}},e,this)}));function t(t,a){return e.apply(this,arguments)}return t}(),checkPermission:function(){var e=this,t=this.gameId,a=this.memberId;Object(l["a"])({activityId:t,memberId:a}).then(function(n){if(e.getGameWxInfoDetail(t,a),"ok"!==n.result.res)throw new Error}).catch(function(){e.warn={info:"您不符合游戏条件",type:1}})},handleReset:function(){this.checkPermission()}},created:function(){if(Object(o["a"])()){var e=Object(o["b"])("gameId"),t=Object(o["b"])("memberId");e&&t?(this.gameId=e,this.memberId=t,this.checkPermission()):alert("信息不全")}}},d=p,m=a("2877"),g=Object(m["a"])(d,s,r,!1,null,null,null),u=g.exports,h=a("365c");i.a.config.productionTip=!1,i.a.prototype.axios=h["a"],i.a.prototype.axios.withCredentials=!0,new i.a({render:function(e){return e(u)}}).$mount("#app")},d798:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"bg"},[n("img",{attrs:{src:e.bannerUrl,alt:""}})]),n("div",{staticClass:"bg bg2"},[n("img",{attrs:{src:a("10fc")("./"+e.gameDetail.skinName+"/bg_02.jpg"),alt:""}}),n("p",{staticClass:"cqcs"},[e.gameDetail.freeCount>0&&1==e.gameDetail.hasIntegral?[1==e.gameDetail.gameFreeDay?[e._v("今日")]:e._e(),e._v("免费次数"),n("strong",[e._v(" "+e._s(e.gameDetail.freeCount)+" 次")])]:[e._v("\n          抽奖需："),n("strong",[e._v(e._s(e.gameDetail.gameIntegral)+" ")]),e._v("积分/次\n        ")]],2),n("div",{staticClass:"eraser_box"},[n("div",{staticClass:"score_box"},[n("span",{staticClass:"myScore"},[e._v(e._s(e.userInfo.accumulatPoints))])]),n("div",{staticClass:"wrapper light"},[n("div",{staticClass:"eraser"},[e.start?n("scratch-card",{ref:"card",attrs:{"element-id":"scratchWrap",ratio:.5,"move-radius":15,skinName:e.gameDetail.skinName,coverImg:a("5cc2")("./"+e.gameDetail.skinName+"/grey.jpg"),"start-callback":e.startCallback,"clear-callback":e.clearCallback}},[n("p",{staticClass:"e_info",attrs:{slot:"result"},slot:"result"},[e._v(e._s(e.winInfo))])]):e._e(),n("img",{directives:[{name:"show",rawName:"v-show",value:!e.start,expression:"!start"}],staticClass:"maskImg",attrs:{src:a("5cc2")("./"+e.gameDetail.skinName+"/grey.jpg"),alt:""}}),n("button",{directives:[{name:"show",rawName:"v-show",value:!e.start,expression:"!start"}],on:{click:e.rollConditions}})],1)])])]),n("div",{staticClass:"bg"},[n("img",{attrs:{src:a("8227")("./"+e.gameDetail.skinName+"/bg_03.jpg"),alt:""}}),n("button",{staticClass:"link",on:{click:e.getPrize}})]),n("div",{staticClass:"bg"},[n("img",{attrs:{src:a("5848")("./"+e.gameDetail.skinName+"/bg_04.jpg"),alt:""}}),n("div",{staticClass:"list",attrs:{id:"maqBox"}},[n("ul",{class:{anim:!0===e.animate},attrs:{id:"con1"}},e._l(e.winList,function(t,a){return n("li",{key:a},[n("span",[e._v(e._s(t.nick))]),n("span",{staticClass:"ellipsis"},[e._v(e._s(t.price))]),n("span",[e._v(e._s(t.time))])])}),0)])]),n("div",{staticClass:"bg info"},[n("img",{attrs:{src:a("73ad")("./"+e.gameDetail.skinName+"/bg_05.jpg"),alt:""}}),n("div",{staticClass:"rule_box"},[n("p",[e._v(e._s(e.gameDetail.gameIntroduction))])])]),n("div",{directives:[{name:"show",rawName:"v-show",value:(1===this.prize.prizeType||2===this.prize.prizeType)&&this.clear,expression:"(this.prize.prizeType === 1 || this.prize.prizeType === 2) && this.clear "}],staticClass:"win_cash alert"},[n("div",{staticClass:"wrapper_box"},["nihong"!==e.gameDetail.skinName?n("h3",{staticClass:"title"},[e._v("恭喜您")]):e._e(),n("div",{staticClass:"alert_main"},[1===e.prize.prizeType?[n("p",{staticClass:"win_score_info"},[e._v("\n                获得"),n("span",{staticClass:"score"},[e._v(e._s(e.prize.prizeIntegral))]),e._v("积分\n              ")]),n("div",{staticClass:"win_score_box"},[n("img",{attrs:{src:a("61a7")("./"+e.gameDetail.skinName+"/win_icon_score.png"),alt:""}}),n("span",{staticClass:"score_"},[e._v(e._s(e.prize.prizeIntegral))])]),n("p",{staticClass:"win_score_detail"},[n("span",{staticClass:"score"},[e._v(e._s(e.prize.prizeIntegral))]),e._v("积分已放入您的账户中\n              ")])]:e._e(),2===e.prize.prizeType?[n("p",{staticClass:"win_cash_info"},[e._v("获得1张\n                "),n("span",{staticClass:"cash ellipsis"},[e._v(e._s(e.prize.cardName))])]),n("div",{staticClass:"win_cash_box"},[n("img",{attrs:{src:a("9e34")("./"+e.gameDetail.skinName+"/win_icon_cash.png"),alt:""}}),n("span",{staticClass:"cash_"},[0===e.prize.cardType?[n("i",[e._v("￥")]),e._v(e._s(e.prize.cardDenomination)+"\n                  ")]:1===e.prize.cardType?[e._v("\n                    "+e._s(e.prize.cardDenomination)+"折\n                  ")]:[e._v("兑换")]],2),n("span",{staticClass:"quan"},[e._v("券")])]),n("p",{staticClass:"win_cash_detail"},[n("span",{staticClass:"cash ellipsis"},[e._v(e._s(e.prize.cardName))]),e._v("已放入您的账户中\n              ")])]:e._e(),n("p",{staticClass:"win_cash_des"},[e._v(" 可在“我的-中奖记录”中查看")]),n("div",{staticClass:"win_cash_btn"},[n("button",{staticClass:"again",on:{click:e.close}},[e._v("\n                  "+e._s(1===e.prize.cardType?"再来一次":"确定")+"\n                ")]),1===e.prize.cardType?n("button",{staticClass:"get",on:{click:e.getPrize}},[e._v("立即领取")]):e._e()])],2),n("button",{staticClass:"close",on:{click:e.close}})])]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.showFail,expression:"showFail"}],staticClass:"fail alert"},[n("div",{staticClass:"wrapper_box"},["nihong"!==e.gameDetail.skinName?n("h3",{staticClass:"title"},[e._v("很遗憾")]):e._e(),n("div",{staticClass:"alert_main"},[n("div",{staticClass:"win_fail_box"},[n("img",{attrs:{src:a("8e57")("./"+e.gameDetail.skinName+"/fail.png"),alt:""}})]),n("p",{staticClass:"win_score_detail"},[e._v(" 很遗憾")]),n("p",{staticClass:"win_score_des"},[e._v("没有获得任何奖品…")]),n("div",{staticClass:"win_score_btn"},[n("button",{staticClass:"again",on:{click:e.close}},[e._v("再来一次")])])]),n("button",{staticClass:"close",on:{click:e.close}})])]),e.showMyPrize?n("div",{staticClass:"award_list alert",attrs:{scroll:"no"}},[n("div",{staticClass:"list_main"},[n("div",{staticClass:"close",on:{click:e.close}}),n("div",{staticClass:"award_main"},[n("dm-my-win-record",{attrs:{gameType:e.ggk,skinName:e.gameDetail.skinName,myWinRecordList:e.myWinRecordList,code:e.myWinRecordCode}})],1)])]):e._e(),n("div",{directives:[{name:"show",rawName:"v-show",value:e.integralLess,expression:"integralLess"}],staticClass:"score_no alert"},[n("div",[n("span",[e._v(e._s(e.warnInfo))])])]),n("dmConsumePrompt",{attrs:{ckey:"ggk",integral:e.gameDetail.gameIntegral,skinName:e.gameDetail.skinName,show:e.showPrompt},on:{handleClosePrompt:e.handleClosePrompt,cancel:e.cancel,play:e.play}},[n("span",{attrs:{slot:"consumeWarn"},slot:"consumeWarn"},[e._v(e._s(e.consumeWarn))])]),n("dmPartakeSill",{attrs:{gameName:"ggk",showPartake:e.attendCondition.show,msg:e.attendCondition.tipTitle,imgUrl:e.attendCondition.tipImageUrl}})],1)},i=[],s=a("f347"),r=s["a"],c=r,o=a("2877"),l=Object(o["a"])(c,n,i,!1,null,null,null);t["default"]=l.exports},d8e9:function(e,t,a){e.exports=a.p+"img/bg_05.e5a4337e.jpg"},ddda:function(e,t,a){e.exports=a.p+"img/bg_02.a652eb71.jpg"},e792:function(e,t,a){e.exports=a.p+"img/bg_04.3258906e.jpg"},e903:function(e,t,a){},f0c4:function(e,t,a){e.exports=a.p+"img/grey.43658be7.jpg"},f334:function(e,t,a){e.exports=a.p+"img/bg_01.5fb91184.jpg"},f347:function(e,t,a){"use strict";var n,i=a("5176"),s=a.n(i),r=(a("96cf"),a("3b8d")),c=a("795b"),o=a.n(c),l=(a("e903"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"scratchCard",attrs:{id:e.elementId}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.showLucky,expression:"showLucky"}],staticClass:"result"},[e._t("result")],2),n("canvas",{attrs:{id:"scratchCanvas"}}),n("img",{staticClass:"guaBg",attrs:{src:a("8092")("./"+e.skinName+"/gua.jpg"),alt:""}})])}),p=[],d=(a("6c7b"),a("c5f6"),{name:"vueScratchCard",data:function(){return{supportTouch:!1,events:[],startMoveHandler:null,moveHandler:null,endMoveHandler:null,showLucky:!1,firstTouch:!0}},props:{skinName:{type:String,default:"heijin"},elementId:{type:String,default:"scratch"},moveRadius:{type:Number,default:15},ratio:{type:Number,default:.5},startCallback:{type:Function},clearCallback:{type:Function},coverColor:{type:String,default:"#C5C5C5"},coverImg:{type:String}},mounted:function(){var e=this;this.$nextTick(function(){e.init()})},methods:{init:function(){if(this.isSupportCanvas()){var e=document.getElementById(this.elementId);this.canvas=e.querySelector("#scratchCanvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=e.clientWidth+1,this.canvas.height=e.clientHeight+1,this.createCanvasStyle(),this.bindEvent()}else alert("当前浏览器不支持canvas")},isSupportCanvas:function(){var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))},createCanvasStyle:function(){var e=this;if(this.coverImg){var t=new Image;t.src=this.coverImg,t.onload=function(){e.ctx.drawImage(t,0,0,e.canvas.width,e.canvas.height)}}else e.ctx.fillStyle=e.coverColor,e.ctx.fillRect(0,0,e.canvas.width,e.canvas.height)},bindEvent:function(){"ontouchstart"in window&&(this.supportTouch=!0),this.events=this.supportTouch?["touchstart","touchmove","touchend"]:["mousedown","mousemove","mouseup"],this.addEvent()},addEvent:function(){this.startMoveHandler=this.startEventHandler.bind(this),this.canvas.addEventListener(this.events[0],this.startMoveHandler,!1)},startEventHandler:function(e){e.preventDefault(),this.firstTouch&&(this.startCallback(),this.firstTouch=!1),this.showLucky=!0,this.moveHandler=this.moveEventHandler.bind(this),this.endMoveHandler=this.endEventHandler.bind(this),this.canvas.addEventListener(this.events[1],this.moveHandler,!1),document.addEventListener(this.events[2],this.endMoveHandler,!1)},moveEventHandler:function(e){e.preventDefault(),e=this.supportTouch?e.touches[0]:e;var t=this.canvas.getBoundingClientRect(),a=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.scrollLeft||document.body.scrollLeft,i=e.pageX-t.left-n,s=e.pageY-t.top-a;this.ctx.beginPath(),this.ctx.fillStyle="#FFFFFF",this.ctx.globalCompositeOperation="destination-out",this.ctx.arc(i,s,this.moveRadius,0,2*Math.PI),this.ctx.fill()},endEventHandler:function(e){e.preventDefault(),this.canvas.removeEventListener(this.events[1],this.moveHandler,!1),document.removeEventListener(this.events[2],this.endMoveHandler,!1),this.endMoveHandler=null,this.caleArea()},caleArea:function(){var e=this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height),t=[];e.data.map(function(a,n){var i=e.data[n+3];0===i&&t.push(i)}),t.length/e.data.length>this.ratio&&(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.canvas.removeEventListener(this.events[0],this.startMoveHandler),this.canvas.removeEventListener(this.events[1],this.moveHandler,!1),document.removeEventListener(this.events[2],this.endMoveHandler,!1),this.clearCallback())}}}),m=d,g=(a("c606"),a("2877")),u=Object(g["a"])(m,l,p,!1,null,null,null),h=u.exports,v=a("c333"),f=a("3538"),b=a("5c65"),w=a("ed08"),_=a("0faa"),C=a("0005"),y="#D8043D";t["a"]={props:{gameId:{type:String,required:!0},memberId:{type:String,required:!0},gameWxInfoDetail:{type:Object,required:!0},warn:{type:Object,required:!0}},data:function(){return{loading:!1,firstTime:!0,show:!1,bannerUrl:"",integralLess:!1,showMyPrize:!1,showGameResult:!1,winInfo:"",prize:{prizeId:"",prizeType:"",prizeIntegral:0,cardName:"",cardType:"",cardDenomination:0},animate:!1,winList:[],gameDetail:{gameId:"",skinName:"heijin",gameIntroduction:"",freeCount:0,gameFreeDay:null,hasIntegral:0},userInfo:{accumulatPoints:0},myWinRecordList:[],myWinRecordCode:"",warnInfo:"",showPrompt:!1,closePrompt:!1,start:!1,clear:!1,attendCondition:{show:!1},consumeWarn:""}},components:{scratchCard:h,dmMyWinRecord:v["a"],dmConsumePrompt:f["a"],dmPartakeSill:b["a"]},computed:{showFail:function(){return 1!==this.prize.prizeType&&2!==this.prize.prizeType&&""!==this.prize.prizeType&&this.clear}},watch:{showMyPrize:function(e){var t="auto";e&&(t="hidden"),document.getElementsByTagName("body")[0].style.overflow=t},gameWxInfoDetail:{handler:function(e){var t=this,a=this.gameId,n=this.memberId,i=this.warn;this.setGameWxInfoDetail(),i.info?1===i.type&&(this.attendCondition.show=!0):(this.getGameWinRecord(a),Object(C["e"])({memberId:n}).then(function(e){t.userInfo.accumulatPoints=e.result.accumulatPoints||0}))},immediate:!0,deep:!0}},methods:{handleClosePrompt:function(e){this.closePrompt=e},getPrize:function(){var e=this,t=this.memberId,a=this.gameId;Object(C["f"])({gameId:a,memberId:t}).then(function(t){t.success&&(e.myWinRecordList=t.list,e.myWinRecordCode=t.result,e.prize.prizeType="",e.integralLess=!1,e.showMyPrize=!0)})},close:function(){this.start=!1,this.prize.prizeType="",this.showGameResult=!1,this.showMyPrize=!1,this.clear=!1,clearInterval(n),this.$emit("reset")},scroll:function(){var e=this;this.animate=!0,setTimeout(function(){e.winList.push(e.winList[0]),e.winList.shift(),e.animate=!1},500)},rollConditions:function(){var e=this,t=this.gameDetail,a=t.gameTime,n=t.limitCount,i=t.gameLimitDay,s=t.hasIntegral,r=t.gameLimitCount;new o.a(function(e,t){2===a?0===n?0===i?t(new Error("抱歉，您最多可参与".concat(r,"次"))):1==i&&t(new Error("今日最多可参与".concat(r,"次"))):0===s?t(new Error("对不起，您的积分不足，去赚点积分再来吧")):e():t("3"==a?new Error("游戏已结束"):new Error("游戏未开始"))}).then(function(){e.closePrompt?e.play():(e.gameDetail.freeCount>0&&1==e.gameDetail.hasIntegral?e.consumeWarn="您的免费次数还有".concat(e.gameDetail.freeCount,"次"):e.consumeWarn="每次游戏将消耗".concat(e.gameDetail.gameIntegral,"积分"),e.showPrompt=!0)}).catch(function(t){e.warnInfo=t.message,e.integralLess=!0})},getGoal:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,a,n,i,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=this.gameDetail,a=t.gameId,n=t.hasIntegral,this.loading){e.next=10;break}return this.loading=!0,e.next=5,Object(C["b"])({gameId:a,hasIntegral:n,memberId:this.memberId});case 5:i=e.sent,s=i.result,s&&null!=s&&3!=s.prizeType?(this.winInfo="中奖了",this.prize.prizeType=s.prizeType,this.prize.prizeIntegral=s.prizeIntegral,this.prize.wechatCardId=s.wechatCardId,this.prize.winRecordCode=s.winRecordCode,this.prize.cardType=s.cardType,this.prize.cardDenomination=s.cardDenomination,this.prize.cardName=Object(w["e"])(s.cardName)):(this.winInfo="很遗憾没中奖",this.prize.prizeType=3),this.start=!0,this.loading=!1;case 10:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),startCallback:function(){},clearCallback:function(){this.clear=!0},setGameWxInfoDetail:function(){var e=this,t=this.gameWxInfoDetail,n=t.gameDetail,i=t.shareLink,r=t.attendCondition;s()(this.gameDetail,n),"custom"===n.skinName&&(document.getElementById("ggk").style.backgroundColor=this.gameDetail.background||y),-1===n.gameImageUrl.indexOf("http")?this.bannerUrl=a("bdbb")("./".concat(n.skinName,"/bg_01.jpg")):this.bannerUrl=n.gameImageUrl,s()(this.attendCondition,r),this.firstTime&&(this.firstTime=!1,n.shareFlag?Object(_["b"])(this.memberId,n.shareSetting,i,"ggk"):Object(_["a"])(this.memberId)),setTimeout(function(){e.show=!0},0)},getGameWinRecord:function(e){var t=this;Object(C["c"])({gameId:e}).then(function(e){e.success&&(t.winList=e.list.map(function(e){return{nick:"".concat(e.memberName.substring(0,1),"***").concat(e.memberName.substring(e.memberName.length-1,e.memberName.length)),price:e.winPrize,time:e.winDate}}),t.winList.length>7&&(n=setInterval(t.scroll,1e3)))})},cancel:function(){this.showPrompt=!1},play:function(){this.showPrompt=!1,this.getGoal()}},destroyed:function(){n=null}}},fb3b:function(e,t,a){e.exports=a.p+"img/gua.3457b936.jpg"},fd78:function(e,t,a){e.exports=a.p+"img/grey.43658be7.jpg"}});
//# sourceMappingURL=ggk.8e5a2a48.js.map