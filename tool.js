function $(sel,parent,tagName){
	parent=parent||document;
	tagName=tagName||"*";
	if(sel.charAt(0)=="#"){
		return document.getElementById(sel.substring(1));
	}else if(sel.charAt(0)=="."){
		var allEls=parent.getElementsByTagName(tagName);
		var arrAllEls=[];
		for(var i=0;i<allEls.length;i++){
			var arrClassNames=allEls[i].className.split(" ");
			for(var j=0;j<arrClassNames.length;j++){
				if(arrClassNames[j]==sel.slice(1)){
					arrAllEls.push(allEls[i]);
					break;
				}
			}
		}
		return arrAllEls;
	}
	else{
		return parent.getElementsByTagName(sel);
	}
}	

//封装一个兼容的 获取最终计算后的样式的方法
function getStyle(obj,attr){
	return	obj.currentStyle ?obj.currentStyle[attr] :getComputedStyle(obj)[attr];
} 
    
//这是一个查找数组的值得方法
function arrIndexOf(arr,val,index){
	if(arguments.length!=0&&arguments.length!=1){
		index=index||0;
		for(var i=index;i<arr.length;i++){
			if(arr[i]===val){
				return i;
			}
		}
		return -1;
	}
	return "您写的参数不对";
}

//封装一个添加class的函数	
function addClass(obj,className){
	if(obj.className==""){
		obj.className=className;
	}else{
		var arrClassNames=obj.className.split(" ");
			
		var Index=arrIndexOf(arrClassNames,className)
		if(Index==-1){
			obj.className+=" "+className;
		}
	}
}

//封装一个删除class的函数
function removeClass(obj,className){
	if(obj.className!==""){
		var arrClassNames=obj.className.split(" ");
		for(var j=0;j<arrClassNames.length;j++){
			
			if(arrClassNames[j]==className){
				
				arrClassNames.splice(j,1);
			}
		}
		obj.className=arrClassNames.join(" ");
	}
}
		
//封装一个兼容性的一个getElementsByClassName函数
function getClassName(myLei,parent,tagName){
	 parent=parent||document;
	 tagName=tagName||"*";
	 var aELs=parent.getElementsByTagName(tagName);
	 //建立一个空数组，用于存储所有符合要找的类的元素
	 var arrEls=[];
	 //遍历所有标签
	for(var i=0;i<aELs.length;i++){
		//每次循环将对应标签的class拿到，通过空格分割转化成数组
		var arrClassNames=aELs[i].className.split(" ")// ""[""]  "aa" ["aa"] "cc aa box" ["cc","aa","box"]
		//循环数组里面的所有类名
		for(var j=0;j<arrClassNames.length;j++){//["cc","aa","box"];
		//一旦有一个类名符合当前要找的类
			if(arrClassNames[j]==myLei){
				//就把当前的标签往数组里面放
				arrEls.push(aELs[i]);"aa"
				//不再往后看
				break;
			}
		};
	};
	//当整个循环结束之后，返回该数组 （数组里面会存下所有符合当前类的标签）
	return arrEls;// div li	
}

//这是一个dom的节点兼容的函数封装 
function first(eles){
	var first=eles.firstElementChild||eles.firstChild;
	if(!first||first.nodeType!==1){
		return null;
	}else{
		return first;
	}
}

function last(eles){
	var last=eles.lastElementChild||eles.lastChild;
	if(!last||last.nodeType!==1){
		return null;
	}else{
		return last;
	}
}
function next(eles){
	var next=eles.nextElementSibling||eles.nextSibling;
	if(!next||next.nodeType!==1){
		return null;
	}else{
		return next;
	}
}
function prev(eles){
	var prev=eles.previousElementSibling||eles.previousSibling;
	if(!prev||prev.nodeType!==1){
		return null;
	}else{
		return prev;
	}
}

//随机颜色色值
function randomColor(){
	var R=Math.round(Math.random()*255).toString(16);
	var G=Math.round(Math.random()*255).toString(16);
	var B=Math.round(Math.random()*255).toString(16);
	return '#' + ( R.length>1 ? R : '0'+R ) + ( G.length>1 ? G : '0'+G ) + ( B.length>1 ? B : '0'+B );
}

//AJAX
function ajax(method,url,data,fn){
	var xhr=null;
	try{
		xhr=new XMLHttpRequest();
	}catch(e){
		xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(method=="get"&&data) url=url+"?"+data;
	xhr.open(method,url,true);
	if(method=="post"){
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
		xhr.send(data);
	}else{
		xhr.send();
	}
	xhr.onreadystatechange=function(){ 
		if(xhr.readyState==4){
			if(xhr.status==200){
				fn(xhr.responseText);
			}else{
				console.log("错误状态码："+xhr.status);
			}
		}
	}
}

//运动函数
function Move(obj,json,fn){  
    //停止上一次定时器  
    clearInterval(obj.timer);  
    //保存每一个物体运动的定时器  
    obj.timer = setInterval(function(){  
        //判断同时运动标志  
        var bStop = true;  
        for(var attr in json){    
            //取当前值    
            var iCur = 0;  
            if(attr == 'opacity'){  
                iCur = parseInt(parseFloat(getStyle(obj, attr))*100);  
            }else{  
                iCur = parseInt(getStyle(obj,attr));  
            }  
            //计算速度  
            var iSpeed = (json[attr] - iCur) / 8;  
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);  
            //检测同时到达标志  
            if(iCur != json[attr]){  
                bStop = false;  
            }     
            //更改属性，获取动画效果  
            if(attr=='opacity'){  
                iCur += iSpeed  
                obj.style.filter='alpha(opacity:' + iCur + ')';  
                obj.style.opacity=iCur / 100;  
            }  
            else{  
                obj.style[attr]=iCur+iSpeed+'px';  
            }  
        }  
        //检测停止  
        if(bStop){  
            clearInterval(obj.timer);  
//          if(fn) fn();  
            fn&&fn();
        }  
    },30)  
} 

//抛物线函数
function parabola(obj,target,speed,fn){
	obj.timer=null;
	var a=0.005;
	var objPos={
		"left":parseInt(getStyle(obj,"left")),
		"top":parseInt(getStyle(obj,"top"))
	}
	var coord={
		"x":target.left-objPos.left,
		"y":target.top-objPos.top
	}
	var b=(coord.y-a*coord.x*coord.x)/coord.x;
	var num=0;
	obj.timer=setInterval(function(){
		num+=speed;
		obj.style.left=objPos.left+  num  +"px";
		obj.style.top=objPos.top+ a*num*num+b*num  +"px";
		if(num>=coord.x){
			clearInterval(obj.timer);
			obj.style.left=target.left+"px";
			obj.style.top=target.top+"px";
			fn&&fn();
		}	
	},30)
}

//缓冲运动
function buffertMove(iTarget){  
    var oDiv = document.getElementById('div1');  
    clearInterval(timer);  
    timer = setInterval(function(){  
        var iSpeed = (iTarget - oDiv.offsetLeft) / 8;  
        //对正的速度向上取整，负的速度向下取整  
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);  
        if(oDiv.offsetLeft == iTarget){  
            clearInterval(timer);  
        }else{  
            oDiv.style.left = oDiv.offsetLeft + iSpeed + 'px';  
        }  
        document.title = oDiv.offsetLeft + '...' + iSpeed;  
    },30);  
} 
