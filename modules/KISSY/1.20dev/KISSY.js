define(function(require,exports,module){(function(S,undefined){var host=this,meta={mix:function(r,s,ov,wl){if(!s||!r)return r;if(ov===undefined)ov=true;var i,p,len;if(wl&&(len=wl.length)){for(i=0;i<len;i++){p=wl[i];if(p in s){_mix(p,r,s,ov)}}}else{for(p in s){_mix(p,r,s,ov)}}return r}},_mix=function(p,r,s,ov){if(ov||!(p in r)){r[p]=s[p]}},seed=host&&host[S]||{},guid=0,EMPTY="";host=seed.__HOST||(seed.__HOST=host||{});S=host[S]=meta.mix(seed,meta,false);S.mix(S,{__APP_MEMBERS:["namespace"],__APP_INIT_METHODS:["__init"],version:"1.20dev",buildTime:"@TIMESTAMP@",merge:function(){var o={},i,l=arguments.length;for(i=0;i<l;i++){S.mix(o,arguments[i])}return o},augment:function(){var args=S.makeArray(arguments),len=args.length-2,r=args[0],ov=args[len],wl=args[len+1],i=1;if(!S.isArray(wl)){ov=wl;wl=undefined;len++}if(!S.isBoolean(ov)){ov=undefined;len++}for(;i<len;i++){S.mix(r.prototype,args[i].prototype||args[i],ov,wl)}return r},extend:function(r,s,px,sx){if(!s||!r)return r;var create=Object.create?function(proto,c){return Object.create(proto,{constructor:{value:c}})}:function(proto,c){function F(){}F.prototype=proto;var o=new F;o.constructor=c;return o},sp=s.prototype,rp;rp=create(sp,r);r.prototype=S.mix(rp,r.prototype);r.superclass=create(sp,s);if(px){S.mix(rp,px)}if(sx){S.mix(r,sx)}return r},__init:function(){this.Config=this.Config||{};this.Env=this.Env||{};this.Config.debug="@DEBUG@"},namespace:function(){var args=S.makeArray(arguments),l=args.length,o=null,i,j,p,global=args[l-1]===true&&l--;for(i=0;i<l;i++){p=(EMPTY+args[i]).split(".");o=global?host:this;for(j=host[p[0]]===o?1:0;j<p.length;++j){o=o[p[j]]=o[p[j]]||{}}}return o},app:function(name,sx){var isStr=S.isString(name),O=isStr?host[name]||{}:name,i=0,len=S.__APP_INIT_METHODS.length;S.mix(O,this,true,S.__APP_MEMBERS);for(;i<len;i++)S[S.__APP_INIT_METHODS[i]].call(O);S.mix(O,S.isFunction(sx)?sx():sx);isStr&&(host[name]=O);return O},config:function(c){for(var p in c){if(this["_"+p])this["_"+p](c[p])}},log:function(msg,cat,src){if(S.Config.debug){if(src){msg=src+": "+msg}if(host["console"]!==undefined&&console.log){console[cat&&console[cat]?cat:"log"](msg)}}},error:function(msg){if(S.Config.debug){throw msg}},guid:function(pre){return(pre||EMPTY)+guid++}});S.__init();return S})("KISSY");(function(S,undefined){var host=S.__HOST,OP=Object.prototype,toString=OP.toString,hasOwnProperty=OP.hasOwnProperty,AP=Array.prototype,indexOf=AP.indexOf,lastIndexOf=AP.lastIndexOf,filter=AP.filter,trim=String.prototype.trim,map=AP.map,EMPTY="",CLONE_MARKER="__~ks_cloned",RE_TRIM=/^\s+|\s+$/g,encode=encodeURIComponent,decode=decodeURIComponent,SEP="&",EQ="=",class2type={},htmlEntities={"&amp;":"&","&gt;":">","&lt;":"<","&quot;":'"'},reverseEntities={},escapeReg,unEscapeReg;for(var k in htmlEntities){reverseEntities[htmlEntities[k]]=k}function getEscapeReg(){if(escapeReg){return escapeReg}var str=EMPTY;S.each(htmlEntities,function(entity){str+=entity+"|"});str=str.slice(0,-1);return escapeReg=new RegExp(str,"g")}function getUnEscapeReg(){if(unEscapeReg){return unEscapeReg}var str=EMPTY;S.each(reverseEntities,function(entity){str+=entity+"|"});str+="&#(\\d{1,5});";return unEscapeReg=new RegExp(str,"g")}function isValidParamValue(val){var t=typeof val;return val===null||t!=="object"&&t!=="function"}S.mix(S,{type:function(o){return o==null?String(o):class2type[toString.call(o)]||"object"},isNull:function(o){return o===null},isUndefined:function(o){return o===undefined},isEmptyObject:function(o){for(var p in o){if(p!==undefined){return false}}return true},isPlainObject:function(o){return o&&toString.call(o)==="[object Object]"&&"isPrototypeOf"in o},clone:function(o,f,cloned){var ret=o,isArray,k,stamp,marked=cloned||{};if(o&&((isArray=S.isArray(o))||S.isPlainObject(o))){if(o[CLONE_MARKER]){return marked[o[CLONE_MARKER]]}o[CLONE_MARKER]=stamp=S.guid();marked[stamp]=o;if(isArray){ret=f?S.filter(o,f):o.concat()}else{ret={};for(k in o){if(k!==CLONE_MARKER&&o.hasOwnProperty(k)&&(!f||f.call(o,o[k],k,o)!==false)){ret[k]=S.clone(o[k],f,marked)}}}}if(!cloned){S.each(marked,function(v){if(v[CLONE_MARKER]){try{delete v[CLONE_MARKER]}catch(e){v[CLONE_MARKER]=undefined}}});marked=undefined}return ret},trim:trim?function(str){return str==undefined?EMPTY:trim.call(str)}:function(str){return str==undefined?EMPTY:str.toString().replace(RE_TRIM,EMPTY)},substitute:function(str,o,regexp){if(!S.isString(str)||!S.isPlainObject(o)){return str}return str.replace(regexp||/\\?\{([^{}]+)\}/g,function(match,name){if(match.charAt(0)==="\\"){return match.slice(1)}return o[name]!==undefined?o[name]:EMPTY})},each:function(object,fn,context){var key,val,i=0,length=object&&object.length,isObj=length===undefined||S.type(object)==="function";context=context||host;if(isObj){for(key in object){if(fn.call(context,object[key],key,object)===false){break}}}else{for(val=object[0];i<length&&fn.call(context,val,i,object)!==false;val=object[++i]){};}return object},indexOf:indexOf?function(item,arr){return indexOf.call(arr,item)}:function(item,arr){for(var i=0,len=arr.length;i<len;++i){if(arr[i]===item){return i}}return-1},lastIndexOf:lastIndexOf?function(item,arr){return lastIndexOf.call(arr,item)}:function(item,arr){for(var i=arr.length-1;i>=0;i--){if(arr[i]===item){break}}return i},unique:function(a,override){var b=a.slice();if(override){b.reverse()}var i=0,n,item;while(i<b.length){item=b[i];while((n=S.lastIndexOf(item,b))!==i){b.splice(n,1)}i+=1}if(override){b.reverse()}return b},inArray:function(item,arr){return S.indexOf(item,arr)>-1},filter:filter?function(arr,fn,context){return filter.call(arr,fn,context||this)}:function(arr,fn,context){var ret=[];S.each(arr,function(item,i,arr){if(fn.call(context||this,item,i,arr)){ret.push(item)}});return ret},map:map?function(arr,fn,context){return map.call(arr,fn,context||this)}:function(arr,fn,context){var len=arr.length,res=new Array(len);for(var i=0;i<len;i++){var el=S.isString(arr)?arr.charAt(i):arr[i];if(el||i in arr){res[i]=fn.call(context||this,el,i,arr)}}return res},reduce:function(arr,callback,initialValue){var len=arr.length;if(typeof callback!=="function")throw new TypeError;if(len==0&&arguments.length==2)throw new TypeError;var k=0;var accumulator;if(arguments.length>=3){accumulator=arguments[2]}else{do{if(k in arr){accumulator=arr[k++];break}if(++k>=len)throw new TypeError}while(true)}while(k<len){if(k in arr){accumulator=callback.call(undefined,accumulator,arr[k],k,arr)}k++}return accumulator},now:function(){return(new Date).getTime()},fromUnicode:function(str){return str.replace(/\\u([a-f\d]{4})/ig,function(m,u){return String.fromCharCode(parseInt(u,16))})},escapeHTML:function(str){return str.replace(getEscapeReg(),function(m){return reverseEntities[m]})},unEscapeHTML:function(str){return str.replace(getUnEscapeReg(),function(m,n){return htmlEntities[m]||String.fromCharCode(+n)})},makeArray:function(o){if(o===null||o===undefined)return[];if(S.isArray(o))return o;if(typeof o.length!=="number"||S.isString(o)||S.isFunction(o)){return[o]}var ret=[];for(var i=0,l=o.length;i<l;i++){ret[i]=o[i]}return ret},param:function(o,sep,eq,arr){if(!S.isPlainObject(o))return EMPTY;sep=sep||SEP;eq=eq||EQ;if(S.isUndefined(arr))arr=true;var buf=[],key,val;for(key in o){val=o[key];key=encode(key);if(isValidParamValue(val)){buf.push(key,eq,encode(val+EMPTY),sep)}else if(S.isArray(val)&&val.length){for(var i=0,len=val.length;i<len;++i){if(isValidParamValue(val[i])){buf.push(key,arr?encode("[]"):EMPTY,eq,encode(val[i]+EMPTY),sep)}}}}buf.pop();return buf.join(EMPTY)},unparam:function(str,sep,eq){if(typeof str!=="string"||(str=S.trim(str)).length===0){return{}}sep=sep||SEP;eq=eq||EQ;var ret={},pairs=str.split(sep),pair,key,val,i=0,len=pairs.length;for(;i<len;++i){pair=pairs[i].split(eq);key=decode(pair[0]);try{val=decode(pair[1]||EMPTY)}catch(e){S.log("decodeURIComponent error : "+pair[1],"error");val=pair[1]||EMPTY}if(S.endsWith(key,"[]")){key=key.substring(0,key.length-2)}if(hasOwnProperty.call(ret,key)){if(S.isArray(ret[key])){ret[key].push(val)}else{ret[key]=[ret[key],val]}}else{ret[key]=val}}return ret},later:function(fn,when,periodic,o,data){when=when||0;o=o||{};var m=fn,d=S.makeArray(data),f,r;if(S.isString(fn)){m=o[fn]}if(!m){S.error("method undefined")}f=function(){m.apply(o,d)};r=periodic?setInterval(f,when):setTimeout(f,when);return{id:r,interval:periodic,cancel:function(){if(this.interval){clearInterval(r)}else{clearTimeout(r)}}}},startsWith:function(str,prefix){return str.lastIndexOf(prefix,0)==0},endsWith:function(str,suffix){var ind=str.length-suffix.length;return str.indexOf(suffix,ind)==ind}});S.mix(S,{isBoolean:isValidParamValue,isNumber:isValidParamValue,isString:isValidParamValue,isFunction:isValidParamValue,isArray:isValidParamValue,isDate:isValidParamValue,isRegExp:isValidParamValue,isObject:isValidParamValue});S.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(name,lc){class2type["[object "+name+"]"]=lc=name.toLowerCase();S["is"+name]=function(o){return S.type(o)==lc}})})(KISSY);(function(S){if("require"in this)return;S.__loader={};S.__loaderUtils={};S.__loaderData={}})(KISSY);(function(S,data){if("require"in this)return;S.mix(data,{LOADING:1,LOADED:2,ERROR:3,ATTACHED:4})})(KISSY,KISSY.__loaderData);(function(S,loader,utils){if(S.use)return;S.mix(utils,{isWebKit:!!navigator.userAgent.match(/AppleWebKit/),IE:!!navigator.userAgent.match(/MSIE/),isCss:function(url){return/\.css(?:\?|$)/i.test(url)},isLinkNode:function(n){return n.nodeName.toLowerCase()=="link"},normalizePath:function(path){var paths=path.split("/"),re=[],p;for(var i=0;i<paths.length;i++){p=paths[i];if(p=="."){}else if(p==".."){re.pop()}else{re.push(p)}}return re.join("/")},normalDepModuleName:function normalDepModuleName(moduleName,depName){if(!depName){return depName}if(S.isArray(depName)){for(var i=0;i<depName.length;i++){depName[i]=normalDepModuleName(moduleName,depName[i])}return depName}if(startsWith(depName,"../")||startsWith(depName,"./")){var anchor="",index;if((index=moduleName.lastIndexOf("/"))!=-1){anchor=moduleName.substring(0,index+1)}return normalizePath(anchor+depName)}else if(depName.indexOf("./")!=-1||depName.indexOf("../")!=-1){return normalizePath(depName)}else{return depName}},removePostfix:function(path){return path.replace(/(-min)?\.js[^/]*$/i,"")},normalBasePath:function(path){if(path.charAt(path.length-1)!="/"){path+="/"}path=S.trim(path);if(!path.match(/^(http(s)?)|(file):/i)&&!startsWith(path,"/")){path=loader.__pagePath+path}return normalizePath(path)},indexMapping:function(names){for(var i=0;i<names.length;i++){if(names[i].match(/\/$/)){names[i]+="index"}}return names}});var startsWith=S.startsWith,normalizePath=utils.normalizePath})(KISSY,KISSY.__loader,KISSY.__loaderUtils);(function(S,utils){if(S.use)return;var isWebKit=utils.isWebKit,timer=null,monitors={};function startCssTimer(){if(!timer){S.log("start css polling");ccsPoll()}}function ccsPoll(){var stop=true;for(var url in monitors){var d=monitors[url],node=d.node,callbacks=d.callbacks,loaded=false;if(isWebKit){if(node["sheet"]){S.log("webkit loaded : "+url);loaded=true}}else if(node["sheet"]){try{if(node["sheet"].cssRules){S.log("firefox  "+node["sheet"].cssRules+" loaded : "+url);loaded=true}}catch(ex){S.log("firefox  "+ex.name+" "+url);if(ex.name==="NS_ERROR_DOM_SECURITY_ERR"){S.log("firefox  "+ex.name+" loaded : "+url);loaded=true}}}if(loaded){S.each(callbacks,function(callback){callback.call(node)});delete monitors[url]}else{stop=false}}if(stop){timer=null;S.log("end css polling")}else{timer=setTimeout(ccsPoll,100)}}S.mix(utils,{scriptOnload:document.addEventListener?function(node,callback){if(utils.isLinkNode(node)){return utils.styleOnload(node,callback)}node.addEventListener("load",callback,false)}:function(node,callback){if(utils.isLinkNode(node)){return utils.styleOnload(node,callback)}var oldCallback=node.onreadystatechange;node.onreadystatechange=function(){var rs=node.readyState;if(/loaded|complete/i.test(rs)){node.onreadystatechange=null;oldCallback&&oldCallback();callback.call(this)}}},styleOnload:window.attachEvent?function(node,callback){function t(){node.detachEvent("onload",t);S.log("ie/opera loaded : "+node.href);callback.call(node)}node.attachEvent("onload",t)}:function(node,callback){var k=node.href;if(monitors[k]){monitors[k].callbacks.push(callback)}else{monitors[k]={node:node,callbacks:[callback]}}startCssTimer()}})})(KISSY,KISSY.__loaderUtils);(function(S,utils){if("require"in this)return;var scriptOnload=utils.scriptOnload;S.mix(S,{getStyle:function(url,success,charset){var doc=document,head=doc.getElementsByTagName("head")[0],node=doc.createElement("link"),config=success;if(S.isPlainObject(config)){success=config.success;charset=config.charset}node.href=url;node.rel="stylesheet";if(charset){node.charset=charset}if(success){utils.scriptOnload(node,success)}head.appendChild(node);return node},getScript:function(url,success,charset){if(utils.isCss(url)){return S.getStyle(url,success,charset)}var doc=document,head=doc.getElementsByTagName("head")[0],node=doc.createElement("script"),config=success,error,timeout,timer;if(S.isPlainObject(config)){success=config.success;error=config.error;timeout=config.timeout;charset=config.charset}function clearTimer(){if(timer){timer.cancel();timer=undefined}}node.src=url;node.async=true;if(charset){node.charset=charset}if(success||error){scriptOnload(node,function(){clearTimer();S.isFunction(success)&&success.call(node)});if(S.isFunction(error)){if(doc.addEventListener){node.addEventListener("error",function(){clearTimer();error.call(node)},false)}timer=S.later(function(){timer=undefined;error()},(timeout||this.Config.timeout)*1e3)}}head.insertBefore(node,head.firstChild);return node}})})(KISSY,KISSY.__loaderUtils);(function(S,loader,utils,data){if("require"in this)return;var win=S.__HOST,IE=utils.IE,doc=win["document"],head=doc.getElementsByTagName("head")[0]||doc.documentElement,ATTACHED=data.ATTACHED,mix=S.mix;S.mix(loader,{add:function(name,def,config){var self=this,mods=self.Env.mods,o;if(S.isString(name)&&!config&&S.isPlainObject(def)){o={};o[name]=def;name=o}if(S.isPlainObject(name)){S.each(name,function(v,k){v.name=k;if(mods[k]){mix(v,mods[k],false)}});mix(mods,name);return self}if(S.isString(name)){var host;if(config&&(host=config.host)){var hostMod=mods[host];if(!hostMod){S.log("module "+host+" can not be found !","error");return self}if(self.__isAttached(host)){def.call(self,self)}else{hostMod.fns=hostMod.fns||[];hostMod.fns.push(def)}return self}self.__registerModule(name,def,config);if(config&&config["attach"]===false){return self}var mod=mods[name];var requires=utils.normalDepModuleName(name,mod.requires);if(self.__isAttached(requires)){self.__attachMod(mod)}else if(this.Config.debug&&!mod){var i,modNames;i=(modNames=S.makeArray(requires)).length-1;for(;i>=0;i--){var requireName=modNames[i];var requireMod=mods[requireName]||{};if(requireMod.status!==ATTACHED){S.log(mod.name+" not attached when added : depends "+requireName)}}}return self}if(S.isFunction(name)){config=def;def=name;if(IE){name=self.__findModuleNameByInteractive();S.log("old_ie get modname by interactive : "+name);self.__registerModule(name,def,config);self.__startLoadModuleName=null;self.__startLoadTime=0}else{self.__currentModule={def:def,config:config}}return self}S.log("invalid format for KISSY.add !","error");return self}})})(KISSY,KISSY.__loader,KISSY.__loaderUtils,KISSY.__loaderData);(function(S,loader,utils,data){if("require"in this)return;S.mix(loader,{__buildPath:function(mod,base){var self=this,Config=self.Config;build("fullpath","path");if(mod["cssfullpath"]!==data.LOADED){build("cssfullpath","csspath")}function build(fullpath,path){if(!mod[fullpath]&&mod[path]){mod[path]=utils.normalDepModuleName(mod.name,mod[path]);mod[fullpath]=(base||Config.base)+mod[path]}if(mod[fullpath]&&Config.debug){mod[fullpath]=mod[fullpath].replace(/-min/ig,"")}if(mod[fullpath]&&!mod[fullpath].match(/\?t=/)&&mod.tag){mod[fullpath]+="?t="+mod.tag}}}})})(KISSY,KISSY.__loader,KISSY.__loaderUtils,KISSY.__loaderData);(function(S,loader){if("require"in this)return;S.mix(loader,{__mixMods:function(global){var mods=this.Env.mods,gMods=global.Env.mods,name;for(name in gMods){this.__mixMod(mods,gMods,name,global)}},__mixMod:function(mods,gMods,name,global){var mod=mods[name]||{},status=mod.status;S.mix(mod,S.clone(gMods[name]));if(status){mod.status=status}if(global){this.__buildPath(mod,global.Config.base)}mods[name]=mod}})})(KISSY,KISSY.__loader,KISSY.__loaderUtils);(function(S,loader,utils){if("require"in this)return;S.mix(loader,{__findModuleNameByInteractive:function(){var self=this,scripts=document.getElementsByTagName("script"),re,script;for(var i=0;i<scripts.length;i++){script=scripts[i];if(script.readyState=="interactive"){re=script;break}}if(!re){S.log("can not find interactive script,time diff : "+(+(new Date)-self.__startLoadTime),"error");S.log("old_ie get modname from cache : "+self.__startLoadModuleName);return self.__startLoadModuleName}var src=re.src;S.log("interactive src :"+src);if(src.lastIndexOf(self.Config.base,0)==0){return utils.removePostfix(src.substring(self.Config.base.length))}var packages=self.__packages;for(var p in packages){var p_path=packages[p].path;if(packages.hasOwnProperty(p)&&src.lastIndexOf(p_path,0)==0){return utils.removePostfix(src.substring(p_path.length))}}S.log("interactive script not have package config ："+src,"error");return undefined}})})(KISSY,KISSY.__loader,KISSY.__loaderUtils);(function(S,loader,utils,data){if("require"in this)return;var win=S.__HOST,IE=utils.IE,doc=win["document"],head=doc.getElementsByTagName("head")[0]||doc.documentElement,LOADING=data.LOADING,LOADED=data.LOADED,ERROR=data.ERROR,ATTACHED=data.ATTACHED;S.mix(loader,{__load:function(mod,callback,cfg){var self=this,url=mod["fullpath"],isCss=utils.isCss(url),loadQueque=self.Env._loadQueue,node=loadQueque[url],ret;mod.status=mod.status||0;if(mod.status<LOADING&&node){mod.status=node.nodeName?LOADING:LOADED}if(S.isString(mod["cssfullpath"])){S.getScript(mod["cssfullpath"]);mod["cssfullpath"]=mod.csspath=LOADED}if(mod.status<LOADING&&url){mod.status=LOADING;if(IE&&!isCss){self.__startLoadModuleName=mod.name;self.__startLoadTime=Number(+(new Date))}ret=S.getScript(url,{success:function(){if(isCss){}else{if(self.__currentModule){S.log("standard browser get modname after load : "+mod.name);self.__registerModule(mod.name,self.__currentModule.def,self.__currentModule.config);self.__currentModule=null}mixGlobal();if(mod.fns&&mod.fns.length>0){}else{_modError()}}if(mod.status!=ERROR){S.log(mod.name+" is loaded.","info")}_scriptOnComplete()},error:function(){_modError();_scriptOnComplete()},charset:mod.charset});loadQueque[url]=ret}else if(mod.status===LOADING){utils.scriptOnload(node,_scriptOnComplete)}else{callback()}function _modError(){S.log(mod.name+" is not loaded! , can not find module in path : "+mod["fullpath"],"error");mod.status=ERROR}function mixGlobal(){if(cfg.global){self.__mixMod(self.Env.mods,cfg.global.Env.mods,mod.name,cfg.global)}}function _scriptOnComplete(){loadQueque[url]=LOADED;if(mod.status!==ERROR){if(mod.status!==ATTACHED){mod.status=LOADED}callback()}}}})})(KISSY,KISSY.__loader,KISSY.__loaderUtils,KISSY.__loaderData);(function(S,loader,data){if("require"in this)return;var win=S.__HOST,doc=win["document"],head=doc.getElementsByTagName("head")[0]||doc.documentElement,ATTACHED=data.ATTACHED,mix=S.mix;mix(loader,{__pagePath:location.href.replace(/[^/]*$/i,""),__currentModule:null,__startLoadTime:0,__startLoadModuleName:null,__isAttached:function(modNames){var mods=this.Env.mods,ret=true;S.each(modNames,function(name){var mod=mods[name];if(!mod||mod.status!==ATTACHED){ret=false;return ret}});return ret}})})(KISSY,KISSY.__loader,KISSY.__loaderData);(function(S,loader,utils){if("require"in this)return;var win=S.__HOST,doc=win["document"],head=doc.getElementsByTagName("head")[0]||doc.documentElement,buildTime=encodeURIComponent(S.buildTime);S.mix(loader,{_packages:function(cfgs){var self=this,ps;ps=self.__packages=self.__packages||{};S.each(cfgs,function(cfg){ps[cfg.name]=cfg;if(cfg.path){cfg.path=utils.normalBasePath(cfg.path)}if(cfg.tag){cfg.tag=encodeURIComponent(cfg.tag)}})},__getPackagePath:function(mod){if(mod.packagepath){return mod.packagepath}var self=this,modName=self._combine(mod.name),packages=self.__packages||{},pName="",p_def,p_path;for(var p in packages){if(packages.hasOwnProperty(p)&&S.startsWith(modName,p)&&p.length>pName){pName=p}}p_def=packages[pName];p_path=p_def&&p_def.path||self.Config.base;if(p_def&&p_def.charset){mod.charset=p_def.charset}if(p_def){mod.tag=p_def.tag}else{mod.tag=buildTime}mod.packagepath=p_path;return p_path},_combine:function(from,to){var self=this,cs;if(S.isObject(from)){S.each(from,function(v,k){S.each(v,function(v2){self._combine(v2,k)})});return}cs=self.__combines=self.__combines||{};if(to){cs[from]=to}else{return cs[from]||from}}})})(KISSY,KISSY.__loader,KISSY.__loaderUtils);(function(S,loader,data){if(S.use)return;var win=S.__HOST,doc=win["document"],head=doc.getElementsByTagName("head")[0]||doc.documentElement,LOADED=data.LOADED,mix=S.mix;S.mix(loader,{__registerModule:function(name,def,config){config=config||{};var self=this,mods=self.Env.mods,mod=mods[name]||{};mix(mod,{name:name,status:LOADED});if(mod.fns&&mod.fns.length){S.log(name+" is defined more than once")}mod.fns=mod.fns||[];mod.fns.push(def);mix(mods[name]=mod,config)}})})(KISSY,KISSY.__loader,KISSY.__loaderData);(function(S,loader,utils,data){if("require"in this)return;var win=S.__HOST,doc=win["document"],head=doc.getElementsByTagName("head")[0]||doc.documentElement,LOADED=data.LOADED,ATTACHED=data.ATTACHED;S.mix(loader,{use:function(modNames,callback,cfg){modNames=modNames.replace(/\s+/g,"").split(",");utils.indexMapping(modNames);cfg=cfg||{};var self=this,fired;if(cfg.global){self.__mixMods(cfg.global)}if(self.__isAttached(modNames)){var mods=self.__getModules(modNames);callback&&callback.apply(self,mods);return}S.each(modNames,function(modName){self.__attachModByName(modName,function(){if(!fired&&self.__isAttached(modNames)){fired=true;var mods=self.__getModules(modNames);callback&&callback.apply(self,mods)}},cfg)});return self},__getModules:function(modNames){var self=this,mods=[self];S.each(modNames,function(modName){if(!utils.isCss(modName)){mods.push(self.require(modName))}});return mods},require:function(moduleName){var self=this,mods=self.Env.mods,mod=mods[moduleName],re=self["onRequire"]&&self["onRequire"](mod);if(re!==undefined){return re}return mod&&mod.value},__attachModByName:function(modName,callback,cfg){var self=this,mods=self.Env.mods,mod=mods[modName];if(!mod){var componentJsName=self.Config["componentJsName"]||function(m){var suffix="js";if(/(.+)\.(js|css)$/i.test(m)){suffix=RegExp.$2;m=RegExp.$1}return m+"-min."+suffix},path=S.isFunction(componentJsName)?componentJsName(self._combine(modName)):componentJsName;mod={path:path,charset:"utf-8"};mods[modName]=mod}mod.name=modName;if(mod&&mod.status===ATTACHED){return}self.__attach(mod,callback,cfg)},__attach:function(mod,callback,cfg){var self=this,mods=self.Env.mods,requires=(mod["requires"]||[]).concat();mod["requires"]=requires;S.each(requires,function(r,i,requires){r=requires[i]=utils.normalDepModuleName(mod.name,r);var rMod=mods[r];if(rMod&&rMod.status===ATTACHED){}else{self.__attachModByName(r,fn,cfg)}});self.__buildPath(mod,self.__getPackagePath(mod));self.__load(mod,function(){mod["requires"]=mod["requires"]||[];var newRequires=mod["requires"];S.each(newRequires,function(r,i,newRequires){r=newRequires[i]=utils.normalDepModuleName(mod.name,r);var rMod=mods[r],inA=S.inArray(r,requires);if(rMod&&rMod.status===ATTACHED||inA){}else{self.__attachModByName(r,fn,cfg)}});fn()},cfg);var attached=false;function fn(){if(!attached&&self.__isAttached(mod["requires"])){if(mod.status===LOADED){self.__attachMod(mod)}if(mod.status===ATTACHED){attached=true;callback()}}}},__attachMod:function(mod){var self=this,defs=mod.fns;if(defs){S.each(defs,function(def){var value;if(S.isFunction(def)){value=def.apply(self,self.__getModules(mod["requires"]))}else{value=def}mod.value=mod.value||value})}mod.status=ATTACHED}})})(KISSY,KISSY.__loader,KISSY.__loaderUtils,KISSY.__loaderData);(function(S,loader,utils){if("require"in this)return;S.mix(S,loader);var baseReg=/^(.*)(seed|kissy)(-min)?\.js[^/]*/i,baseTestReg=/(seed|kissy)(-min)?\.js/i,pagePath=S.__pagePath;function getBaseUrl(script){var src=script.src,prefix=script.getAttribute("data-combo-prefix")||"??",sep=script.getAttribute("data-combo-sep")||",",parts=src.split(sep),base,part0=parts[0],index=part0.indexOf(prefix);if(index==-1){base=src.replace(baseReg,"$1")}else{base=part0.substring(0,index);var part01=part0.substring(index+2,part0.length);if(part01.match(baseTestReg)){base+=part01.replace(baseReg,"$1")}else{S.each(parts,function(part){if(part.match(baseTestReg)){base+=part.replace(baseReg,"$1");return false}})}}if(!base.match(/^(http(s)?)|(file):/i)&&!S.startsWith(base,"/")){base=pagePath+base}return base}S.__initLoader=function(){var self=this;self.Env.mods=self.Env.mods||{};self.Env._loadQueue={}};S.__initLoader();(function(){var scripts=document.getElementsByTagName("script"),currentScript=scripts[scripts.length-1],base=getBaseUrl(currentScript);S.Config.base=utils.normalBasePath(base);S.Config.timeout=10})();S.each(loader,function(v,k){S.__APP_MEMBERS.push(k)});S.__APP_INIT_METHODS.push("__initLoader")})(KISSY,KISSY.__loader,KISSY.__loaderUtils);(function(S){var win=S.__HOST,doc=win["document"],docElem=doc.documentElement,EMPTY="",isReady=false,readyList=[],readyBound=false,POLL_RETRYS=500,POLL_INTERVAL=40,RE_IDSTR=/^#?([\w-]+)$/,RE_NOT_WHITE=/\S/;S.mix(S,{isWindow:function(o){return S.type(o)==="object"&&"setInterval"in o&&"document"in o&&o.document.nodeType==9},globalEval:function(data){if(data&&RE_NOT_WHITE.test(data)){var head=doc.getElementsByTagName("head")[0]||docElem,script=doc.createElement("script");script.text=data;head.insertBefore(script,head.firstChild);head.removeChild(script)}},ready:function(fn){if(!readyBound){_bindReady()}if(isReady){fn.call(win,this)}else{readyList.push(fn)}return this},available:function(id,fn){id=(id+EMPTY).match(RE_IDSTR)[1];if(!id||!S.isFunction(fn))return;var retryCount=1,timer=S.later(function(){if(doc.getElementById(id)&&(fn()||1)||++retryCount>POLL_RETRYS){timer.cancel()}},POLL_INTERVAL,true)}});function _bindReady(){var doScroll=doc.documentElement.doScroll,eventType=doScroll?"onreadystatechange":"DOMContentLoaded",COMPLETE="complete",fire=function(){_fireReady()};readyBound=true;if(doc.readyState===COMPLETE){return fire()}if(doc.addEventListener){function domReady(){doc.removeEventListener(eventType,domReady,false);fire()}doc.addEventListener(eventType,domReady,false);win.addEventListener("load",fire,false)}else{function stateChange(){if(doc.readyState===COMPLETE){doc.detachEvent(eventType,stateChange);fire()}}doc.attachEvent(eventType,stateChange);win.attachEvent("onload",fire);var notframe=false;try{notframe=win["frameElement"]==null}catch(e){}if(doScroll&&notframe){function readyScroll(){try{doScroll("left");fire()}catch(ex){setTimeout(readyScroll,50)}}readyScroll()}}return 0}function _fireReady(){if(isReady){return}isReady=true;if(readyList){var fn,i=0;while(fn=readyList[i++]){fn.call(win,S)}readyList=null}}if(location&&(location.search||EMPTY).indexOf("ks-debug")!==-1){S.Config.debug=true}})(KISSY);(function(S,undef){S.config({combine:{core:["dom","ua","event","node","json","ajax","anim","base","cookie"]}})})(KISSY);module.exports=KISSY;exports.version=KISSY.version})