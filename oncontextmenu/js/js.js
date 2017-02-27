window.onload=function(){
	var floatBox=document.getElementsByClassName("rc")[0];
	var docX=document.body.clientWidth || document.documentElement.clientWidth;
	var docY=document.body.clientHeight || document.documentElement.clientHeight;
	document.oncontextmenu=function(event){
		var e = event||window.event; 
		var disX=e.clientX;
		var disY=e.clientY;
		e.preventDefault();
		floatBox.style.display='block';
		disX=disX>docX-floatBox.offsetWidth?disX-floatBox.offsetWidth:disX;
		disY=disY>docY-floatBox.offsetHeight?disY-floatBox.offsetHeight:disY;
		floatBox.style.left=disX+'px';
		floatBox.style.top=disY+'px';
		return false;
	}
	document.onclick=function(){floatBox.style.display='none';};
}