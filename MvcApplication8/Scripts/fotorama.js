/*!
 * Fotorama 4.1.15 | http://fotorama.io/license/
 */
!function(a,b,c,d){"use strict";function e(a){var b="bez_"+c.makeArray(arguments).join("_").replace(".","p");if("function"!=typeof c.easing[b]){var d=function(a,b){var c=[null,null],d=[null,null],e=[null,null],f=function(f,g){return e[g]=3*a[g],d[g]=3*(b[g]-a[g])-e[g],c[g]=1-e[g]-d[g],f*(e[g]+f*(d[g]+f*c[g]))},g=function(a){return e[0]+a*(2*d[0]+3*c[0]*a)},h=function(a){for(var b,c=a,d=0;++d<14&&(b=f(c,0)-a,!(Math.abs(b)<.001));)c-=b/g(c);return c};return function(a){return f(h(a),1)}};c.easing[b]=function(b,c,e,f,g){return f*d([a[0],a[1]],[a[2],a[3]])(c/g)+e}}return b}function f(){}function g(a,b,c){return Math.max("number"!=typeof b?-1/0:b,Math.min("number"!=typeof c?1/0:c,a))}function h(a){return a.match(/^m/)&&a.match(/-?\d+/g)[4]}function i(a){return kc?Number(h(a.css("transform"))):Number(a.css("left").replace("px",""))}function j(a){var b={};return kc?b.transform="translate3d("+a+"px,0,0)":b.left=a,b}function k(a){return{"transition-duration":a+"ms"}}function l(a,b){return a=Number(String(a).replace(b||"px","")),isNaN(a)?!1:a}function m(a){var b=l(a,"%");return b&&/%$/.test(a)?b:!1}function n(a){return l(a)||l(a,"%")?a:!1}function o(a,b,c,d){return(a-(d||0))*(b+(c||0))}function p(a,b,c,d){return-Math.round(a/(b+(c||0))-(d||0))}function q(a){var b=a.data();if(!b.tEnd){var c=a[0],d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",msTransition:"MSTransitionEnd",transition:"transitionend"};c.addEventListener(d[T.prefixed("transition")],function(a){b.tProp&&a.propertyName.match(b.tProp)&&b.onEndFn.call(this)}),b.tEnd=!0}}function r(a,b,c){var d,e=a.data();e&&(e.onEndFn=function(){d||(c.call(this),d=!0)},e.tProp=b,q(a))}function s(a){if(kc?(a.css(k(0)),a.data("onEndFn",f)):a.stop(),a.length){var b=i(a);return a.css(j(b)),b}}function t(a,b){return Math.round(a+(b-a)/1.5)}function u(){return u.protocol=u.protocol||("https://"===location.protocol?"https://":"http://"),u.protocol}function v(a){var c=b.createElement("a");return c.href=a,c}function w(a,b){if("string"!=typeof a)return a;a=v(a);var c,d;if(a.host.match(/youtube\.com/)&&a.search){if(c=a.search.split("v=")[1]){var e=c.indexOf("&");-1!==e&&(c=c.substring(0,e)),d="youtube"}}else a.host.match(/youtube\.com|youtu\.be/)?(c=a.pathname.replace(/^\/(embed\/|v\/)?/,"").replace(/\/.*/,""),d="youtube"):a.host.match(/vimeo\.com/)&&(d="vimeo",c=a.pathname.replace(/^\/(video\/)?/,"").replace(/\/.*/,""));return c&&d||!b||(c=a.href,d="custom"),c?{id:c,type:d}:!1}function x(a,b,d){var e,f,g=a.video;return"youtube"===g.type?(f=u()+"img.youtube.com/vi/"+g.id+"/default.jpg",e=f.replace(/\/default.jpg$/,"/hqdefault.jpg"),a.thumbsReady=!0):"vimeo"===g.type?c.ajax({url:u()+"vimeo.com/api/v2/video/"+g.id+".json",dataType:"jsonp",success:function(c){a.thumbsReady=!0,y(b,{img:c[0].thumbnail_large,thumb:c[0].thumbnail_small},a.i,d)}}):a.thumbsReady=!0,{img:e,thumb:f}}function y(a,b,c,d){for(var e=0,f=a.length;f>e;e++){var g=a[e];if(g.i===c&&g.thumbsReady){d.splice(e,1,{i:c,video:g.video,videoReady:!0,caption:g.caption,img:g.img||b.img,thumb:g.thumb||b.thumb});break}}}function z(a){function b(a,b){var c=a.data(),d=a.children("img").eq(0),e=a.attr("href"),f=a.attr("src"),g=d.attr("src"),h=c.video,i=b?w(e,h===!0):!1;return i?e=!1:i=w(h,h),{video:i,img:c.img||e||f||g,thumb:c.thumb||g||f||e}}var d=[];return a.children().each(function(){var a=c(this),e=c.extend(a.data(),{id:this.id});if(a.is("a, img"))c.extend(e,b(a,!0));else{if(a.is(":empty"))return;c.extend(e,{html:this,_html:a.html()})}d.push(e)}),d}function A(a){return 0===a.offsetWidth&&0===a.offsetHeight}function B(a,b,c){a()?b():setTimeout(function(){B(a,b)},c||100)}function C(a){location.replace(location.protocol+"//"+location.host+location.pathname.replace(/^\/?/,"/")+location.search+"#"+a)}function D(a,b,c){var d=a.data(),e=d.measures;if(e&&(!d.l||d.l.W!==e.width||d.l.H!==e.height||d.l.r!==e.ratio||d.l.w!==b.w||d.l.h!==b.h||d.l.m!==c)){var f=e.width,h=e.height,i=b.w/b.h,j=e.ratio>=i,k="scale-down"===c,l="contain"===c,m="cover"===c;j&&(k||l)||!j&&m?(f=g(b.w,0,k?f:1/0),h=f/e.ratio):(j&&m||!j&&(k||l))&&(h=g(b.h,0,k?h:1/0),f=h*e.ratio),a.css({width:Math.round(f),height:Math.round(h),marginLeft:Math.round(-f/2),marginTop:Math.round(-h/2)}),d.l={W:e.width,H:e.height,r:e.ratio,w:b.w,h:b.h,m:c}}}function E(a,b){var c=a[0];c.styleSheet?c.styleSheet.cssText=b:a.html(b)}function F(a,b,c){return b===c?!1:b>=a?"left":a>=c?"right":"left right"}function G(a,b,c){if(!c)return!1;var d=Number(a);if(!isNaN(d))return d-1;for(var e=0,f=b.length;f>e;e++){var g=b[e];if(g.id===a){d=e;break}}return d}function H(a,b,d){d=d||{},a.each(function(){var a,e=c(this),g=e.data();g.clickOn||(g.clickOn=!0,c.extend(M(e,{onStart:function(b){a=b,(d.onStart||f).call(this,b)},onMove:d.onMove||f,onEnd:function(c){c.moved||d.tail.checked||b.call(this,a)}}),d.tail))})}function I(a,b){return'<div class="'+a+'">'+(b||"")+"</div>"}function J(a,b){var d=Math.round(b.pos),e=b.onEnd||f;"undefined"!=typeof b.overPos&&b.overPos!==b.pos&&(d=b.overPos,e=function(){J(a,c.extend({},b,{overPos:b.pos,time:Math.max(nc,b.time/2)}))});var g=j(d);kc?(a.css(c.extend(k(b.time),g)),b.time>10?r(a,"transform",e,b.time):e()):a.stop().animate(g,b.time,tc,e)}function K(a,b,d,e){var g=a,h=b,i="crossfade"===e.method;K.$el1=a=a||c(a),K.$el2=b=b||c(b);var j=function(){j.done||((e.onEnd||f)(),j.done=!0)},l=k(e.time),m=k(0),n={opacity:0},o={opacity:1};d.removeClass(Hb+" "+Gb),a.addClass(Gb),b.addClass(Hb),kc?(s(a),s(b),h&&(a.css(c.extend(m,n)),a.width()),a.css(c.extend(l,o)),i&&b.css(c.extend(l,n)),e.time>10&&(g||h)?(r(a,"opacity",j,e.time),r(b,"opacity",j,e.time)):j()):(a.stop(),b.stop(),h&&a.fadeTo(0,0),a.fadeTo(e.time,1,j),i&&b.fadeTo(e.time,0),g||h||j())}function L(a,b){a._x=b?a.touches[0].pageX:a.pageX,a._y=b?a.touches[0].pageY:a.pageY}function M(a,b){function d(a){return m=c(a.target),p=!1,h||k||a.touches&&a.touches.length>1||a.which>1||r.prevent||$&&$.type!==a.type&&ab||(p=b.select&&m.is(b.select,q))?r.prevent!==!0||p:(o=a.type.match("touch"),L(a,o),r.checked=i=l=!1,$=a,_=a.type.replace(/down|start/,"move"),j=a,n=r.control,(b.onStart||f).call(q,a,{control:n,$target:m}),h=k=!0,o||a.preventDefault(),void 0)}function e(a){if(!h||a.touches&&a.touches.length>1)return g(),void 0;if(_===a.type){L(a,o);var c=Math.abs(a._x-j._x),d=Math.abs(a._y-j._y),e=c-d,k=e>=3,m=-3>=e;l||(l=!(!k&&!m)),o&&!r.checked?((k||m)&&(r.checked=!0,i=k),(!r.checked||i)&&a.preventDefault()):!o||i?(a.preventDefault(),(b.onMove||f).call(q,a)):h=!1,r.checked=r.checked||k||m}}function g(a){k=r.control=!1,h&&(a&&a.preventDefault&&a.preventDefault(),ab=!0,clearTimeout(bb),bb=setTimeout(function(){ab=!1},1e3),(b.onEnd||f).call(q,{moved:!!l,$target:m,control:n,startEvent:j,aborted:!a,touch:o}),h=!1)}var h,i,j,k,l,m,n,o,p,q=a[0],r={};return q.addEventListener&&(q.addEventListener("touchstart",d),q.addEventListener("touchmove",e),q.addEventListener("touchend",g)),a.on("mousedown",d),hc.on("mousemove",e).on("mouseup",g),a.on("click","a",function(a){r.checked&&a.preventDefault()}),r}function N(a,b){function d(c){k=l=c._x,p=[[(new Date).getTime(),k]],m=n=s(a),(b.onStart||f).call(z,c,{pos:m})}function e(a,b){r=A.minPos,u=A.maxPos,v=A.snap,w=a.altKey,y=!1,x=b.control,x||d(a)}function h(c){x&&(x=!1,d(c)),l=c._x,p.push([(new Date).getTime(),l]),n=m-(k-l),o=F(n,r,u),r>=n?n=t(n,r):n>=u&&(n=t(n,u)),B.noMove||(a.css(j(n)),y||(y=!0,Z.addClass("grabbing"))),(b.onMove||f).call(z,c,{pos:n,edge:o})}function i(a){if(!x){Z.removeClass("grabbing"),q=(new Date).getTime();for(var d,e,h,i,j,k,o,s,t,y=q-mc,A=null,B=nc,C=b.friction,D=p.length-1;D>=0;D--){if(d=p[D][0],e=Math.abs(d-y),null===A||h>e)A=d,i=p[D][1];else if(A===y||e>h)break;h=e}o=g(n,r,u);var E=i-l,F=E>=0,G=q-A,H=mc>=G&&n!==m&&o===n;v&&(o=g(Math[H?F?"floor":"ceil":"round"](n/v)*v,r,u),r=u=o),H&&(v||o===n)&&(t=-(E/G),B*=g(Math.abs(t),b.timeLow,b.timeHigh),j=Math.round(n+t*B/C),v||(o=j),(!F&&j>u||F&&r>j)&&(k=F?r:u,s=j-k,v||(o=k),s=g(o+.03*s,k-50,k+50),B=Math.abs((n-s)/(t/C)))),B*=w?10:1,(b.onEnd||f).call(z,c.extend(a,{pos:n,newPos:o,overPos:s,time:B}))}}var k,l,m,n,o,p,q,r,u,v,w,x,y,z=a[0],A=a.data(),B={};return B=c.extend(M(b.$wrap,{onStart:e,onMove:h,onEnd:i,select:b.select,control:b.control}),B)}function O(a){P(!0),uc.appendTo(a),db=0,vc(),cb=setInterval(vc,200)}function P(a){a||uc.detach(),clearInterval(cb)}var Q={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"},R=new RegExp("[&<>\"'/]","g"),S={escape:function(a){return null==a?"":(""+a).replace(R,function(a){return Q[a]})}},T=function(a,b,c){function d(a){r.cssText=a}function e(a,b){return typeof a===b}function f(a,b){return!!~(""+a).indexOf(b)}function g(a,b){for(var d in a){var e=a[d];if(!f(e,"-")&&r[e]!==c)return"pfx"==b?e:!0}return!1}function h(a,b,d){for(var f in a){var g=b[a[f]];if(g!==c)return d===!1?a[f]:e(g,"function")?g.bind(d||b):g}return!1}function i(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),f=(a+" "+u.join(d+" ")+d).split(" ");return e(b,"string")||e(b,"undefined")?g(f,b):(f=(a+" "+v.join(d+" ")+d).split(" "),h(f,b,c))}var j,k,l,m="2.6.2",n={},o=b.documentElement,p="modernizr",q=b.createElement(p),r=q.style,s=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),t="Webkit Moz O ms",u=t.split(" "),v=t.toLowerCase().split(" "),w={},x=[],y=x.slice,z=function(a,c,d,e){var f,g,h,i,j=b.createElement("div"),k=b.body,l=k||b.createElement("body");if(parseInt(d,10))for(;d--;)h=b.createElement("div"),h.id=e?e[d]:p+(d+1),j.appendChild(h);return f=["&#173;",'<style id="s',p,'">',a,"</style>"].join(""),j.id=p,(k?j:l).innerHTML+=f,l.appendChild(j),k||(l.style.background="",l.style.overflow="hidden",i=o.style.overflow,o.style.overflow="hidden",o.appendChild(l)),g=c(j,a),k?j.parentNode.removeChild(j):(l.parentNode.removeChild(l),o.style.overflow=i),!!g},A={}.hasOwnProperty;l=e(A,"undefined")||e(A.call,"undefined")?function(a,b){return b in a&&e(a.constructor.prototype[b],"undefined")}:function(a,b){return A.call(a,b)},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=y.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(y.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(y.call(arguments)))};return d}),w.csstransforms3d=function(){var a=!!i("perspective");return a};for(var B in w)l(w,B)&&(k=B.toLowerCase(),n[k]=w[B](),x.push((n[k]?"":"no-")+k));return n.addTest=function(a,b){if("object"==typeof a)for(var d in a)l(a,d)&&n.addTest(d,a[d]);else{if(a=a.toLowerCase(),n[a]!==c)return n;b="function"==typeof b?b():b,"undefined"!=typeof enableClasses&&enableClasses&&(o.className+=" "+(b?"":"no-")+a),n[a]=b}return n},d(""),q=j=null,n._version=m,n._prefixes=s,n._domPrefixes=v,n._cssomPrefixes=u,n.testProp=function(a){return g([a])},n.testAllProps=i,n.testStyles=z,n.prefixed=function(a,b,c){return b?i(a,b,c):i(a,"pfx")},n}(a,b),U={ok:!1,is:function(){return!1},request:function(){},cancel:function(){},event:"",prefix:""},V="webkit moz o ms khtml".split(" ");if("undefined"!=typeof b.cancelFullScreen)U.ok=!0;else for(var W=0,X=V.length;X>W;W++)if(U.prefix=V[W],"undefined"!=typeof b[U.prefix+"CancelFullScreen"]){U.ok=!0;break}U.ok&&(U.event=U.prefix+"fullscreenchange",U.is=function(){switch(this.prefix){case"":return b.fullScreen;case"webkit":return b.webkitIsFullScreen;default:return b[this.prefix+"FullScreen"]}},U.request=function(a){return""===this.prefix?a.requestFullScreen():a[this.prefix+"RequestFullScreen"]()},U.cancel=function(){return""===this.prefix?b.cancelFullScreen():b[this.prefix+"CancelFullScreen"]()});var Y,Z,$,_,ab,bb,cb,db,eb="fotorama",fb="fullscreen",gb=eb+"__wrap",hb=gb+"--not-ready",ib=gb+"--css3",jb=gb+"--video",kb=gb+"--fade",lb=gb+"--slide",mb=gb+"--no-controls",nb=eb+"__stage",ob=nb+"__frame",pb=ob+"--video",qb=nb+"__shaft",rb=nb+"--only-active",sb=eb+"__arr",tb=sb+"--disabled",ub=sb+"--prev",vb=sb+"--next",wb=sb+"__arr",xb=eb+"__nav",yb=xb+"-wrap",zb=xb+"__shaft",Ab=xb+"--dots",Bb=xb+"--thumbs",Cb=xb+"__frame",Db=Cb+"--dot",Eb=Cb+"--thumb",Fb=eb+"__fade",Gb=Fb+"-front",Hb=Fb+"-rear",Ib=eb+"__shadow",Jb=Ib+"s",Kb=Jb+"--left",Lb=Jb+"--right",Mb=eb+"__active",Nb=eb+"__select",Ob=eb+"--hidden",Pb=eb+"--fullscreen",Qb=eb+"__fullscreen-icon",Rb=eb+"__error",Sb=eb+"__loading",Tb=eb+"__loaded",Ub=Tb+"--full",Vb=Tb+"--img",Wb=eb+"__load",Xb=eb+"__img",Yb=Xb+"--full",Zb=eb+"__dot",$b=eb+"__thumb",_b=$b+"-border",ac=eb+"__html",bc=eb+"__video",cc=bc+"-play",dc=bc+"-close",ec=eb+"__caption",fc=eb+"__oooo",gc=c(a),hc=c(b),ic="CSS1Compat"===b.compatMode,jc="quirks"===b.location.hash.replace("#",""),kc=T.csstransforms3d&&!jc,lc=U.ok,mc=300,nc=333,oc=5e3,pc=2,qc=64,rc=500,sc=333,tc=e([.1,0,.25,1]),uc=c(I("",I(fc))),vc=function(){uc.attr("class",fc+" "+fc+"--"+db),db++,db>4&&(db=0)};jQuery.Fotorama=function(e,f){function h(){c.each(Ec,function(a,b){if(!b.i){b.i=hd++;var c=w(b.video,!0);if(c){var d={};b.video=c,b.img||b.thumb?b.thumbsReady=!0:d=x(b,Ec,dd),y(Ec,{img:d.img,thumb:d.thumb},b.i,dd)}}})}function i(){Ec=dd.data=Ec||z(e),Fc=dd.size=Ec.length,h(),Fd=L(Fd),cb.ok=!1,Fc&&(bd||(e.html("").append(ld),c.Fotorama.size++,bd=!0))}function q(){Jd.noMove=2>Fc||Ic||Uc}function r(a){a===!0&&(a=""),f.autoplay=Math.max(Number(a)||oc,1.5*nc)}function t(a){return a?"add":"remove"}function u(){Uc="crossfade"===f.transition||"dissolve"===f.transition,Pc=f.loop&&(Fc>2||Uc);var a={add:[],remove:[]};Fc>1?(Qc=f.nav,Rc="top"===f.navPosition,a.remove.push(Nb),rd.show(),db()):(Qc=!1,rd.hide()),a[t(Fc>1)].push("fotorama__wrap--navigation"),f.autoplay&&r(f.autoplay),Vc=l(f.thumbWidth)||qc,Wc=l(f.thumbHeight)||qc,q(),fc(f,!0),Qc===!0||"dots"===Qc?(td.addClass(Ab).removeClass(Bb),$(Fc,"navDot")):"thumbs"===Qc?(E(jd,c.Fotorama.jst.style({w:Vc,h:Wc,m:pc,s:fd,q:!ic})),td.addClass(Bb).removeClass(Ab),$(Fc,"navThumb")):(Qc=!1,td.removeClass(Bb+" "+Ab)),Sc=f.allowFullScreen,e.insertAfter(kd).removeClass(Ob),Qc&&Rc?sd.insertBefore(md):sd.insertAfter(md),Sc?(Dd.appendTo(md),Tc=lc&&"native"===Sc):(Dd.detach(),Tc=!1),a[t(Uc)].push(kb),a[t(!Uc&&!Jd.noMove)].push(lb),P(),ld.addClass(a.add.join(" ")).removeClass(a.remove.join(" ")),Hd=c.extend({},f)}function v(a){return 0>a?(Fc+a%Fc)%Fc:a>=Fc?a%Fc:a}function L(a){return g(a,0,Fc-1)}function M(a){return a>0||Pc?a-1:!1}function Q(a){return Fc-1>a||Pc?a+1:!1}function R(){Ad.minPos=Pc?-1/0:-o(Fc-1,Id.w,pc,Kc),Ad.maxPos=Pc?1/0:-o(0,Id.w,pc,Kc),Ad.snap=Id.w+pc}function S(){Bd.minPos=Math.min(0,Id.w-ud.width()),Bd.maxPos=0,Kd.noMove=Bd.minPos===Bd.maxPos}function T(a,b,d){if("number"==typeof a){a=new Array(a);var e=!0}return c.each(a,function(a,c){if(e&&(c=a),"number"==typeof c){var f=Ec[v(c)],g="$"+b+"Frame",h=f[g];d.call(this,a,c,f,h,g,h&&h.data())}})}function V(a,b,c,d){(!Xc||"*"===Xc&&d===Gd)&&(a=n(f.width)||n(a)||rc,b=n(f.height)||n(b)||sc,dd.resize({width:a,ratio:f.ratio||c||a/b},0,d===Gd?!0:"*"))}function W(a,b,d,e,g){T(a,b,function(a,h,i,j,k,l){function m(a){var b=v(h);jc(a,{index:b,src:w,frame:Ec[b]})}function n(){s.remove(),c.Fotorama.cache[w]="error",i.$html&&"stage"===b||!x||x===w?(w&&!l.$html?(j.trigger("f:error").removeClass(Sb).addClass(Rb),m("error")):"stage"===b&&(j.trigger("f:load").removeClass(Sb+" "+Rb).addClass(Tb),m("load"),V()),l.state="error",!(Fc>1)||i.html||i.deleted||i.video||q||(i.deleted=!0,dd.splice(h,1))):(i[u]=w=x,W([h],b,d,e,!0))}function o(){var a=s.width(),g=s.height(),k=a/g;t.measures={width:a,height:g,ratio:k},V(a,g,k,h),s.off("load error").addClass(Xb+(q?" "+Yb:"")).prependTo(j),D(s,d||Id,e||i.fit||f.fit),c.Fotorama.cache[w]="loaded",l.state="loaded",setTimeout(function(){j.trigger("f:load").removeClass(Sb+" "+Rb).addClass(Tb+" "+(q?Ub:Vb)),"stage"===b&&m("load")},5)}function p(){B(function(){return!A(r)},function(){o()})}if(j){var q=dd.fullScreen&&i.full&&!l.$full&&"stage"===b;if(!l.$img||g||q){var r=new Image,s=c(r),t=s.data();l[q?"$full":"$img"]=s;var u="stage"===b?q?"full":"img":"thumb",w=i[u],x=q?null:i["stage"===b?"thumb":"img"];if("navThumb"===b&&(j=l.$wrap),!w)return n(),void 0;c.Fotorama.cache[w]?function y(){"error"===c.Fotorama.cache[w]?n():"loaded"===c.Fotorama.cache[w]?p():setTimeout(y,100)}():(c.Fotorama.cache[w]="*",s.on("load",p).on("error",n)),r.src=w,s.appendTo(c.Fotorama.$load)}}})}function X(){var a=dd.activeFrame[xd];a&&!a.data().state&&(O(a),a.on("f:load f:error",function(){a.off("f:load f:error"),P()}))}function $(a,b){T(a,b,function(a,d,e,g,h,i){if(!g)if(g=e[h]=ld[h].clone(),i=g.data(),i.data=e,"stage"===b){if(e.html&&(c(e.html).html(e._html),c('<div class="'+ac+'"></div>').append(e.html).appendTo(g)),f.captions&&e.caption&&c('<div class="'+ec+'"></div>').append(e.caption).appendTo(g),e.video){var j=Ed.clone();H(j,function(){dd.playVideo()},{onStart:function(a){mc.call(this,a),Jd.control=!0},tail:Jd}),g.addClass(pb).append(j)}od=od.add(g)}else"navDot"===b?vd=vd.add(g):"navThumb"===b&&(i.$wrap=g.children(":first"),wd=wd.add(g),e.video&&g.append(Ed.clone()))})}function _(a,b,c){return a&&a.length&&D(a,b,c)}function ab(a){T(a,"stage",function(a,b,d,e,g,h){if(e){e.css(c.extend({left:Uc?0:o(b,Id.w,pc,Kc)},Uc&&k(0))),h.appended||(e.appendTo(nd),h.appended=!0,yc(d.$video));var i=d.fit||f.fit;_(h.$img,Id,i),_(h.$full,Id,i)}})}function bb(a,b){if("thumbs"===Qc&&!isNaN(a)){var d=Vc+pc,e=L(p(a+d,d)),f=L(p(a-Id.w,d)),g={};g.w=Vc,g.h=Wc,wd.each(function(){var a=c(this),d=a.data(),h=d.eq,i="cover";e>h||h>f||_(d.$img,g,i)||b&&W([h],"navThumb",g,i)})}}function cb(a,b,d){cb.ok||(a=a.filter(function(){for(var a,b=c(this),d=b.data(),e=0,f=Ec.length;f>e;e++){var g=Ec[e];if(d.data===g){a=!0,d.eq=e;break}}return a||b.remove(),a}).sort(function(a,b){return c(a).data().eq-c(b).data().eq}).appendTo(b),d&&S(),cb.ok=!0)}function db(){rd.each(function(a){c(this).toggleClass(tb,!Pc&&(0===Fd&&0===a||Fd===Fc-1&&1===a)&&!Ic)})}function Fb(a){return a.position().left+Vc/2}function Gb(a){J(Cd,{time:.9*a,pos:Fb(dd.activeFrame[Hc])})}function Hb(a){if(Ec[a.guessIndex][Hc]){var b=g(a.coo-Fb(Ec[a.guessIndex][Hc]),Bd.minPos,Bd.maxPos),c=.9*a.time;J(ud,{time:c,pos:b,onEnd:function(){bb(b,!0)}}),c&&bb(b),xc(td,F(b,Bd.minPos,Bd.maxPos))}}function Ib(){if("thumbs"===Qc)Gc=wd,Hc=zd;else{if(!Qc)return;Gc=vd,Hc=yd}cb(Gc,ud,!0),Gc.removeClass(Mb),dd.activeFrame[Hc].addClass(Mb)}function bc(){Kc=Lc=Fd;var a=dd.activeFrame,b=a[xd];b&&(od.not(dd.activeFrame[xd].addClass(Mb)).detach().data("appended",!1).removeClass(Mb),s(nd),nd.css(j(0)),ab([Fd,Nc,Oc]),R(),S())}function fc(a,b){a&&c.extend(Id,{width:a.width||Id.width,height:a.height,minWidth:a.minWidth,maxWidth:a.maxWidth,minHeight:a.minHeight,maxHeight:a.maxHeight,ratio:function(a){if(a){var b=Number(a);return isNaN(b)?(b=a.split("/"),Number(b[0]/b[1])||d):b}}(a.ratio)})&&!b&&c.extend(f,{width:Id.width,height:Id.height,minWidth:Id.minWidth,maxWidth:Id.maxWidth,minHeight:Id.minHeight,maxHeight:Id.maxHeight,ratio:Id.ratio})}function jc(a,b){e.trigger(eb+":"+a,[dd,b])}function mc(){f.stopAutoplayOnTouch?dd.stopAutoplay():_c=!0}function tc(){_c=!(!Ic&&!ad)}function uc(){if(clearTimeout(uc.t),!f.autoplay||_c)return dd.autoplay&&(dd.autoplay=!1,jc("stopautoplay")),void 0;dd.autoplay||(dd.autoplay=!0,jc("startautoplay"));var a=Fd;uc.t=setTimeout(function(){var b=dd.activeFrame[xd].data();B(function(){return b.state||a!==Fd},function(){_c||a!==Fd||dd.show({index:v(Fd+1)})})},f.autoplay)}function vc(){dd.fullScreen&&(dd.fullScreen=!1,lc&&U.cancel(gd),Z.removeClass(fb),e.removeClass(Pb).insertAfter(kd),jc("fullscreenexit"),Id=c.extend({},cd),yc(Ic,!0),dd.resize(),W([Fd,Nc,Oc],"stage"),gc.scrollLeft(Zc).scrollTop(Yc))}function xc(a,b){a.removeClass(Kb+" "+Lb),b&&!Ic&&a.addClass(b.replace(/^|\s/g," "+Jb+"--"))}function yc(a,b,c){b&&(ld.removeClass(jb),Ic=!1,q()),a&&a!==Ic&&(a.remove(),jc("unloadvideo")),c&&(tc(),uc())}function zc(a){ld.toggleClass(mb,a)}function Ac(a,b){Ic?yc(Ic,!0,!0):b?zc():dd.show({index:a.shiftKey||a._x-md.offset().left<Id.w/3?"<":">",slow:a.altKey,direct:!0})}function Bc(a,b){var d=c(this).data().eq;dd.show({index:d,slow:a.altKey,direct:!0,coo:a._x-td.offset().left,time:b})}function Cc(){i(),u(),Dc.ok||(f.hash&&location.hash&&(Gd=G(location.hash.replace(/^#/,""),Ec,0===ed)),Gd=(Pc?v(Gd):L(Gd))||0,Fd=Kc=Lc=Mc=Gd),Fc?(Ic&&yc(Ic,!0),dd.show({index:Fd,time:0}),dd.resize()):dd.destroy()}function Dc(){Dc.ok||(Dc.ok=!0,ld.removeClass(hb),jc("ready"))}Y=Y||c("html"),Z=Z||c("body"),c.Fotorama.$load=c.Fotorama.$load||c('<div class="'+Wb+'"></div>').appendTo(Z);var Ec,Fc,Gc,Hc,Ic,Jc,Kc,Lc,Mc,Nc,Oc,Pc,Qc,Rc,Sc,Tc,Uc,Vc,Wc,Xc,Yc,Zc,$c,_c,ad,bd,cd,dd=this,ed=wc,fd=(new Date).getTime(),gd=e.addClass(eb+fd)[0],hd=1,id=e.data(),jd=c("<style></style>").insertBefore(e),kd=c(I(Ob)).insertBefore(e),ld=c(I(gb+" "+hb)),md=c(I(nb)).appendTo(ld),nd=(md[0],c(I(qb)).appendTo(md)),od=c(),pd=c(I(sb+" "+ub,I(wb))),qd=c(I(sb+" "+vb,I(wb))),rd=pd.add(qd).appendTo(md),sd=c(I(yb)),td=c(I(xb)).appendTo(sd),ud=c(I(zb)).appendTo(td),vd=c(),wd=c(),xd="$stageFrame",yd="$navDotFrame",zd="$navThumbFrame",Ad=nd.data(),Bd=ud.data(),Cd=c(I(_b)).appendTo(ud),Dd=c(I(Qb)),Ed=c(I(cc)),Fd=(c(I(dc)).appendTo(md),!1),Gd=!1,Hd={},Id={},Jd={},Kd={};ld[xd]=c(I(ob)),ld[zd]=c(I(Cb+" "+Eb,I($b))),ld[yd]=c(I(Cb+" "+Db,I(Zb))),kc&&ld.addClass(ib),id.fotorama=this,dd.options=f,wc++,dd.startAutoplay=function(a){return dd.autoplay?this:(_c=ad=!1,r(a||f.autoplay),uc(),this)},dd.stopAutoplay=function(){return dd.autoplay&&(_c=ad=!0,uc()),this},dd.show=function(a){function b(){$([Fd,Nc,Oc],"stage"),X(),W([Fd,Nc,Oc],"stage"),bc(),jc("showend",a.direct),f.hash&&$c&&!dd.eq&&C(Jc.id||Fd+1),tc(),uc(),$c=!0}var c,d,e=nc;if("object"!=typeof a?(c=a,a={}):(c=a.index,e="number"==typeof a.time?a.time:e,d=a.overPos),a.slow&&(e*=10),">"===c?c=Lc+1:"<"===c?c=Lc-1:"<<"===c?c=0:">>"===c&&(c=Fc-1),isNaN(c)&&(c=G(c,Ec,!0)||Fd||0),dd.activeIndex=Fd=Pc?v(c):L(c),Nc=M(Fd),Oc=Q(Fd),Lc=Pc?c:Fd,dd.activeFrame=Jc=Ec[Fd],ab([Lc]),yc(!1,Jc.i!==Ec[v(Kc)].i),jc("show",a.direct),Uc){var h=Jc[xd],i=Fd!==Mc?Ec[Mc][xd]:null;K(h,i,od,{time:e,method:f.transition,onEnd:b})}else J(nd,{pos:-o(Lc,Id.w,pc,Kc),overPos:d,time:e,onEnd:b});if(db(),Ib(),Qc){var j=L(Fd+g(Lc-Mc,-1,1)),k="undefined"==typeof a.coo;(k||j!==Fd)&&Hb({time:e,coo:k?Id.w/2:a.coo,guessIndex:k?Fd:j})}return"thumbs"===Qc&&Gb(e),Mc=Fd,this},dd.requestFullScreen=function(){return Sc&&!dd.fullScreen&&(Yc=gc.scrollTop(),Zc=gc.scrollLeft(),gc.scrollLeft(1).scrollTop(1),e.addClass(Pb).appendTo(Z),cd=c.extend({},Id),yc(Ic,!0),dd.fullScreen=!0,Tc&&U.request(gd),setTimeout(function(){gc.scrollLeft(0).scrollTop(0),Z.addClass(fb),dd.resize(),W([Fd,Nc,Oc],"stage")},5),jc("fullscreenenter")),this},dd.cancelFullScreen=function(){return Tc&&U.is()?U.cancel(b):vc(),this},b.addEventListener&&b.addEventListener(U.event,function(){U.is()||Ic||vc()}),hc.on("keydown",function(a){Ic&&27===a.keyCode?(a.preventDefault(),yc(Ic,!0,!0)):(dd.fullScreen||f.keyboard&&!ed)&&(27===a.keyCode?(a.preventDefault(),dd.cancelFullScreen()):39===a.keyCode||40===a.keyCode&&dd.fullScreen?(a.preventDefault(),dd.show({index:">",slow:a.altKey,direct:!0})):(37===a.keyCode||38===a.keyCode&&dd.fullScreen)&&(a.preventDefault(),dd.show({index:"<",slow:a.altKey,direct:!0})))}),ed||hc.on("keydown","textarea, input, select",function(a){dd.fullScreen||a.stopPropagation()}),dd.resize=function(b){if(Ec){fc(dd.fullScreen?{width:"100%",maxWidth:null,minWidth:null,height:"100%",maxHeight:null,minHeight:null}:b);var c=arguments[1]||0,d=arguments[2],e=Id.width,f=Id.height,h=Id.ratio,i=a.innerHeight-(Qc?td.height():0);return n(e)&&(ld.css({width:e,minWidth:Id.minWidth,maxWidth:Id.maxWidth}),e=Id.w=ld.width(),f=m(f)/100*i||l(f),f=f||h&&e/h,f&&(e=Math.round(e),f=Id.h=Math.round(g(f,m(Id.minHeight)/100*i||l(Id.minHeight),m(Id.maxHeight)/100*i||l(Id.maxHeight))),bc(),md.addClass(rb).stop().animate({width:e,height:f},c,function(){md.removeClass(rb)}),Qc&&(td.stop().animate({width:e},c).css({left:0}),Hb({guessIndex:Fd,time:c,coo:Id.w/2}),"thumbs"===Qc&&cb.ok&&Gb(c)),Xc=d||!0,Dc())),this}},dd.setOptions=function(a){return c.extend(f,a),Cc(),this},dd.destroy=function(){return dd.stopAutoplay(),ld.detach(),e.html(id.urtext),bd=!1,Ec=dd.data=null,c.Fotorama.size--,this},dd.playVideo=function(){var a=dd.activeFrame,b=a.video,d=Fd;return"object"==typeof b&&a.videoReady&&(Tc&&dd.fullScreen&&dd.cancelFullScreen(),B(function(){return!U.is()||d!==Fd},function(){d===Fd&&(a.$video=a.$video||c(c.Fotorama.jst.video(b)),a.$video.appendTo(a[xd]),ld.addClass(jb),Ic=a.$video,Jd.noMove=!0,jc("loadvideo"))})),this},dd.stopVideo=function(){return yc(Ic,!0,!0),this},ld.hover(function(){zc(!1)},function(){zc(!0)}),Jd=N(nd,{onStart:mc,onMove:function(a,b){xc(md,b.edge)},onEnd:function(a){if(xc(md),a.moved||a.touch&&a.pos!==a.newPos){var b=p(a.newPos,Id.w,pc,Kc);dd.show({index:b,time:a.time,overPos:a.overPos,direct:!0})}else a.aborted||Ac(a.startEvent,a.touch)},timeLow:1,timeHigh:1,friction:2,select:"."+Nb+", ."+Nb+" *",$wrap:md}),Kd=N(ud,{onStart:mc,onMove:function(a,b){xc(td,b.edge)},onEnd:function(a){function b(){tc(),uc(),bb(a.newPos,!0)}if(a.moved)a.pos!==a.newPos?(J(ud,{time:a.time,pos:a.newPos,overPos:a.overPos,onEnd:b}),bb(a.newPos),xc(td,F(a.newPos,Bd.minPos,Bd.maxPos))):b();else{var c=a.$target.closest("."+Cb,ud)[0];c&&Bc.call(c,a.startEvent)}},timeLow:.5,timeHigh:2,friction:5,$wrap:td}),H(rd,function(a){a.preventDefault(),Ic?yc(Ic,!0,!0):dd.show({index:rd.index(this)?">":"<",slow:a.altKey,direct:!0})},{onStart:function(a){mc.call(this,a),Jd.control=!0},tail:Jd}),H(Dd,function(){dd.fullScreen?dd.cancelFullScreen():dd.requestFullScreen(),tc(),uc()},{onStart:function(a){mc.call(this,a),Jd.control=!0},tail:Jd}),c.each("load push pop shift unshift reverse sort splice".split(" "),function(a,b){dd[b]=function(){return Ec=Ec||[],"load"!==b?Array.prototype[b].apply(Ec,arguments):arguments[0]&&"object"==typeof arguments[0]&&arguments[0].length&&(Ec=arguments[0]),Cc(),dd}}),gc.on("resize",dd.resize),Cc()},c.fn.fotorama=function(a){return this.each(function(){var b=this,d=c(this),e=d.data(),f=e.fotorama;f?f.setOptions(a):B(function(){return!A(b)},function(){e.urtext=d.html(),new c.Fotorama(d,c.extend({},{width:null,minWidth:null,maxWidth:null,height:null,minHeight:null,maxHeight:null,ratio:null,nav:"dots",navPosition:"bottom",thumbWidth:qc,thumbHeight:qc,allowFullScreen:!1,fit:"contain",transition:"slide",captions:!0,hash:!1,autoplay:!1,stopAutoplayOnTouch:!0,keyboard:!1,loop:!1},c.extend({},a,e)))})})},c.Fotorama.cache={};var wc=0;c.Fotorama.size=0,c(function(){c("."+eb+':not([data-auto="false"])').fotorama()}),c=c||{},c.Fotorama=c.Fotorama||{},c.Fotorama.jst=c.Fotorama.jst||{},c.Fotorama.jst.style=function(a){var b,c="";return S.escape,c+=".fotorama"+(null==(b=a.s)?"":b)+" .fotorama__nav--thumbs .fotorama__nav__frame{\npadding:"+(null==(b=a.m)?"":b)+"px;\npadding-left:0;\nwidth:"+(null==(b=a.w)?"":b)+"px;\nheight:"+(null==(b=a.h)?"":b)+"px}\n.fotorama"+(null==(b=a.s)?"":b)+" .fotorama__nav--thumbs .fotorama__nav__frame:last-child{\npadding-right:0}\n.fotorama"+(null==(b=a.s)?"":b)+" .fotorama__thumb{\nwidth:"+(null==(b=a.w)?"":b)+"px;\nheight:"+(null==(b=a.h)?"":b)+"px}\n.fotorama"+(null==(b=a.s)?"":b)+" .fotorama__thumb-border{\nwidth:"+(null==(b=a.w-a.m*(a.q?0:2))?"":b)+"px;\nheight:"+(null==(b=a.h-a.m*(a.q?0:2))?"":b)+"px;\nborder-width:"+(null==(b=a.m)?"":b)+"px;\nmargin-top:"+(null==(b=a.m)?"":b)+"px;\nmargin-left:"+(null==(b=-a.w/2)?"":b)+"px}"},c.Fotorama.jst.video=function(a){function b(){c+=d.call(arguments,"")}var c="",d=(S.escape,Array.prototype.join);return c+='<div class="fotorama__video"><iframe src="',b("youtube"==a.type?"http://youtube.com/embed/"+a.id+"?autoplay=1":"vimeo"==a.type?"http://player.vimeo.com/video/"+a.id+"?autoplay=1&amp;badge=0":a.id),c+='" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>'}}(window,document,jQuery);