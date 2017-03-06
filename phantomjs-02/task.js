"use strict";

var page = require('webpage').create(),
	system = require('system');
var result = {
	code: 1, //返回状态码，1为成功，0为失败
	msg: '抓取成功', //返回的信息
	word: system.args[1], //抓取的关键字
	time: null, //任务的时间
	device:system.args[2], //设备名称
	dataList: [] //抓取结果列表
};
var url=encodeURI('https://baidu.com/s?wd=' + system.args[1]);

phantom.outputEncoding = 'gbk';
result.time = Date.now();

if(system.args[2] === 'ipad'){
    page.settings.userAgent = 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    page.viewportSize = { width: 768, height: 1028 };
    page.clipRect = { top: 0, left: 0, width: 768, height: 1028 };
}
else if(system.args[2] === 'iphone5'){
    page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    page.viewportSize = { width: 320, height: 568 };
    page.clipRect = { top: 0, left: 0, width: 320, height: 568 };
}
else if(system.args[2] === 'iphone6'){  
    page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    page.viewportSize = { width: 375, height: 667 };
    page.clipRect = { top: 0, left: 0, width: 375, height: 667 };
}

page.open(url, function(status) {
	if(status === "success") {
		var ua=page.evaluate(function(){
			var arr=document.getElementsByClassName("result");
			var dataList=[];
			for (var i=0;i<arr.length;i++) {
				var ar=new Object();
				ar.title=arr[i].getElementsByClassName('t')[0].innerText;
				ar.info=arr[i].getElementsByClassName('c-abstract')[0].innerText;
                ar.link=arr[i].getElementsByClassName('t')[0].getElementsByTagName('a')[0].getAttribute('href'); 
                ar.pic=arr[i].getElementsByClassName('c-img')[0]!==undefined?arr[i].getElementsByClassName('c-img')[0].src:'';
			    dataList.push(ar);
			}
			return dataList;
		});
	}else{
		result.code=0;
		result.msg='抓取失败';
	}
	result.dataList=ua;
	result.time = Date.now() - result.time;
	console.log(JSON.stringify(result,null,4));
	phantom.exit();
});
