window.onload=function(){
	var floatBox=document.getElementsByClassName("rc")[0];
	var divBox=document.getElementsByClassName("rc_box")[0];
	var divX=divBox.offsetLeft+divBox.offsetWidth;
	var divY=divBox.offsetTop+divBox.offsetHeight;
	document.oncontextmenu=function(event){
		var e = event||window.event; 
		var disX=e.clientX;
		var disY=e.clientY;
		e.preventDefault();
		if(disX>divBox.offsetLeft&&disX<divX&&disY>divBox.offsetTop&&disY<divY){
			floatBox.style.display='block';
			disX=disX>divX-floatBox.offsetWidth?disX-floatBox.offsetWidth:disX;
			disY=disY>divY-floatBox.offsetHeight?disY-floatBox.offsetHeight:disY;
			floatBox.style.left=disX+'px';
			floatBox.style.top=disY+'px';
		}
		return false;
	}
	document.onclick=function(){floatBox.style.display='none';};
}