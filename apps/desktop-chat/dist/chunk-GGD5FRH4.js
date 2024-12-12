import{a as st,b as lt,c as re,d as O,e as de,f as ge,g as ue,h as fe}from"./chunk-GBYOLZIV.js";import{B as $,D as pt,E as mt,H as _e,K as dt,N as P,f as rt,i as Me,j as J,k as at,m as Ee,p as I,q as A,r as ae,s as se,t as le,u as ce,w as pe,x as ct,z as me}from"./chunk-NRCUZMYI.js";import{a as nt,j as ot}from"./chunk-2YMSGO5Z.js";import{$ as g,$a as m,$b as Xe,A as Oe,Ab as f,B as $e,Bb as E,Cb as V,E as Q,G as Pe,Gb as Ke,Ha as Be,Hb as j,I as He,J as Z,Ka as r,La as ye,Ob as z,P as Le,Pb as K,Rb as Je,S as h,Ta as T,V as Qe,Va as Ge,W as ee,Ya as u,Zb as oe,_a as w,a as X,ab as U,b as Y,bb as We,bc as Ye,da as S,db as D,ea as te,eb as qe,fb as B,ga as Ue,gb as G,hb as W,ib as q,jb as l,kb as c,lb as _,mb as Te,na as v,nb as be,oa as x,pb as M,pc as Ze,qb as y,rb as p,rc as et,s as je,sb as Ie,sc as tt,tb as Se,tc as it,ub as ze,uc as b,va as xe,vb as we,wb as ie,xb as k,ya as F,yb as R,z as ve,za as N,zb as ne}from"./chunk-PXKDPD7B.js";var Ae=function(e){return e.Idle="IDLE",e.Sending="SENDING",e.SendingSuccess="SENDING_SUCCESS",e.SendingFail="SENDING_FAIL",e.NewMessage="NEW_MESSAGE_INCOMMING",e}(Ae||{}),ke=function(e){return e.Idle="IDLE",e.NewConversationComming="NEW_CONVERSATION_COMMING",e}(ke||{});var Re={conversations:[],status:ke.Idle};var gt=(()=>{class e{http=g(nt);appConfig=ct();baseUrl="";constructor(){this.baseUrl=this.appConfig.apiUrl+"/"}getConversations(t={limit:10,profileId:-1}){return this.http.post(`${this.baseUrl}conversation/search`,t)}static \u0275fac=function(i){return new(i||e)};static \u0275prov=Qe({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Fe=ae(ce(Re),le((e,a=g(gt),t=g($),i=me())=>({resotreMessageToConversation(n,o){let s=A(e).conversations,d=o.filter(C=>!C.isOld);s.length==0?s.push({id:n,messages:o}):s.forEach(C=>{C.id===n&&(d.forEach(Ve=>Ve.isOld=!0),C.messages?C.messages=[...C.messages,...d]:C.messages=[])}),I(e,{conversations:s})},getConversationMessages(n){return A(e).conversations.find(o=>o.id==n)?.messages},reset(){I(e,Re)},getConversations(){a.getConversations({profileId:t.user()?.profile?.id,limit:10}).pipe(h(n=>{console.log("conversations: ",n.data),I(e,{conversations:n.data?.filter?.(o=>o.lastMessage.id!==t.user()?.profile?.id)})})).subscribe()},joinRoom(n,o){console.log("joinRoom: ",n,o),i.joinRoom(n,o)},leaveRoom(n,o){console.log("leaveRoom: ",n,o),i.leaveRoom(n,o)},registerNewMessageConversation(){i.listen(pe.NEW_LAST_MESSAGE).pipe(h(n=>{let o=A(e).conversations;o.forEach(s=>{s.id===n?.conversationId&&(s.lastMessage=Y(X({},s.lastMessage),{isSender:t.user()?.profile?.id==n.senderId,content:n.content,timeSend:n.timeSend}))}),o.sort((s,d)=>new Date(s?.lastMessage?.timeSend).getTime()-new Date(d?.lastMessage?.timeSend).getTime()),I(e,{conversations:o}),console.log("NEW_LAST_MESSAGE: ",n),console.log("new conversations: ",o)})).subscribe()}})),se({onInit(e){e.getConversations(),e.registerNewMessageConversation()},onDestroy(e){e.reset()}}));var ht=["*"];function vt(e,a){if(e&1){let t=M();l(0,"img",6),y("error",function(n){v(t);let o=p(2);return x(o.imageError(n))}),c()}if(e&2){let t=p(2);m("src",t.image,Be)("alt",t.alt)}}function xt(e,a){if(e&1&&_(0,"span",8),e&2){let t=p(3);D(t.icon),m("ngClass","p-chip-icon"),w("data-pc-section","icon")}}function yt(e,a){if(e&1&&u(0,xt,1,4,"span",7),e&2){let t=p(2);m("ngIf",t.icon)}}function Tt(e,a){if(e&1&&(l(0,"div",9),f(1),c()),e&2){let t=p(2);w("data-pc-section","label"),r(),E(t.label)}}function bt(e,a){if(e&1){let t=M();l(0,"span",13),y("click",function(n){v(t);let o=p(4);return x(o.close(n))})("keydown",function(n){v(t);let o=p(4);return x(o.onKeydown(n))}),c()}if(e&2){let t=p(4);D(t.removeIcon),m("ngClass","pi-chip-remove-icon"),w("data-pc-section","removeicon")("aria-label",t.removeAriaLabel)}}function It(e,a){if(e&1){let t=M();l(0,"TimesCircleIcon",14),y("click",function(n){v(t);let o=p(4);return x(o.close(n))})("keydown",function(n){v(t);let o=p(4);return x(o.onKeydown(n))}),c()}if(e&2){let t=p(4);D("pi-chip-remove-icon"),w("data-pc-section","removeicon")("aria-label",t.removeAriaLabel)}}function St(e,a){if(e&1&&(Te(0),u(1,bt,1,5,"span",11)(2,It,1,4,"TimesCircleIcon",12),be()),e&2){let t=p(3);r(),m("ngIf",t.removeIcon),r(),m("ngIf",!t.removeIcon)}}function wt(e,a){}function Mt(e,a){e&1&&u(0,wt,0,0,"ng-template")}function Et(e,a){if(e&1){let t=M();l(0,"span",15),y("click",function(n){v(t);let o=p(3);return x(o.close(n))})("keydown",function(n){v(t);let o=p(3);return x(o.onKeydown(n))}),u(1,Mt,1,0,null,16),c()}if(e&2){let t=p(3);w("data-pc-section","removeicon")("aria-label",t.removeAriaLabel),r(),m("ngTemplateOutlet",t.removeIconTemplate)}}function At(e,a){if(e&1&&(Te(0),u(1,St,3,2,"ng-container",5)(2,Et,2,3,"span",10),be()),e&2){let t=p(2);r(),m("ngIf",!t.removeIconTemplate),r(),m("ngIf",t.removeIconTemplate)}}function kt(e,a){if(e&1&&(l(0,"div",2),Se(1),u(2,vt,1,2,"img",3)(3,yt,1,1,"ng-template",null,0,Je)(5,Tt,2,2,"div",4)(6,At,3,2,"ng-container",5),c()),e&2){let t=ne(4),i=p();D(i.styleClass),m("ngClass",i.containerClass())("ngStyle",i.style),w("data-pc-name","chip")("aria-label",i.label)("data-pc-section","root"),r(2),m("ngIf",i.image)("ngIfElse",t),r(3),m("ngIf",i.label),r(),m("ngIf",i.removable)}}var ut=(()=>{class e{label;icon;image;alt;style;styleClass;removable=!1;removeIcon;onRemove=new xe;onImageError=new xe;config=g(rt);visible=!0;removeIconTemplate;get removeAriaLabel(){return this.config.getTranslation(at.ARIA).removeLabel}templates;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"removeicon":this.removeIconTemplate=t.template;break;default:this.removeIconTemplate=t.template;break}})}containerClass(){return{"p-chip p-component":!0,"p-chip-image":this.image!=null}}close(t){this.visible=!1,this.onRemove.emit(t)}onKeydown(t){(t.key==="Enter"||t.key==="Backspace")&&this.close(t)}imageError(t){this.onImageError.emit(t)}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=S({type:e,selectors:[["p-chip"]],contentQueries:function(i,n,o){if(i&1&&we(o,Me,4),i&2){let s;k(s=R())&&(n.templates=s)}},hostAttrs:[1,"p-element"],inputs:{label:"label",icon:"icon",image:"image",alt:"alt",style:"style",styleClass:"styleClass",removable:[2,"removable","removable",Xe],removeIcon:"removeIcon"},outputs:{onRemove:"onRemove",onImageError:"onImageError"},features:[Ge],ngContentSelectors:ht,decls:1,vars:1,consts:[["iconTemplate",""],[3,"ngClass","class","ngStyle",4,"ngIf"],[3,"ngClass","ngStyle"],[3,"src","alt","error",4,"ngIf","ngIfElse"],["class","p-chip-text",4,"ngIf"],[4,"ngIf"],[3,"error","src","alt"],[3,"class","ngClass",4,"ngIf"],[3,"ngClass"],[1,"p-chip-text"],["tabindex","0","class","pi-chip-remove-icon","role","button",3,"click","keydown",4,"ngIf"],["tabindex","0","role","button",3,"class","ngClass","click","keydown",4,"ngIf"],["tabindex","0","role","button",3,"class","click","keydown",4,"ngIf"],["tabindex","0","role","button",3,"click","keydown","ngClass"],["tabindex","0","role","button",3,"click","keydown"],["tabindex","0","role","button",1,"pi-chip-remove-icon",3,"click","keydown"],[4,"ngTemplateOutlet"]],template:function(i,n){i&1&&(Ie(),u(0,kt,7,11,"div",1)),i&2&&m("ngIf",n.visible)},dependencies:()=>[Ze,et,it,tt,Ee],styles:[`@layer primeng{.p-chip{display:inline-flex;align-items:center}.p-chip-text,.p-chip-icon.pi,.pi-chip-remove-icon.pi{line-height:1.5}.pi-chip-remove-icon{cursor:pointer}.p-chip img{border-radius:50%}}
`],encapsulation:2,changeDetection:0})}return e})(),Ce=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=te({type:e});static \u0275inj=ee({imports:[b,Ee,J,J]})}return e})();var L=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=te({type:e});static \u0275inj=ee({imports:[b,J]})}return e})();var he=(()=>{class e{cdr;currentValue;timer;defaultIntervelTime=3e4;constructor(t){this.cdr=t}transform(t,i){if(!t)return"";let n=new Date(t);return this.currentValue=this.calculateTimeAgo(n),this.clearTimer(),this.timer=setInterval(()=>{this.currentValue=this.calculateTimeAgo(n),this.cdr.markForCheck()},i||this.defaultIntervelTime),this.currentValue}calculateTimeAgo(t){let n=new Date().getTime()-t.getTime(),o=Math.floor(n/1e3),s=Math.floor(o/60),d=Math.floor(s/60),C=Math.floor(d/24),Ve=Math.floor(C/7);return s<1?"Just now":s<60?`${s} ${s==1?"min":"mins"} ago`:d<24?`${d} ${d==1?"hour":"hours"} ago`:C<7?`${C} day${C>1?"s":""} ago`:this.formatDate(t)}formatDate(t){let i={hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit",year:"numeric"};return t.toLocaleDateString("en-GB",i).replace(",","")}clearTimer(){this.timer&&(clearInterval(this.timer),this.timer=null)}ngOnDestroy(){this.clearTimer()}static \u0275fac=function(i){return new(i||e)(ye(oe,16))};static \u0275pipe=Ue({name:"timeAgo",type:e,pure:!1,standalone:!0})}return e})();function Vt(e,a){if(e&1){let t=M();l(0,"p-chip",14),y("click",function(){let n=v(t),o=n.$implicit,s=n.$index,d=p();return x(d.onSelectMessageCategory(o,s))}),c()}if(e&2){let t,i=a.$implicit,n=a.$index,o=p();We("selected",((t=o.selectedMessageCategory())==null?null:t.index)===n),ze("label",i.label)}}function jt(e,a){e&1&&_(0,"p-inputIcon",9)}function Ot(e,a){e&1&&_(0,"p-inputIcon",10)}function $t(e,a){if(e&1&&_(0,"p-avatar",16),e&2){let t=p().$implicit;m("image",t.receiver.avatarUrl)}}function Pt(e,a){e&1&&_(0,"p-avatar",17)}function Ht(e,a){if(e&1){let t=M();l(0,"section",15),y("click",function(){let n=v(t),o=n.$implicit,s=n.$index,d=p();return x(d.onSelectConversation(o,s))}),u(1,$t,1,1,"p-avatar",16)(2,Pt,1,0,"p-avatar",17),l(3,"section",18)(4,"span",19),f(5),c(),l(6,"div",20)(7,"span",21),f(8),c(),l(9,"span",22),f(10),z(11,"timeAgo"),c()()()()}if(e&2){let t,i=a.$implicit,n=a.$index,o=p();qe("w-full flex column-gap-2 min-h-max hover:bg-gray-800 ",((t=o.selectedConversation())==null?null:t.index)===n?"bg-gray-800":"bg-gray-900"," py-2 px-2 border-round-md cursor-pointer  transition-duration-200"),r(),B(i.receiver.avatarUrl?1:2),r(4),E(i.receiver.fullName),r(3),E(i.lastMessage.content),r(2),E(K(11,7,i.lastMessage.timeSend))}}var ft=(()=>{class e{conversations=N();messageCategoies=N();searchConversationChanges=F();selectConversationChanges=F();selecteMessageCategoryChanges=F();searching=T(!1);searchControl=new _e("");selectedConversation=T({value:null,index:-1});selectedMessageCategory=T({value:null,index:-1});ngOnInit(){this.registerValueChanges()}registerValueChanges(){this.searchControl.valueChanges.pipe(Q(200),Z(),h(t=>{this.searching.set(!0),this.searchConversationChanges.emit(t)}),He(2e3),h(()=>this.searching.set(!1))).subscribe()}onSelectConversation(t,i){i!=this.selectedConversation()?.index&&(this.selectedConversation.set({value:t,index:i}),this.selectConversationChanges.emit(t))}onSelectMessageCategory(t,i){i!=this.selectedMessageCategory()?.index&&(this.selectedMessageCategory.set({value:t,index:i}),this.selecteMessageCategoryChanges.emit(t))}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=S({type:e,selectors:[["lib-conversation"]],inputs:{conversations:[1,"conversations"],messageCategoies:[1,"messageCategoies"]},outputs:{searchConversationChanges:"searchConversationChanges",selectConversationChanges:"selectConversationChanges",selecteMessageCategoryChanges:"selecteMessageCategoryChanges"},standalone:!0,features:[j],decls:17,vars:4,consts:[["titleSection",""],["categorySection",""],[1,"w-full","h-full"],[1,"message-title","pt-4","px-2"],[1,"text-2xl","pt-0"],[1,"w-full","mt-3","px-2"],["pRipple","",1,"mr-2","cursor-pointer","transition-duration-200","min-w-max",3,"label","selected"],[1,"w-full","my-2","px-2"],["iconPosition","right"],["styleClass","pi pi-spinner pi-spin"],["styleClass","pi pi-search"],["type","text","pInputText","","placeholder","Typing user or message...",1,"py-2","transition-duration-300","h-3rem","text-base","text-color","surface-ground","p-2","border-1","border-solid","surface-border","border-round","appearance-none","outline-none","focus:border-primary","w-full",3,"formControl"],[1,"flex","flex-column","gap-2","mt-2","overflow-y-auto","py-2","hidden-scrollbar"],[3,"class"],["pRipple","",1,"mr-2","cursor-pointer","transition-duration-200","min-w-max",3,"click","label"],[3,"click"],["size","large","shape","circle",3,"image"],["label","P","size","large","shape","circle"],[1,"w-full"],[1,"flex-1"],[1,"mt-2","flex","w-full"],[1,"flex-1","text-xs"],[1,"text-xs"]],template:function(i,n){i&1&&(l(0,"aside",2)(1,"section",3,0)(3,"span",4),f(4,"Messages (10)"),c()(),l(5,"section",5,1),W(7,Vt,1,3,"p-chip",6,G),c(),l(9,"section",7)(10,"p-iconField",8),u(11,jt,1,0,"p-inputIcon",9)(12,Ot,1,0,"p-inputIcon",10),_(13,"input",11),c()(),l(14,"section",12),W(15,Ht,12,9,"section",13,G),c()()),i&2&&(r(7),q(n.messageCategoies()),r(4),B(n.searching()?11:12),r(2),m("formControl",n.searchControl),r(),U("height","calc(100% - 150px)"),r(),q(n.conversations()))},dependencies:[Ce,ut,L,he,b,O,re,ge,de,fe,ue,P,pt,mt,dt]})}return e})();var Lt=["wrapperMessageContent"],Qt=["messageListRef"],Ut=["chatControlRef"];function Bt(e,a){if(e&1&&(l(0,"section",18)(1,"div",20),f(2),c(),l(3,"p",21),f(4),z(5,"timeAgo"),c()()),e&2){let t=p().$implicit;r(2),V(" ",t.content," "),r(2),V(" ",K(5,2,t.timeSend)," ")}}function Gt(e,a){if(e&1&&(l(0,"section",19)(1,"div",20),f(2),c(),l(3,"p",21),f(4),z(5,"timeAgo"),c()()),e&2){let t=p().$implicit;r(2),V(" ",t.content," "),r(2),V(" ",K(5,2,t.timeSend)," ")}}function Wt(e,a){if(e&1&&u(0,Bt,6,4,"section",18)(1,Gt,6,4,"section",19),e&2){let t=a.$implicit;B(t.isSender?0:1)}}var _t=(()=>{class e{messages=N([]);sender=N();sendMessage=F();wrapperMessageContent;messageListRef;chatControlRef;originalMessageContentHeight=T(0);originalMessageActionHeight=T(60);chatControl=new _e("");cd=g(oe);computedMessageContentHeight=Ye(()=>(console.log("Re computedMessageContentHeight"),`${this.originalMessageContentHeight()-this.originalMessageActionHeight()}px`));screenSize$=ve(window,"resize").pipe(je(()=>({width:window.innerWidth,height:window.innerHeight})),Q(50),Le({width:window.innerWidth,height:window.innerHeight}));ngAfterViewInit(){this.registerValueChanges(),this.originalMessageContentHeight.set(this.wrapperMessageContent.nativeElement.offsetHeight),this.scrollToBottom()}registerValueChanges(){this.chatControl.valueChanges.pipe(h(t=>{console.log("chatControl: ",t)})).subscribe(),ve(this.chatControlRef.nativeElement,"keyup").pipe(Q(10),$e(t=>t.keyCode===13),Z(),h(t=>{this.sendMessage.emit(t?.target?.value),this.chatControlRef.nativeElement.value=""})).subscribe(),this.screenSize$.pipe(h(()=>{this.originalMessageContentHeight.set(this.wrapperMessageContent.nativeElement.offsetHeight),this.cd.detectChanges(),this.scrollToBottom()})).subscribe()}scrollToBottom(){this.messageListRef&&Oe(100).pipe(Pe(1)).subscribe(()=>{this.messageListRef.nativeElement.scrollTo({top:this.messageListRef.nativeElement.scrollHeight,behavior:"smooth"})})}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=S({type:e,selectors:[["lib-chatting"]],viewQuery:function(i,n){if(i&1&&(ie(Lt,7),ie(Qt,7),ie(Ut,7)),i&2){let o;k(o=R())&&(n.wrapperMessageContent=o.first),k(o=R())&&(n.messageListRef=o.first),k(o=R())&&(n.chatControlRef=o.first)}},inputs:{messages:[1,"messages"],sender:[1,"sender"]},outputs:{sendMessage:"sendMessage"},standalone:!0,features:[j],decls:21,vars:7,consts:[["wrapperMessageContent",""],["messageListRef",""],["chatControlRef",""],[1,"w-full","h-full"],[1,"pt-3","pb-1","border-bottom-1","border-blue-900","w-full","column-gap-3","flex","min-h-max","px-4","flex","align-items-center"],[1,"w-full","column-gap-3","flex"],["size","large","shape","circle",3,"image"],[1,"w-full","flex","flex-column"],[1,"mb-1"],[1,"text-xs","text-color"],[1,"ml-auto","h-full","flex","align-items-center"],["tooltipPosition","right",1,"pi","pi-info-circle","text-2xl","text-color","cursor-pointer",3,"pTooltip"],[1,"w-full","relative",2,"height","calc(100% - 73px)"],[1,"overflow-y-auto","mt-2","px-2"],[1,"fixed","bottom-0"],["iconPosition","right",1,"w-full"],["styleClass","pi pi-send","tooltipPosition","right"],["type","text","pInputText","","placeholder","Typing message...",1,"py-2","transition-duration-300","h-3rem","text-base","text-color","surface-ground","p-2","border-1","border-solid","surface-border","border-round","appearance-none","outline-none","focus:border-primary","w-full"],[1,"ml-auto","mb-4","col-6","column-gap-2","min-h-max","bg-blue-700","py-2","px-2","border-round-bottom-2xl","border-round-left-2xl","cursor-pointer","transition-duration-200"],[1,"mr-auto","mb-4","col-6","column-gap-2","min-h-max","bg-gray-800","py-2","px-2","border-round-bottom-2xl","border-round-right-2xl","cursor-pointer","transition-duration-200"],[1,"text-sm"],[1,"text-xs","p-0","mx-0","mb-0","mt-2","font-italic"]],template:function(i,n){if(i&1&&(l(0,"section",3)(1,"section",4)(2,"section",5),_(3,"p-avatar",6),l(4,"section",7)(5,"span",8),f(6),c(),_(7,"div",9),c()(),l(8,"section",10),_(9,"i",11),c()(),l(10,"section",12,0)(12,"section",13,1),W(14,Wt,2,1,null,null,G),c(),l(16,"section",14)(17,"p-iconField",15),_(18,"p-inputIcon",16)(19,"input",17,2),c()()()()),i&2){let o,s,d=ne(11);r(3),m("image",(o=n.sender())==null||o.receiver==null?null:o.receiver.avatarUrl),r(3),E((s=n.sender())==null||s.receiver==null?null:s.receiver.fullName),r(3),m("pTooltip","View infor"),r(3),U("height",n.computedMessageContentHeight()),r(2),q(n.messages()),r(2),U("width",d.offsetWidth+"px")}},dependencies:[L,he,b,O,re,lt,st,ge,de,fe,ue,P]})}return e})();var Ne={messages:[],members:[],conversationId:-1,conversation:{id:-1,receiver:null},status:Ae.Idle};var De=ae(ce(Ne),le((e,a=g($),t=me())=>({reset(){I(e,Ne)},setConversation(i,n,o){I(e,{conversationId:i,messages:n||[],conversation:{id:i,receiver:o}})},sendMessage(i){let{conversationId:n,conversation:o}=A(e);console.log("Send to: ",o.receiver),t.sendMessage(n,i,a.user().profile?.id,[o.receiver?.id])},subscribeMessage(){t.listen(pe.NEW_MESSAGE).pipe(h(i=>{A(e).messages?.length?I(e,{messages:[...A(e).messages,Ct(i,a.user()?.profile?.id)]}):I(e,{messages:[Ct(i,a.user()?.profile?.id)]})})).subscribe()}})),se({onDestroy(e){e.reset()},onInit(e){e.subscribeMessage()}}));function Ct(e,a){return Y(X({},e),{isSender:e.senderId==a,isReceiver:e.senderId==a,timeSend:new Date().toISOString()})}var Rn=(()=>{class e{appState=g($);chatStore=g(De);conversationStore=g(Fe);messages=this.chatStore.messages;conversations=this.conversationStore.conversations;conversation=T(null);messageCategories=T([{label:"All",selected:!0},{label:"Unread",selected:!1},{label:"Groups",selected:!1}]);onMessageCategoryChanges(t){console.log("onMessageCategoryChanges",t)}onConversationChanges(t){let{id:i}=this.appState.user()?.profile;this.chatStore.conversationId()&&(this.conversationStore.resotreMessageToConversation(this.chatStore.conversationId(),this.chatStore.messages()),this.conversationStore.leaveRoom(this.chatStore.conversationId(),i),this.chatStore.reset()),this.conversation.set(t),this.conversationStore.joinRoom(t.id,i),console.log("event.receiver: ",t.receiver),this.chatStore.setConversation(t.id,this.conversationStore.getConversationMessages(t.id),t.receiver)}onSendMessage(t){this.chatStore.sendMessage(t)}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=S({type:e,selectors:[["lib-chat-feature"]],standalone:!0,features:[Ke([De,Fe]),j],decls:3,vars:4,consts:[[1,"w-full","h-full","grid","overflow-hidden","p-0","m-0"],[1,"hidden","md:block","md:col-4","border-right-1","border-blue-900","h-full",3,"selecteMessageCategoryChanges","selectConversationChanges","messageCategoies","conversations"],[1,"col-12","md:col-8","p-0","h-full",3,"sendMessage","sender","messages"]],template:function(i,n){i&1&&(l(0,"section",0)(1,"lib-conversation",1),y("selecteMessageCategoryChanges",function(s){return n.onMessageCategoryChanges(s)})("selectConversationChanges",function(s){return n.onConversationChanges(s)}),c(),l(2,"lib-chatting",2),y("sendMessage",function(s){return n.onSendMessage(s)}),c()()),i&2&&(r(),m("messageCategoies",n.messageCategories())("conversations",n.conversations()),r(),m("sender",n.conversation())("messages",n.messages()))},dependencies:[Ce,L,b,ot,O,_t,P,ft]})}return e})();export{Rn as ChatFeatureComponent};