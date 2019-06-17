/**
 * Created by Administrator on 15-8-31.
 */
(function(){
    this.BeginPanelName="begin";
    this.EndPanelName="end";
    this.ExplainPanelName="explain";
    this.RankPanelName="rank";
    this.GamePanelName="game";
    this.SharePanelName="share";
    this.currentPanel;
    this.lastPanel;

    var panelName=[];
    var panels=[];
    var offX;
    /**
     * 添加界面 并实例化 装入数组
     * @param name 自定义界面名
     * @param Mc 界面的类
     * @param offx 舞台偏移量
     * @returns 返回界面元件本身
     */
    this.add=function(name,Mc,offx,arr){
        var panel;
        if(panelName.indexOf(name)==-1){
            panel=new Mc();
            panel.name=name;
            panelName.push(name);
            panels.push(panel);
            if(offx){
                panel.x=offx;
            }
            if(arr){
                addEvents(name,arr);
            }
        }else{
            console.log("已有"+name+"命名Panel!");
            panel=get(name);
        }
        return panel;
    }

    this.addEvents=function(name,arr){
        var p=get(name);
        var btn;
        if(!arr) return;
        if(typeof(arr[0])=="string"){
            btn=eval("p."+arr[0]);
            getEvent(btn,arr,name);
        }else{
            for(var i=0;i<arr.length;i++){
                var a=arr[i];
                btn=eval("p."+a[0]);
                getEvent(btn,a,name);
            }
        }
    }

    this.getAllPanels=function(){
        return panels;
    }

    function getEvent(btn,arr,name){
        if(!btn){
            console.log("没有"+arr[0]+"这个按钮！！");
            return;
        }
        if(arr[2]||arr[2]==0){
            var obj=arr[2];
        }
        btn.addEventListener("click",function(){
            if(PanelsC.currentPanel.name!=name) return;
            arr[1](obj);
        });
    }
    /**
     * 添加一个已经实例化的界面进来
     * @param name 自定义界面名
     * @param panel 界面元件
     * @param offx 偏移量
     */
    this.pushP=function(name,panel,offx){
        if(panelName.indexOf(name)==-1){
            panel.name=name;
            panelName.push(name);
            panels.push(panel);
            panel.x=offx;
        }else{
            console.log("已有"+name+"命名Panel!");
        }
    }
    /**
     * 将自定义命名为name的界面添加到舞台上
     * @param name 需要显示的界面的名字
     * @returns 返回显示界面
     */
    this.showPanel=function(name){
        var panel;
        panel=get(name);
        if(!panel){
            console.log("没有"+name+"命名Panel!");
            return;
        }
        if(!stage.contains(panel)){
            stage.addChild(panel);
        }
        if(panel.initPanel){
            panel.initPanel();
        }
        return panel;
    }
    /**
     * 将自定义命名为name的界面从舞台上移除
     * @param name 需要移除的界面的名字
     */
    this.hidePanel=function(name){
        var panel;
        panel=get(name);
        if(stage.contains(panel)){
            stage.removeChild(panel);
        }
    }
    /**
     * 获取自定义命名为name的界面
     * @param name 获取界面的名字
     * @returns 返回该界面
     */
    this.get=function(name){
        var panel;
        var i=panelName.indexOf(name);
        if(i==-1){
            console.log("没有"+name+"的Panel!");
            return;
        }
        panel=panels[i];
        return panel;
    }
    /**
     * 初始化beginPanel，gamePanel，endPanel，sharePanel
     * @param n 舞台偏移量
     */
    this.getPanels=function(n){
        offX=n;
        var beginPanel;
        var gamePanel;
        var endPanel;
        var sharePanel;
        beginPanel=add(this.BeginPanelName,lib.BeginPanel,offX,[["beginBtn",window.gameInit],["shareBtn",function(){
            PanelsC.goto(this.SharePanelName);
        }]]);
        if(beginPanel.explainBtn){
            getExplain(beginPanel);
        }
        if(beginPanel.rankBtn){
            getRankPan(beginPanel);
        }
        gamePanel=add(this.GamePanelName,lib.GamePanel,offX);
        if(lib.SharePanel){
            sharePanel=add(this.SharePanelName,lib.SharePanel,offX,["mc",PanelsC.back]);
        }
        endPanel=add(this.EndPanelName,lib.EndPanel,offX,[["againBtn",window.gameInit]
            ,["backBtn",function(){
                PanelsC.goto(PanelsC.BeginPanelName);
            }],["shareBtn",function(){
                PanelsC.goto(PanelsC.SharePanelName,true);
            }]]);
        if(endPanel.explainBtn){
            getExplain(endPanel);
        }
        if(endPanel.rankBtn){
            getRankPan(endPanel);
        }
    }
    /**
     * 初始化rankPanel
     * @param panel 含有rankBtn的界面
     */
    function getRankPan(panel){
        var rankPanel=this.get(this.RankPanelName);
        if(!rankPanel){
            if(lib.RankPanel){
                rankPanel=add(this.RankPanelName,lib.RankPanel,offX);
                rankPanel.backBtn.addEventListener("click",function(){
                    PanelsC.goto(this.lastPanel.name);
                })
            }
            if(lib.RankPanelSkin){
                rankPanel=add(this.RankPanelName,RankPanel,offX);
                rankPanel.onBack=function(){
                    PanelsC.goto(PanelsC.lastPanel.name);
                };
            }
        }
        addEvents(panel.name,["rankBtn",function(){
            if(rankPanel){
                PanelsC.goto(PanelsC.RankPanelName);
            }else{
                window.showRank();
            }
        }]);
    }

    /**
     * explainPanel
     * @param panel 含有explainBtn的界面
     */
    function getExplain(panel){
        var explainPanel=get(this.ExplainPanelName);
        if(!explainPanel){
            if(lib.ExplainPanelSkin){
                explainPanel=add(this.ExplainPanelName,ExplainPanel,offX);
                explainPanel.onBack=function(){
                    PanelsC.goto(PanelsC.lastPanel.name);
                }
            }else{
                explainPanel=add(this.ExplainPanelName,lib.ExplainPanel,offX);
                explainPanel.backBtn.addEventListener("click",function(){
                    PanelsC.goto(this.lastPanel.name);
                });
            }
        }
        addEvents(panel.name,["explainBtn",function(){
            PanelsC.goto(PanelsC.ExplainPanelName);
        }]);
    }

    /**
     * 跳转到命名为str的界面
     * @param str
     * @param bool
     */
    this.goto=function(str,bool){
        if(bool){
            if(PanelsC.bottomPanel){
                PanelsC.hidePanel(PanelsC.currentPanel.name);
            }else{
                PanelsC.bottomPanel=PanelsC.currentPanel;
            }
        }else{
            if(PanelsC.currentPanel){
                PanelsC.hidePanel(PanelsC.currentPanel.name);
            }
            if(PanelsC.bottomPanel){
                PanelsC.hidePanel(PanelsC.bottomPanel.name);
                PanelsC.bottomPanel=false;
            }
        }
        this.lastPanel=this.currentPanel;
        this.currentPanel=PanelsC.showPanel(str);
    }

    this.back=function(){
        goto(PanelsC.lastPanel.name);
    }

    /**
     * 自制弹窗（没波波的好用就不用了）
     */
    var popfunc;
    this.popWord=function(str,func){
        var pop=get("pop");
        popfunc=func;
        if(!pop){
            pop=add("pop",lib.PopPanel);
            pop.addEventListener("click",onPoped);
        }
        showPanel("pop");
        pop.txt.text=str;
        pop.x=(brWidth-pop.nominalBounds.width*scaling)/2+30;
        pop.y=(brHeight-pop.nominalBounds.height*scaling)/2;
    }

    function onPoped(){
        hidePanel("pop");
        if(popfunc){
            popfunc();
        }
    }

    /**
     * 获取rankItem
     * @param num rankItem的数量
     * @param mc rankItem的父容器
     * @returns 返回装着所有rankItem的数组
     */
    this.getRankItems=function(num,mc,str){
        var rankArr;
        if(!str){
            str="rank";
        }
        var rankArrstr="[";
        for(var i=0;i<num;i++){
            if(i!=num-1){
                rankArrstr=rankArrstr+"mc."+str+i+",";
            }else{
                rankArrstr=rankArrstr+"mc."+str+i;
            }
        }
        rankArrstr=rankArrstr+"]";
        rankArr=eval(rankArrstr);
        return rankArr;
    }

    window.PanelsC=this;
})();
(function(){

    var scrT = document.documentElement.scrollTop || document.body.scrollTop;
    var scrL= document.documentElement.scrollLeft || document.body.scrollLeft;
    document.onscroll = function(){
        scrT = document.documentElement.scrollTop || document.body.scrollTop;
        scrL= document.documentElement.scrollLeft || document.body.scrollLeft;
    }
    var marginLeft=document.getElementById("container").offsetLeft;
    var marginTop=0;
    var touchMc,backBtn,panel;
    explainPanel=function(skinMc){
        this.initialize();
        if(!skinMc){
            this.skin=new lib.ExplainPanelSkin();
        }else{
            this.skin=new skinMc();
        }
        this.addChild(this.skin);
        this.onBack=null;
    }
    var bp=explainPanel.prototype=new createjs.Container();
    bp.initPanel=function(){
        touchMc=this.skin.bar;
        backBtn=this.skin.backBtn;
        panel=this;
        openTouchClick("container");
        if(touchMc){
            document.addEventListener("touchmove",onMoveonMove);
        }else{
            document.addEventListener("touchstart",onStart);
            document.addEventListener("touchmove",onMoveonMove1);
        }
        addListenerList(back,backBtn);
    }

    function onMoveonMove(e){
        e.preventDefault();
        var yy= e.clientY||e.targetTouches[0].clientY;
        touchMc.y=yy/scaling-touchMc.nominalBounds.height*touchMc.scaleY+10;
        if(touchMc.y+touchMc.nominalBounds.height*touchMc.scaleY-10<=panel.skin.stripBg.y){
            touchMc.y=panel.skin.stripBg.y-touchMc.nominalBounds.height*touchMc.scaleY+10;
        }else if(touchMc.y+touchMc.nominalBounds.height*touchMc.scaleY-10>=panel.skin.stripBg.y+panel.skin.stripBg.nominalBounds.height*panel.skin.stripBg.scaleY){
            touchMc.y=panel.skin.stripBg.y+panel.skin.stripBg.nominalBounds.height*panel.skin.stripBg.scaleY-touchMc.nominalBounds.height*touchMc.scaleY+10;
        }
        panel.skin.words.y=-((((touchMc.y)-panel.skin.stripBg.y)*(panel.skin.words.nominalBounds.height*panel.skin.words.scaleY-panel.skin.positionMc.nominalBounds.height*panel.skin.positionMc.scaleY))/(panel.skin.stripBg.nominalBounds.height*panel.skin.stripBg.scaleY)-panel.skin.positionMc.y);
    }
    var currenty,currentPanelY;
    function onStart(e){
        currenty= e.clientY||e.targetTouches[0].clientY;
        currentPanelY=panel.skin.words.y;
    }

    function onMoveonMove1(e){
        e.preventDefault();
        var yy=e.clientY||e.targetTouches[0].clientY;
        panel.skin.words.y=currentPanelY+(yy-currenty);
        if(panel.skin.words.y>panel.skin.positionMc.y){
            panel.skin.words.y=panel.skin.positionMc.y;
        }else if(panel.skin.words.y+panel.skin.words.nominalBounds.height<panel.skin.positionMc.y+panel.skin.positionMc.nominalBounds.height*panel.skin.positionMc.scaleY){
            panel.skin.words.y=panel.skin.positionMc.y+panel.skin.positionMc.nominalBounds.height*panel.skin.positionMc.scaleY-panel.skin.words.nominalBounds.height;
        }
    }

    function back(){
        if(panel.onBack){
            panel.onBack();
            closeTouchClick();
            document.removeEventListener("touchmove",onMoveonMove);
            document.removeEventListener("touchmove",onMoveonMove1);
        }
    }

    window.ExplainPanel=explainPanel;
})();
(function(){
    var touchMc,backBtn,panel;
    var rankArr;
    rankPanel=function(){
        this.initialize();
        this.skin=new lib.RankPanelSkin();
        this.addChild(this.skin);
        this.onBack=null;
    }
    var bp=rankPanel.prototype=new createjs.Container();
    bp.initPanel=function(){
        touchMc=this.skin.bar;
        backBtn=this.skin.backBtn;
        panel=this;
        panel.skin.words.y=panel.skin.positionMc.y;
        openTouchClick("container");
        window.showRank();
        if(touchMc){
            document.addEventListener("touchmove",onMoveonMove);
        }else{
            document.addEventListener("touchstart",onStart);
            document.addEventListener("touchmove",onMoveonMove1);
        }
        addListenerList(back,backBtn);
    }
    function onMoveonMove(e){
        e.preventDefault();
        var yy= e.clientY||e.targetTouches[0].clientY;
        touchMc.y=yy/scaling;
        if(touchMc.y<=panel.skin.stripBg.y){
            touchMc.y=panel.skin.stripBg.y;
        }else if(touchMc.y+touchMc.nominalBounds.height*touchMc.scaleY-10>=panel.skin.stripBg.y+panel.skin.stripBg.nominalBounds.height*panel.skin.stripBg.scaleY){
            touchMc.y=panel.skin.stripBg.y+panel.skin.stripBg.nominalBounds.height*panel.skin.stripBg.scaleY-touchMc.nominalBounds.height*touchMc.scaleY+10;
        }
        panel.skin.words.y=-((((touchMc.y)-panel.skin.stripBg.y)*(panel.skin.words.nominalBounds.height*panel.skin.words.scaleY-panel.skin.positionMc.nominalBounds.height*panel.skin.positionMc.scaleY))/(panel.skin.stripBg.nominalBounds.height*panel.skin.stripBg.scaleY-touchMc.nominalBounds.height*touchMc.scaleY)-panel.skin.positionMc.y);
    }
    var currenty,currentPanelY;
    function onStart(e){
        currenty= e.clientY||e.targetTouches[0].clientY;
        currentPanelY=panel.skin.words.y;
    }

    function onMoveonMove1(e){
        e.preventDefault();
        var yy=e.clientY||e.targetTouches[0].clientY;
        panel.skin.words.y=currentPanelY+(yy-currenty);
        if(panel.skin.words.y>panel.skin.positionMc.y){
            panel.skin.words.y=panel.skin.positionMc.y;
        }else if(panel.skin.words.y+panel.skin.words.nominalBounds.height<panel.skin.positionMc.y+panel.skin.positionMc.nominalBounds.height*panel.skin.positionMc.scaleY){
            panel.skin.words.y=panel.skin.positionMc.y+panel.skin.positionMc.nominalBounds.height*panel.skin.positionMc.scaleY-panel.skin.words.nominalBounds.height;
        }
    }
    function back(){
        if(panel.onBack){
            panel.onBack();
            closeTouchClick();
            document.removeEventListener("touchmove",onMoveonMove);
        }
    }

    window.RankPanel=rankPanel;
})();