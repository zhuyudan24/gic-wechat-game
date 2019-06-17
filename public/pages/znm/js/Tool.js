/**
 * Created with JetBrains WebStorm.
 * User: lsl
 * Date: 16-6-29
 * Time: 下午7:30
 * To change this template use File | Settings | File Templates.
 */
var brWidth = document.documentElement.clientWidth;
var brHeight = document.documentElement.clientHeight;
var scale= 1,pyNum= 0,container;
scale=brHeight/960;
var w=760*scale;
container = document.getElementById("container");
container.style.width=w+'px';
container.style.height=brHeight+'px';
container.style.marginLeft = (brWidth-w)/2+"px";
pyNum=(brWidth-w)/2;
container.style.display="block";
/*alert*/
var alertObj=function(container,btn){
    this.show = function (str,call0,call1) {
        var parent = document.getElementById(container);
        var div = document.createElement("div");
        div.setAttribute("id", "alertPage");
        var divStr = '<div class="alert_content"><div id="alertInfo">'+str+'</div>' +
            '<div class="aler_button">';
        if(btn==1){
            divStr+='<div id="confirm" class="gobutton">确定</div></div></div>';
        }else{
            divStr+='<div id="confirm" class="gobutton">是</div><div class="gobutton" id="callOff">否</div></div></div>';
        }
        div.innerHTML = divStr;
        parent.appendChild(div);
        if(btn==1){
            var confirm = document.getElementById('confirm');
            confirm.addEventListener('click', function() {
                if(call0){
                    call0();
                }
                alertPage.close();
            });
        }else{
            var confirm = document.getElementById('confirm');
            confirm.addEventListener('click', function() {
                if(call0){
                    call0();
                }
                alertPage.close();
            });
            var callOff = document.getElementById('callOff');
            callOff.addEventListener('click', function() {
                if(call1){
                    call1();
                }
                alertPage.close();
            });
        }
    }
    this.close = function(){
        var idObject = document.getElementById('alertPage');
        idObject.parentNode.removeChild(idObject);
    }
}
var alertPage=new alertObj("container",1);
/*loading*/
function loading(container){
    var parent = document.getElementById(container);
    var div = document.createElement("div");
    div.setAttribute("id", "loadingPage");
    div.setAttribute("class", "loading");
    var divStr = '<div class="loadEffect"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>';
    div.innerHTML = divStr;
    parent.appendChild(div);
    this.show = function () {
        document.getElementById("loadingPage").style.display = "block";
    }
    this.hide = function(){
        document.getElementById("loadingPage").style.display = "none";
    }
}
var loadingPage=new loading("container");
function randomArray(_array)
{
    _array.sort(function () {return ( Math.floor(Math.random()*3) ? (1) : (-1) ) });
    return _array;
}
//        电话号码的正则验证
function checkPhone(data) {
    if (data == '' || data == null) {
        return false
    } else {
        var reg = /^(1[0-9])\d{9}$/;
        var result = reg.test(data);
        return result
    }
}
var brWidth = document.documentElement.clientWidth;
var brHeight = document.documentElement.clientHeight;
var scaling=brHeight/960;

//使用touch事件坐标判断代替点击事件
var evtP;
var scrT,scrL,curListenerList;
var libScale=scaling;
var marginLeft=document.getElementById("container").offsetLeft;
var marginTop=0;
scrT = document.documentElement.scrollTop || document.body.scrollTop;
scrL= document.documentElement.scrollLeft || document.body.scrollLeft;
document.onscroll = function(){
    scrT = document.documentElement.scrollTop || document.body.scrollTop;
    scrL= document.documentElement.scrollLeft || document.body.scrollLeft;
}
window.openTouchClick=function(str){
    stage.name="stage";
    evtP=document.getElementById(str);
    curListenerList=[];
    evtP.ontouchstart=onMouseDown;
    evtP.onmousedown=onMouseDown;
}
window.closeTouchClick=function(){
    removeListenerList("all");
    evtP.ontouchstart=null;
    evtP.onmousedown=null;
}
function onMouseDown(e){
    if(curListenerList.length<=0) return;
    e.preventDefault();
    var xx= e.clientX||e.targetTouches[0].clientX;
    var yy= e.clientY||e.targetTouches[0].clientY;
    mx=(xx-marginLeft+scrL)||0;
    my=(yy-marginTop+scrT)||0;
    for(var i=0;i<curListenerList.length;i++)
    {
        curListenerList[i].listener();
    }
}

window.addListenerList=function(b,a)
{
    var o={target:a,listener:null};
    if(a.name=="stage")
    {
        o.listener=b;
        curListenerList.push(o);
    }else{
        if(a.parent.name!="stage")
        {
            var c=function(){
                if(a.visible==false) return;
                var p= {x:mx,y:my};//a.parent.globalToLocal(mx,my);
                var aInS_X=(getRealX(a)-a.regX* a.scaleX)*libScale;
                var aInS_Y= (getRealY(a)-a.regY* a.scaleY)*libScale;
                if(p.x>= aInS_X&&p.x<=aInS_X+ a.nominalBounds.width* a.scaleX*libScale&& p.y>=aInS_Y&& p.y<=aInS_Y+a.nominalBounds.height* a.scaleY*libScale){
                    b(o);
                }
            }
            o.listener=c;
            curListenerList.push(o);
        }
    }
}

function getRealX(a){
    var num= a.x;
    while(a.parent){
        a= a.parent;
        num+= a.x-a.regX* a.scaleX;
    }
    return num;
}

function getRealY(a){
    var num= a.y;
    while(a.parent){
        a= a.parent;
        num+= a.y-a.regY* a.scaleY;
    }
    return num;
}

window.removeListenerList=function(a){
    if(a=="all")
    {
        curListenerList=[];
    }else{
        for(var i=0;i<curListenerList.length;i++)
        {
            if(curListenerList[i].target==a){
                curListenerList.splice(i,1);
            }
        }
    }
}


function checkPlayEnd(mc){
    return (mc.currentFrame==mc.timeline.duration-1);
}
var alertPage;
function alert_pop(msg){
    alertOverwrite(msg);
}
var AjaxObj=function(){
    this.backFunc=null;
    this.timout=-100;
    this.isCanSend=true;
}
AjaxObj.prototype={
    send:function(url,sendarr,func,timeout,method){
        if(!this.isCanSend) return;
        this.isCanSend=false;
        url = location.origin + '/gicfwh/' + url;
        var str="";
        var mtd="post";
        var tot=20000;
        if(method){
            mtd=method;
        }
        if(timeout){
            tot=timeout;
        }
        if(typeof(sendarr[0])=="string"){
            str=sendarr[0]+"="+sendarr[1];
        }else{
            for(var i=0;i<sendarr.length;i++){
                if(i!=0){
                    str+="&"+sendarr[i][0]+"="+sendarr[i][1];
                }else{
                    str+=sendarr[i][0]+"="+sendarr[i][1];
                }
            }
        }
        loadingPage.show();
        this.timout=setTimeout(ajaxOBJ.sendOver,tot);
        this.backFunc=func;
        this.ajax(mtd,url,str,true,false,function(result){
            ajaxOBJ.isCanSend=true;
            var r=eval("("+result+")");
            clearTimeout(ajaxOBJ.timout);
            if(r.errorCode !== 0){
                alert_pop(r.msg);
            }else{
                if(ajaxOBJ.backFunc){
                    ajaxOBJ.backFunc(r);
                }
            }
            loadingPage.hide();
        });
    },
    sendOver:function(){
        this.isCanSend=true;
        alert_pop("请求超时！请检查网络稍后再试！");
        this.backFunc=null;
        loadingPage.hide();
    },
    ajax:function(method,url,param,flag,isFile,returnFun){
        var httpRequest = null;
        if(window.XMLHttpRequest){
            httpRequest = new XMLHttpRequest();
        }else if(window.ActiveXObject){
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }

        httpRequest.onreadystatechange = function(){
            if(httpRequest.readyState == 4 && httpRequest.status == 200){
                returnFun(httpRequest.responseText);
            }
        }

        if(method == "get"){
            //get请求的设置以及发送方式
            var queryString = "";
            if(param != "" || param != null){
                queryString = "?"+param;
            }
            httpRequest.open("get",url+queryString,flag);
            httpRequest.send(null);
        }else if(method == "post"){
            //POST
            httpRequest.open("post",url,flag);
            if(!isFile){
                httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            }
            httpRequest.send(param);
        }
    }
}
var ajaxOBJ=new AjaxObj();

function checkNum(data) {
    if (data == '' || data == null) {
        return false
    } else {
        //var reg = /^([1-9])\d{1,4}$/;
        var reg =/^[1-9]\d*$|^0$/;
        var result = reg.test(data);
        return result;
    }
}
function isCardNo(card)
{
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    if(card == '' || card == null)
    {
        return  false;
    }else{
        var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
        var result1= reg.test(card);
        return result1;
    }
}
