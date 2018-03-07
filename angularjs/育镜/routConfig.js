/**
 * Created by zhuwenqi on 2016/2/17.
 */
app.config(["$provide","$compileProvider","$controllerProvider","$filterProvider",
	function($provide,$compileProvider,$controllerProvider,$filterProvider){
		app.controller = $controllerProvider.register;
		app.directive = $compileProvider.directive;
		app.filter = $filterProvider.register;
		app.factory = $provide.factory;
		app.service  =$provide.service;
		app.constant = $provide.constant;
	}
]);

//配置路由中使用的变量
var digitComm = resourceResPath + '/common/digitComm.'+ minV +'js';
var audioPlay = resourceResPath + '/common/audioPlay.'+ minV +'js';

var attentionCss = resourceResPath + '/resources/front/css/liangbiao/attention.'+ minV +'css';
var attentionCtrl = resourceResPath + '/resources/front/js/liangbiao/attentionCtrl.'+ minV +'js';

var yitaiModeCss = resourceResPath + '/resources/front/css/liangbiao/yitaiMode.'+ minV +'css'+'?vs=20171020';
var yitaiModeCtrl = resourceResPath + '/resources/front/js/liangbiao/yitaiModeCtrl.'+ minV +'js'+'?vs=20171020';
//var yitaiModeCtrl = '../../../resources/front/js/liangbiao/yitaiModeCtrl.js';

var yitaiModeJs = resourceResPath + '/resources/front/js/lbjsCode/yitaiMode.'+ minV +'js';

var fillModeCss = resourceResPath + '/resources/front/css/liangbiao/fillMode.'+ minV +'css';
var fillModeCtrl = resourceResPath + '/resources/front/js/liangbiao/fillModeCtrl.'+ minV +'js';

var listenCiYuCss = resourceResPath + '/resources/front/css/liangbiao/listenCiYu.'+ minV +'css';
var listenCiYuCtrl = resourceResPath + '/resources/front/js/liangbiao/listenCiYuCtrl.'+ minV +'js';

var listenDigitCss = resourceResPath + '/resources/front/css/liangbiao/listenDigit.'+ minV +'css';
var listenDigitCtrl = resourceResPath + '/resources/front/js/liangbiao/listenDigitCtrl.'+ minV +'js';

var viewRememberCss = resourceResPath + '/resources/front/css/liangbiao/viewRemember.'+ minV +'css';
var viewRememberCtrl = resourceResPath + '/resources/front/js/liangbiao/viewRememberCtrl.'+ minV +'js';
var viewRememberJs = resourceResPath + '/resources/front/js/lbjsCode/viewRemember.'+ minV +'js';

var lookDigitCss = resourceResPath + '/resources/front/css/liangbiao/lookDigit.'+ minV +'css';
var lookDigitCtrl = resourceResPath + '/resources/front/js/liangbiao/lookDigitCtrl.'+ minV +'js';

var lookCiYuCss = resourceResPath + '/resources/front/css/liangbiao/lookCiYu.'+ minV +'css';
var lookCiYuCtrl = resourceResPath + '/resources/front/js/liangbiao/lookCiYuCtrl.'+ minV +'js';

var guideTempleteCss = resourceResPath+'/resources/front/css/liangbiao/guideTemplete.'+ minV +'css';
var guideTempleteCtrl = resourceResPath + '/resources/front/js/liangbiao/guideTempleteCtrl.'+ minV +'js';

var listenWordZRCss = resourceResPath + '/resources/front/css/liangbiao/listenWordZR.'+ minV +'css';
var listenWordZRCtrl = resourceResPath + '/resources/front/js/liangbiao/listenWordZRCtrl.'+ minV +'js';

var lookWordZRCss = resourceResPath + '/resources/front/css/liangbiao/lookWordZR.'+ minV +'css';
var lookWordZRCtrl = resourceResPath + '/resources/front/js/liangbiao/lookWordZRCtrl.'+ minV +'js';
  
var markPatternCss = resourceResPath + '/resources/front/css/liangbiao/markPattern.'+ minV +'css';
var markPatternCtrl = resourceResPath + '/resources/front/js/liangbiao/markPatternCtrl.'+ minV +'js';

var muteModeCss = resourceResPath + '/resources/front/css/liangbiao/muteMode.'+ minV +'css';
var muteModeCtrl = resourceResPath + '/resources/front/js/liangbiao/muteModeCtrl.'+ minV +'js';

var timeSelectModeCss = resourceResPath+'/resources/front/css/liangbiao/timeSelectMode.'+ minV +'css';
var timeSelectModeCtrl = resourceResPath + '/resources/front/js/liangbiao/timeSelectModeCtrl.'+ minV +'js';

var startBranchCss = resourceResPath + '/resources/front/css/liangbiao/startBranch.'+ minV +'css';
var startBranchCtrl = resourceResPath + '/resources/front/js/liangbiao/startBranchCtrl.'+ minV +'js'+'?vs=20171020';
//var startBranchCtrl = '../../../resources/front/js/liangbiao/startBranchCtrl.js'+'?vs=20171020';

var guideEndTempleteCss = resourceResPath + '/resources/front/css/liangbiao/guideEndTemplete.'+ minV +'css';
var guideEndTempleteCtrl = resourceResPath + '/resources/front/js/liangbiao/guideEndTempleteCtrl.'+ minV +'js'+'?vs=20171020';
//var guideEndTempleteCtrl = '../../../resources/front/js/liangbiao/guideEndTempleteCtrl.js';


app.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/attention', {
				templateUrl : 'attention.html',
				controller  : 'attentionController',
				css: attentionCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load(attentionCtrl);
					}]
				}
			}) //注意力测评[9]
			.when('/yitaiMode', {
				templateUrl : 'yitaiMode.html',
				controller  : 'yitaiModeController',
				css: yitaiModeCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load([yitaiModeCtrl, yitaiModeJs,audioPlay,timeSelectModeCtrl,muteModeCtrl,viewRememberCtrl]);
					}]
				}
			}) //译泰模板单选、多选 [1、2]
			.when('/fillMode', {
				templateUrl : 'fillMode.html',
				controller  : 'fillModeController',
				css: fillModeCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load(fillModeCtrl);
					}]
				}
			}) //填空模板 [3]
			.when('/listenCiYu', {
				templateUrl : 'listenCiYu.html',
				controller  : 'listenCiYuController',
				css: listenCiYuCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load(listenCiYuCtrl);
					}]
				}
			})//听词语 [6]
			.when('/listenDigit', {
				templateUrl : 'listenDigit.html',
				controller  : 'listenDigitController',
				css: listenDigitCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load([digitComm, listenDigitCtrl]);
					}]
				}
			})//听数字 [7]
			.when('/trueFalse', {
				templateUrl : 'trueFalse.html',
				controller  : 'trueFalseController'
			})//判断题 [10]
			.when('/viewRemember', {
				templateUrl : 'viewRemember.html',
				controller  : 'viewRememberController',
				css: viewRememberCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load([viewRememberCtrl, viewRememberJs,audioPlay]);
					}]
				}
			}) //视觉记忆能力测评[11]
			.when('/lookDigit', {
				templateUrl : 'lookDigit.html',
				controller  : 'lookDigitController',
				css: lookDigitCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load([digitComm, lookDigitCtrl]);
					}]
				}
			}) //看数字[8]
			.when('/lookCiYu', {
				templateUrl : 'lookCiYu.html',
				controller  : 'lookCiYuController',
				css: lookCiYuCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load(lookCiYuCtrl);
					}]
				}
			}) //看词语[5]
			.when('/guideTemplete', {
				templateUrl : 'guideTemplete.html',
				controller  : 'guideTempleteController',
				css: guideTempleteCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load(guideTempleteCtrl);
					}]
				}
			}) //词语在认听[12]
			.when('/listenWordZR', {
				templateUrl : 'listenWordZR.html',
				controller  : 'listenWordZRController',
				css: listenWordZRCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load([listenWordZRCtrl, audioPlay]);
					}]
				}
			}) //词语在认看[13]
			.when('/lookWordZR', {
				templateUrl : 'lookWordZR.html',
				controller  : 'lookWordZRController',
				css: lookWordZRCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load([lookWordZRCtrl, audioPlay]);
					}]
				}
			}) //划消图[14]
			.when('/markPattern', {
				templateUrl : 'markPattern.html',
				controller  : 'markPatternController',
				css: markPatternCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load([markPatternCtrl, audioPlay]);
					}]
				}
			}) //复选框[15]
			.when('/muteMode', {
				templateUrl : 'muteMode.html',
				controller  : 'muteModeController',
				css: muteModeCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load(muteModeCtrl);
					}]
				}
			}) //时间选择[16]
			.when('/timeSelectMode', {
				templateUrl : 'timeSelectMode.html',
				controller  : 'timeSelectModeController',
				css: timeSelectModeCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load(timeSelectModeCtrl);
					}]
				}
			}) //量表引导语
			.when('/startBranch', {
				templateUrl : 'startBranch.html',
				controller  : 'startBranchController',
				css: startBranchCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load(startBranchCtrl);
					}]
				}
			}) //启动倒计时
			.when('/guideEndTemplete', {
				templateUrl : 'guideEndTemplete.html',
				controller  : 'guideEndTempleteController',
				css: guideEndTempleteCss,
				resolve:{
					deps:["$ocLazyLoad",function($ocLazyLoad){
						return $ocLazyLoad.load(guideEndTempleteCtrl);
					}]
				}
			}) //量表结束语
		/*	.otherwise({
				redirectTo: '/startBranch'
			})*/;
	}
]);

var errorProfitDom = {
	G401: '',
	G400: '',
	G000: '',
	G404: '',
	G111: '',
	S401: '',
	S400: '',
	S000: '',
	S201: '',
	S202: '',
	S404: '',
	S001: '',
	S111: '',
	S101: '',
	S102: '',
	S405: '',
	S103: '',
	A000: '',
	A999: '',
	B000: '',
	B999: ''
};


function convertCaseType(caseType){
	/*
	 1、2  单选、多选 模板-yitaiMode；
	 3 填空题；fillMode //3月21日新增 anku
	 4 主观题；
	 5 看词语-lookCiYu
	 6 听词语-listenCiYu
	 7 听数字-listenDigit
	 8 看数字-lookDigit
	 9 注意力-attention
	 10 检查能力-trueFalse
	 11 组合题【阅读理解等】-viewRemember
	 12 听觉在认-listenWordZR
	 13 视觉在认-lookWordZR
	 14 划消图-markPattern
	 15 复选框-muteMode
	 16 时间选择-timeSelectMode
	 */
	var caseTypeArray = ['','yitaiMode','yitaiMode','fillMode','','lookCiYu','listenCiYu','listenDigit','lookDigit','attention','trueFalse','viewRemember','listenWordZR','lookWordZR','markPattern','muteMode','timeSelectMode'];
	if(caseType == null || caseType == ''){
		alert("暂无模板：caseType"+caseType);
		return caseTypeArray[0];
	}else{
		return caseTypeArray[caseType];
	}
}

//自定义数组删除方法
Array.prototype.indexZDYOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};

Array.prototype.removeZDY = function(val) {
	var index = this.indexZDYOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};

//创建圆盘进度条区域
var draw = function(id, params){
	params = params || {
			jdfAll: 10,
			jdf: 0,
			whiteR: 44,
			outerR: 77
		};
	var myCanvas = document.getElementById(id);
	var drawIndexArr = [], xR = myCanvas.width/2, yR = myCanvas.height/2;
	var myCtx = myCanvas.getContext('2d');
	//定义基础颜色
	var colorArr = [];
	for(var ypI = 1;ypI <= params.jdfAll; ypI++){
		if(ypI <= params.jdf){
			colorArr[ypI-1] = '#0da4d5';
		}else{
			colorArr[ypI-1] = '#e7e7e7';
		}
		drawIndexArr[ypI-1] = ypI;
	}
	//把坐标轴移动到（250,250）这个点上
	myCtx.translate(xR,yR);
	drawSector(myCtx, colorArr, params,drawIndexArr);
	//画白色区域
	myCtx.save();
	myCtx.fillStyle = "#fff"; //内圈颜色值
	myCtx.beginPath();
	myCtx.arc(0,0,params.whiteR,0,2*Math.PI);
	myCtx.fill();
	myCtx.restore();
};
var drawSector = function(myCtx, colorArr, params,text) {
	myCtx.save();
	myCtx.strokeStyle = '#fff';
	//起始点逆时针旋转90度
	myCtx.rotate(-90*Math.PI/180);
	myCtx.save();
	for(i = 1; i <= params.jdfAll; i++){
		myCtx.fillStyle = colorArr[i-1];
		myCtx.beginPath();
		myCtx.moveTo(0,0);
		myCtx.lineTo(params.outerR, 0);
		myCtx.arc(0,0,params.outerR,0,2*Math.PI/params.jdfAll);
		myCtx.fill();
		myCtx.stroke();
		if(text){
			//旋转.angle指旋转的角度，顺时针旋转。
			myCtx.rotate(Math.PI/params.jdfAll);
			myCtx.save();
			myCtx.fillStyle = "#e7e7e7";
			myCtx.restore();
			myCtx.rotate(Math.PI/params.jdfAll);
		}
		else{
			myCtx.rotate(2*Math.PI/params.jdfAll);
		}
	}
	myCtx.restore();
};

//判断最后一题是提交，还是下一题
var changeSubmitBtnText = function(scopeObj, targetObj, type){
		//如果是最后一题，按钮文字“提交”
	  //如果不是最后一题，按钮文字“下一题”
	  var globalCSBT = findStorageByStorageKey("globalRecord");
	  if(globalCSBT.caseCountIndex == globalCSBT.caseCount){
		  targetObj.text('提交');
	  }else{
		  targetObj.text('下一题');
	  }
};

function getElementTop(element){
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while (current !== null){
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}

function getElementLeft(element){
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
	while (current !== null){
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}

function ytOSelPathCss(scopeObj, isMulti, optionsType){
	var divTSStr = 'divWidth80';
	if(scopeObj.selPattern >= 23 && scopeObj.selPattern <= 43){
		//外围.main_answer 占100%；内层#main_answerULID 都添加对应选项
		$('.main_answer').width("100%");
		$('#main_answerULID').addClass('o_'+scopeObj.selPattern);
		//独立样式拼接
		if(scopeObj.selPattern == 25 || scopeObj.selPattern == 26){
			divTSStr = 'divWidth0_40'; //高度40px；line-height: 40px;
		}
		else if(scopeObj.selPattern == 28){
			//多行文本
			divTSStr = '';
		}
		else if(scopeObj.selPattern == 37){
			divTSStr = 'zdyCss_O37';
		}
	}
	return divTSStr;
}

/*
 * @function oSelPatternHCtrl
 * @param answerUIId 选项列表 #ID
 * @param oSelPattern 选项模板值
 * */
function oSelPatternHCtrl(answerUIId,oSelPattern){
	var answerUIIDH = $(answerUIId).height();
	// 模板13（4*1） 高度4等分
	var targetH = answerUIIDH;
	if(oSelPattern == 1){//1*5
		targetH = answerUIIDH;
	}else if(oSelPattern == 2){//1*7
		targetH = answerUIIDH;
	}else if(oSelPattern == 3){//1*4
		targetH = answerUIIDH;
	}else if(oSelPattern == 4){//2*3
		targetH = (answerUIIDH*1/2);
	}else if(oSelPattern == 5){//2*4
		targetH = (answerUIIDH*1/2);
	}else if(oSelPattern == 6 || oSelPattern == 66){//2*6
		targetH = (answerUIIDH*1/2);
	}else if(oSelPattern == 7){//3*6
		targetH = (answerUIIDH*1/3);
	}else if(oSelPattern == 8){//4*6
		targetH = (answerUIIDH*1/4);
	}else if(oSelPattern == 9){//2*2
		targetH = (answerUIIDH*1/2);
	}else if(oSelPattern == 10){//2*2下居中
		targetH = (answerUIIDH*1/2);
	}else if(oSelPattern == 11){//1*3
		targetH = answerUIIDH;
	}else if(oSelPattern == 12){//1*6
		targetH = answerUIIDH;
	}else if(oSelPattern == 13){//4*1
		targetH = (answerUIIDH*1/4);
	}else if(oSelPattern == 14){//填空*1
		targetH = answerUIIDH;
	}else if(oSelPattern == 15){//1*2
		targetH = answerUIIDH;
	}else if(oSelPattern == 16){//3*2
		targetH = (answerUIIDH*1/3);
	}else if(oSelPattern == 17){//3*1
		targetH = (answerUIIDH*1/3);
	}else if(oSelPattern == 18){//1*9
		targetH = (answerUIIDH*1/1);
	}else if(oSelPattern == 19){//2*1
		targetH = (answerUIIDH*1/2);
	}
	return targetH;
}
var showVisibleObj = function(targetCssOrId){
	if(!$(targetCssOrId).is(':visible')){//不可见的
		$(targetCssOrId).show();
	}
};

var hideVisibleObj = function(targetCssOrId){
	if($(targetCssOrId).is(':visible')){//可见的
		$(targetCssOrId).hide();
	}
};
var displayRight = function(){
    if($(".leftProgress").hide()) {
        $(".model").css("width", "100%");
    }
};
displayRight();
var displayFull = function(){
    if($(".leftProgress").show()) {
        $(".model").css("width", "804px");
    }
};
var formatTimer = function(param){
	if(param <= 9)
		return '0' + param;
	else
		return param;
};

var clearOverallAnsTimer = function(){
	try{
		if(overallAnsTimer != null){
			clearTimeout(overallAnsTimer);
		}
	}catch(Exception){}
};


var toCaseTypeHtml = function(liPaperCseObj){
	if (liPaperCseObj == null ||  liPaperCseObj == '') {
	}
	else {
		//if (navigator.onLine == false){
		//	showTwoBtnOverlay("检测到当前网络已断开，请您检查网络后重试","C005",'refresh',function(){
		//		if (navigator.onLine != false) {
					$('#httpErrorBg,#httpErrorConfirm').hide();
					location.href = '#/' + convertCaseType(liPaperCseObj.type);
		//		}
		//	},function(){
		//		$('#httpErrorBg,#httpErrorConfirm').hide();
		//	});
		//}
		//else{
		//	location.href = '#/' + convertCaseType(liPaperCseObj.type);
		//}
	}
};

var isToGuideHtml = function (globalRecord) {
	var flag = true;
	if (globalRecord.guide != null && globalRecord.guide != '') {

	} else if (globalRecord.guideAnnexA != null && globalRecord.guideAnnexA != '') {

	} else if (globalRecord.guideAnnexB != null && globalRecord.guideAnnexB != '') {

	} else {
		flag = false;
	}
	return flag;
};

var setFocusIndex = function(el, index, scopeObj){
	scopeObj.focusTargeIndex = index;
};

var clickFocusByInput = function(el, index, scopeObj){
	scopeObj.focusIndex = scopeObj.focusIndex + 1;
	scopeObj.inputFocusIndex = index;
};

var keyUpAndAutoNext = function(event, el, nextIndex, scopeObj){
	//注意力、听数字、看数字通用
	var elStemp = event || window.event;
	var tempVal = $(el).val();
	if(tempVal != null && tempVal != '' && isNaN(tempVal) == false){
		tempVal =  parseInt(tempVal);
		$(el).val(tempVal);
		scopeObj.tempValue = tempVal;
	}else if(tempVal != null && tempVal != '' && isNaN(tempVal) == true){
		var lastTempVal = scopeObj.tempValue;
		$(el).val(lastTempVal == null ? '' : lastTempVal);
	}else{
		tempVal = tempVal.replace(/[^\u4e00-\u9fa5\w]/g,'');
		$('#input' + (nextIndex-1)).val(tempVal);
		return;
	}
	if (scopeObj.maxLength == 0) {
		return;
	}
	var str = elStemp.keyCode;
	if ((str >= 48 && str <= 57) || (str >= 96 && str <= 105)) {
		if ($(el).val().length == scopeObj.maxLength) {
			var tempArray = $('.inputList');
			for(var tempI = nextIndex-1; tempI< tempArray.length; tempI++){
				if(tempArray.eq(tempI).val() == ''){
					$('.inputList').eq(tempI).focus();
					break;
				}else{}
			}
		}
	}else{
		$('.inputList').eq(scopeObj.focusTargeIndex).focus().val($(el).val());
	}
};

var jumpPageDigit = function(el, thisIndex, scopeObj) {
	if (el.keyCode==37)//左
		func_Left(el, thisIndex, scopeObj);
	if (el.keyCode==39)//右
		func_RightDigit(el, thisIndex, scopeObj);
};

var func_Left = function(el, thisIndex, scopeObj){
	if(thisIndex == 0){//第一个，不做任何处理
	}else{
		$('#input' + (thisIndex-1)).focus();
		scopeObj.tempValue = $('#input' + (thisIndex-1)).val();
	}
	return;
};

var func_RightDigit = function(el, thisIndex, scopeObj){
	if(thisIndex == scopeObj.groupArray.length - 1){//最后一个，不做任何处理
	}else{
		$('#input' + (thisIndex+1)).focus();
		scopeObj.tempValue = $('#input' + (thisIndex+1)).val();
	}
	return;
};

//随机产生0到多少数字
var RndNum = function (max) {
	return Math.round(Math.random() * max);
};

var chaiFenSelPattrenCss = function(optionsLength){
	var tempOSelPattern = 0;
	if(optionsLength == 5 || optionsLength == 8){//2*4 --o_5
		tempOSelPattern = 5;
	}else if(optionsLength == 7 || optionsLength == 12){//2*6 --o_6
		tempOSelPattern = 66;
	}else if(optionsLength == 9 || optionsLength == 16){//4*4 更改为 3*6 --o_7
		tempOSelPattern = 66;
	}else if(optionsLength == 11 || optionsLength == 20){//4*5 --o_8
		tempOSelPattern = 66;
	}else if(optionsLength == 13 || optionsLength == 24){//4*6 --o_8
		tempOSelPattern = 66;
	}else{
		tempOSelPattern = 0;
	}
	return tempOSelPattern;
};

var chaiFenSelPattren = function(optionsLength){
	var tempOSelPattern = 0;
	if(optionsLength == 5 || optionsLength == 8){//2*4 --o_5
		tempOSelPattern = 5;
	}else if(optionsLength == 7 || optionsLength == 12){//2*6 --o_6
		tempOSelPattern = 6;
	}else if(optionsLength == 9 || optionsLength == 16){//4*4 更改为 3*6 --o_7
		tempOSelPattern = 7;
	}else if(optionsLength == 11 || optionsLength == 20){//4*5 --o_8
		tempOSelPattern = 8;
	}else if(optionsLength == 13 || optionsLength == 24){//4*6 --o_8
		tempOSelPattern = 8;
	}else{
		tempOSelPattern = 0;
	}
	return tempOSelPattern;
};

var resetPanelCiYu = function () {
	//先前选取图片-重置
	$('.main_answer_border_flag').addClass('main_answer_border_flag_hide');
	$('.main_answer_border').attr('class', 'main_answer_border main_answer_borderNomarl').attr('status', 'false').show();
};

var selectedImg = function (item, _targetIndex, selectedArrayAnswer, wAnswer, isClick, scopeObj) {
	if (isClick) {
		var selectedObj = $("#selectedID" + _targetIndex);
		if (selectedObj.attr("status") == "false") {//选中
			if (selectedObj.hasClass("main_answer_borderNomarl")) {
				selectedObj.removeClass("main_answer_borderNomarl");
				selectedObj.addClass("main_answer_borderSelect")
			}
			if (selectedObj.next().hasClass("main_answer_border_flag_hide")) {
				selectedObj.next().removeClass("main_answer_border_flag_hide");
				selectedObj.next().addClass("main_answer_border_flag");
			}
			selectedObj.attr("status", "true");
			if(!isExist(selectedArrayAnswer,item)){
				selectedArrayAnswer.push(item);
				wAnswer.push(item.id);
				$('.tiShiClass').removeClass('inlineBlock');
				$('.tiShiClass>p').text("");
			}else{
				return;
			}
		} else {
			if (selectedObj.hasClass("main_answer_borderSelect")) {
				selectedObj.removeClass("main_answer_borderSelect");
				selectedObj.addClass("main_answer_borderNomarl")
			}
			if (selectedObj.next().hasClass("main_answer_border_flag")) {
				selectedObj.next().removeClass("main_answer_border_flag");
				selectedObj.next().addClass("main_answer_border_flag_hide");
			}
			selectedObj.attr("status", "false");
			if(isExist(selectedArrayAnswer,item)){
				selectedArrayAnswer.removeZDY(item);
				wAnswer.removeZDY(item.id);
			}else{
				return;
			}
		}
	}
};

var iconSelectedCiYu = function (item, targetIndex, selectedArrayAnswer, wAnswer, isClick, scopeObj) {
	if (isClick) {
		var selectedObj = $("#selectedIconID" + targetIndex);
		if (selectedObj.hasClass('main_answer_border_flag_hide')) {//选中
			selectedObj.removeClass('main_answer_border_flag_hide');
			selectedObj.prev().attr('status', 'true');
			selectedObj.prev().removeClass('main_answer_borderNomarl');
			selectedObj.prev().addClass('main_answer_borderSelect');
			if(!isExist(selectedArrayAnswer,item)){
				selectedArrayAnswer.push(item);
				wAnswer.push(item.id);
				$('.tiShiClass').removeClass('inlineBlock');
				$('.tiShiClass>p').text("");
			}else{
				return;
			}
		} else {
			selectedObj.addClass('main_answer_border_flag_hide');
			selectedObj.prev().attr('status', 'false');
			selectedObj.prev().removeClass('main_answer_borderSelect');
			selectedObj.prev().addClass('main_answer_borderNomarl');
			if(isExist(selectedArrayAnswer,item)){
				selectedArrayAnswer.removeZDY(item);
				wAnswer.removeZDY(item.id);
			}else{
				return;
			}
		}
	}
};

//判断数组中某一项是否存在[有-true;没有-false]
var isExist = function (arrayGroupNum, temp) {
	for (var i = 0; i < arrayGroupNum.length; i++) {
		if (arrayGroupNum[i] == temp) {
			return true;
		}
	}
	return false;
};

function checkUserInfoDiff(rootScopeObj){
	var thisUserPO = findStorageByStorageKey('userPO');
	var lastUserPO = rootScopeObj.userPO;
	var loginName = thisUserPO.loginName || '';
	var loginLastName = lastUserPO.loginName || '';
	if(loginName == '' || loginLastName == '' || loginName != loginLastName){
		//showOneOverlay('账号信息未一致或已失效，请关闭其它标签页并重新登录！','C001', function(){
		showOneOverlay((thisUserPO.name || '')+'('+ (thisUserPO.loginName || '')+')已登录，与'+(lastUserPO.name || '')+'('+(lastUserPO.loginName || '')+')不符！请检查。','C001', function(){
			hideOneOverlay();
			//回到登录页面
			// location.href = window.sessionStorage.getItem('thisHref');
		});
		return false;
	}
}

function checkAnserOrCaseCount(scopeObj, rootScopeObj, modeType){
	//点击下一题，未存储答案时，数据存储判断功能
	var thisAnserList = findStorageByStorageKey("examAnswerList");
	var globalRecordObj = findStorageByStorageKey("globalRecord");
  var isBHSampleObj = findStorageByStorageKey("lisBranchs" + globalRecordObj.lisBranchsIndex + "_liPaperCases0");
	var thisCaseId = scopeObj.caseCountIndex;
	var thisAllCaseCount = scopeObj.caseCount;
	//1、注意力题-选项存储个数跟后台传递的结果有关，因而暂时不验证；
	if(modeType == 'attention' || modeType == 'listenDigit' || modeType == 'lookDigit'){
		return true;
	}
	//2、yitaiMode情况下，会出现存在例题情况，并且当前 第n题答题无内容
	if(thisCaseId == null && isBHSampleObj.isSample == 1){
		return true;
	}
	//3、当前为第1题，并且 存储答案时，还是空白的 answerCount为0 [不包含例题情况]
	else if(thisAnserList != null && thisAnserList[0] != null && thisAnserList[0].answerCount == 0 && thisCaseId == 1){
		return true;
	}
	//4、当前第n题非第一题时，存储答案未进行过存储，第n题 不等于 总题数 （有可能数据已经提交-导致存储内容被清空）
	else if(thisAnserList != null && thisAnserList[0] != null && thisAnserList[0].answerCount == 0 && thisCaseId != thisAllCaseCount){
		showOneOverlay('数据校验异常，该量表数据已提交，请关闭当前窗口！','C002', function(){
			hideOneOverlay();
		});
	}
	//5、不存在例题情况， 第n题 与 总题数相等， 并且 第n题 与 存储答案的个数相等，表示该量表已答完 （若是断网的时候没有跳转地址，此时点击下一题，此判断会触发）
	else if( (thisCaseId == thisAllCaseCount) && (thisCaseId == thisAnserList.length) && isBHSampleObj.isSample != 1){
		showOneOverlay('数据校验异常，请检查网络或该量表已提交！','C003', function(){
			hideOneOverlay();
			window.location.reload();
		});
		return false;
	}
	/*//6、第n题 小于 存储答案个数；或  第n题 不等于 存储答案个数 并且 第n题 不等于答案个数+1 ，表示答题数已不一致了。
	else if(thisCaseId < thisAnserList.length || (thisCaseId != thisAnserList.length && thisCaseId != thisAnserList.length+1) ){
		showOneOverlay('该套量表正在答题，请勿重复答题，关闭当前窗口！','C004', function(){
			hideOneOverlay();
		});
		return false;
	}
	//7、当前tab页呈现为第2题，但是另一tab页呈现为第3题，存储答案相等
	else if(scopeObj.caseCountIndex < globalRecordObj.caseCountIndex){
		showOneOverlay('该套量表正在答题，请勿重复答题，关闭当前窗口！','C007', function(){
			hideOneOverlay();
		});
		return false;
	}*/
	else{
		return true;
	}
}

function showOneOverlay(showText, showCode, closeThisBtnFunc){
	$('#httpErrorAlterText').text(showText);
	$('#btnAlterOverlay').html('<input id="closeThisBtn" class="reTry alterBtn" type="button" value="确定">');
	//判断是否有异常编码，有则展示
	$('#httpAlertErrorCode').text(showCode);
	$('#alterErrorCode_div').removeClass('hideCss');

	$('#httpErrorBg,#httpErrorAlert').show();
	$('#closeThisBtn').click(closeThisBtnFunc);
}

function showTwoBtnOverlay(showText, showCode, btnType, okFunc, noFunc){
	$('#httpErrorText').text(showText);
	var _okBtnText = '确定', _noBtnText = '取消';
	if(btnType == 'refresh'){
		_okBtnText = '重试';
		_noBtnText = '取消';
	}
	$('#httpConfirmErrorCode').text(showCode);
	$('#confirmErrorCode_div').removeClass('hideCss');
	$('#btnOverlay').html('<input id="saveAndQuitBtnOk" class="reTry" type="button" value="'+_okBtnText+'"><input id="saveAndQuitBtnNo" class="giveUp" type="button" value="'+_noBtnText+'">');
	$('#httpErrorBg,#httpErrorConfirm').show();

	$('#saveAndQuitBtnOk').click(okFunc);
	$('#saveAndQuitBtnNo').click(noFunc);
}

function hideOneOverlay(){
	$('#httpErrorBg,#httpErrorAlert').hide();
	$('#httpAlertErrorCode').text('');
	$('#alterErrorCode_div').addClass('hideCss');
	$('#closeThisBtn').unbind('click');
}


var arrayCompare = function (selectedArrayAnswer, groupOneArrayAnswer) {
	//比较2个数组是否相等 ,false表示不相等，true表示相等
	var isEqu = true;
	if (selectedArrayAnswer.length != groupOneArrayAnswer.length) {
		isEqu = false;
		return isEqu;
	}
	for (var i = 0; i < selectedArrayAnswer.length; i++) {
		isEqu = isExist(groupOneArrayAnswer, selectedArrayAnswer[i]);
		if (isEqu == false) {
			return isEqu;
		}
	}
	return isEqu;
};

//======================================================================================================================
var checkExamCount = 0, questionErrorCount = 0;//数据校验重复请求次数
var checkExamStoreByError = function(){//数据校验失败
	checkExamCount++;
	console.log('routConfig.js中checkExamCount='+checkExamCount);
	if(checkExamCount <= 2){
//		console.log('答题记录错误，跳转至启动页面~~~~~~');
		$('#httpErrorAlterText').text('答题记录存储失败，请重做此套量表！');
		$('#btnAlterOverlay').html('<input id="closeThisBtn" class="reTry alterBtn" type="button" value="确定">');
		//判断是否有异常编码，有则展示
		$('#httpAlertErrorCode').text('B00'+checkExamCount);
		$('#alterErrorCode_div').removeClass('hideCss');
		
		$('#httpErrorBg,#httpErrorAlert').show();
		$('#closeThisBtn').click(function(){
			clearSomeStorage();
			$('#httpErrorBg,#httpErrorAlert').hide();
			$('#httpAlertErrorCode').text('');
			$('#alterErrorCode_div').addClass('hideCss');
			
			$('#closeThisBtn').unbind('click');
			questionErrorCount = 0;
			//第四步： 跳转至启动页面
			window.location.href = '#/startBranch';
		});
	}else{
		//第五步：若超过2次处理数据失败，直接跳转至个人登录页面
		console.log('答题记录错误，超过2次，跳转至个人中心页面~~~~~~');
		$('#httpErrorAlterText').text('数据多次存储失败，请重新进入测评！');
		$('#btnAlterOverlay').html('<input id="closeThisBtn" class="reTry alterBtn" type="button" value="确定">');
		//判断是否有异常编码，有则展示
		$('#httpAlertErrorCode').text('B00'+checkExamCount);
		$('#alterErrorCode_div').removeClass('hideCss');
		
		$('#httpErrorBg,#httpErrorAlert').show();
		$('#closeThisBtn').click(function(){
			$('#httpErrorBg,#httpErrorAlert').hide();
			$('#httpAlertErrorCode').text('');
			$('#alterErrorCode_div').addClass('hideCss');
			
			$('#closeThisBtn').unbind('click');
			clearOverallAnsTimer();
			//跳转之前，量表归0
			var userPO = findStorageByStorageKey('userPO');
			removeAllStorage();
			saveStorage('userPO',userPO);
			location.href = getRootPath()+'/pages/front/myCenter/person.html#/evaluation-query?ts='+new Date().getTime();
		});
	}
};

var clearSomeStorage = function(){
	//第一步： 取之前已经存好的数据
	var conclusion = findStorageByStorageKey("conclusion");
	var conclusionAudioUrl = findStorageByStorageKey("conclusionAudioUrl");
	var evaluationInfo = findStorageByStorageKey("evaluationInfo");
	var examAnswerList = findStorageByStorageKey("examAnswerList");
	var giudeAudioUrl = findStorageByStorageKey("giudeAudioUrl");
	var guide = findStorageByStorageKey("guide");
	var isExistsBySysNews = findStorageByStorageKey("isExistsBySysNews");
	var liangbiaoObj = findStorageByStorageKey("liangbiaoObj");
	var userPO = findStorageByStorageKey("userPO");
	//第二步： 清除所有缓存
	removeAllStorage();
	//第三步： 重新存储之前存好的数据
	saveStorage("conclusion", conclusion);
	saveStorage("conclusionAudioUrl", conclusionAudioUrl);
	saveStorage("evaluationInfo", evaluationInfo);
	saveStorage('examAnswerList', [{answerCount:0}]);
	saveStorage("giudeAudioUrl", giudeAudioUrl);
	saveStorage("guide", guide);
	saveStorage("isExistsBySysNews", isExistsBySysNews);
	saveStorage("liangbiaoObj", liangbiaoObj);
	saveStorage("userPO", userPO);
};

var checkDigitStore = function (){
	var tempCheckFlag = false;
	var examAnswerList = findStorageByStorageKey("examAnswerList");
	for(var i = 0; i<examAnswerList.length-1; i++){
		var tempASObj = examAnswerList[i];
		var tempASObjNext = examAnswerList[i+1];
		if(tempASObj == null || tempASObj == "" || tempASObjNext == null || tempASObjNext == ""){
			tempCheckFlag = false;
			break;
		}
		var tempASObj_wAnswer = tempASObj.wAnswer.split(',');
		var tempASObjNext_wAnswer = tempASObjNext.wAnswer.split(',');
		if(tempASObjNext_wAnswer.length >= tempASObj_wAnswer.length+1){
			tempCheckFlag = true;
		}else if(tempASObjNext.subIndex == tempASObj.subIndex+1 && tempASObjNext_wAnswer.length == tempASObj_wAnswer.length){
			tempCheckFlag = true;
		}else{//只要碰到一个不对的，跳出当前循环
			tempCheckFlag = false;
			break;
		}
	}
	return tempCheckFlag;
};

var tempCheckType = "";
var  checkNextNode = function () {
	//判断下一步是什么类型题
	var globalRecord = findStorageByStorageKey("globalRecord");
	var yitaiEduModeData = findStorageByStorageKey("yitaiEduModeData");
	var lisBranchsIndex = globalRecord.lisBranchsIndex;
	var lisBranchsNum = globalRecord.lisBranchsNum;
	var liPaperCasesIndex = globalRecord.liPaperCasesIndex;
	if(yitaiEduModeData.paper == null){
		$('#httpErrorAlterText').text('存储失败，此套量表数据可能已经提交，请检查！');
		$('#btnAlterOverlay').html('<input id="closeThisBtn" class="reTry alterBtn" type="button" value="确定">');
		$('#httpErrorBg,#httpErrorAlert').show();
		$('#closeThisBtn').click(function(){
			$('#httpErrorBg,#httpErrorAlert').hide();
			$('#closeThisBtn').unbind('click');
			//清除数据，重新答题
			clearOverallAnsTimer();
			location.href = getRootPath()+'/pages/front/myCenter/person.html#/evaluation-query';
		});
		return;
	}
	var liPaperCasesNum = yitaiEduModeData.paper.lisBranchs[lisBranchsIndex].liPaperCases.length;//当前该题数量
	if(liPaperCasesNum>liPaperCasesIndex){//表示进入下一题
		globalRecord.liPaperCasesIndex=liPaperCasesIndex;
	}else if(liPaperCasesNum == liPaperCasesIndex){//表示该题已经答完
		//停止计时
		window.document.dispatchEvent(new Event('stopEvent'));

		lisBranchsIndex++;//外层
		liPaperCasesIndex = 0;
		globalRecord.lisBranchsIndex=lisBranchsIndex;
		globalRecord.liPaperCasesIndex=liPaperCasesIndex;
		if(yitaiEduModeData.paper.lisBranchs.length==lisBranchsIndex){//表示结束了
			if((tempCheckType == 'listenDigit' || tempCheckType == 'lookDigit') && checkDigitStore() == false){//数字题型，数据异常
				checkExamStoreByError();
				tempCheckType = "";
				return;
			}else{
				tempCheckType = "";
			}
			location.href = '#/guideEndTemplete';
			return;
		}
		liPaperCasesNum = yitaiEduModeData.paper.lisBranchs[lisBranchsIndex].liPaperCases.length;//当前该题数量
		globalRecord.liPaperCasesNum = liPaperCasesNum;
	}else{//liPaperCasesNum<liPaperCasesIndex 下一答题数 大于存的总数，数据有异常了。
		$('#httpErrorAlterText').text('数据存储异常，回到个人测评重新答题！');
		$('#btnAlterOverlay').html('<input id="closeThisBtn" class="reTry alterBtn" type="button" value="确定">');
		$('#httpErrorBg,#httpErrorAlert').show();
		$('#closeThisBtn').click(function(){
			$('#httpErrorBg,#httpErrorAlert').hide();
			$('#closeThisBtn').unbind('click');
			//清除数据，重新答题
			clearOverallAnsTimer();
			//跳转之前，量表归0
			var userPO = findStorageByStorageKey('userPO');
			removeAllStorage();
			saveStorage('userPO', userPO);
			location.href = getRootPath()+'/pages/front/myCenter/person.html#/evaluation-query';
		});
		return;
	}
	saveStorage("globalRecord",globalRecord);
	//答题内容显示
	var key =  "lisBranchs"+globalRecord.lisBranchsIndex+"_liPaperCases"+globalRecord.liPaperCasesIndex;
	currentStoreData = findStorageByStorageKey(key);
	//选择模板
	if (currentStoreData != null && currentStoreData != '') {
		var caseType = currentStoreData.type;
		location.href = '#/' + convertCaseType(caseType)+"?t="+ new Date().getTime();
	} else {
		location.href = '#/startBranch';
	}
};

function requestFullScreen() {
	var element = document.getElementById("content");
	var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
	if (requestMethod) {
		requestMethod.call(element);
	} else if (typeof window.ActiveXObject !== "undefined") {
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript !== null) {
			wscript.SendKeys("{F11}");
		}
	}
	$("#content").width(window.screen.width);
	$("#content").height(window.screen.height);
	$("#content").css('background',"#e7e7e7");
}
//退出全屏
var exitFullscreen=function(){
	var elem=document;
	if(elem.webkitCancelFullScreen){
		elem.webkitCancelFullScreen();
	}else if(elem.mozCancelFullScreen){
		elem.mozCancelFullScreen();
	}else if(elem.cancelFullScreen){
		elem.cancelFullScreen();
	}else if(elem.exitFullscreen){
		elem.exitFullscreen();
	}else{
		//不支持
	}
};

function setCss(curEle, attr, value) {//模板设置
	// var reg = /^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Right|Bottom)?))$/;
	if (attr === "float") {
		curEle["style"]["cssFloat"] = value;
		curEle["style"]["styleFloat"] = value;
	}else {
		curEle["style"][attr] = value;
	}
}

function model(pattern){
	// var winW = document.documentElement.clientWidth || document.body.clientWidth,
	var winH = 736;
	var guide = document.getElementById("guideID"); //引导语区域
	var btn = document.getElementById("main_BtnID"); //题目操作区域
	if (pattern == 1) {
		var title = document.getElementsByClassName("main_title")[0]; //题目内容区域
		var main_answer = document.getElementById("main_answerULID"); //题目选项区域
		var main_content = document.getElementById("main_content"); //题目素材区域
		var titleH = winH * 0.06 + "px";
		var guideH = winH * 0.06 + "px";
		var btnH = winH * 0.09 + "px";
		var main_contentH = winH * 0.32 + "px";
		var main_answerH = winH * 0.27 + "px";
		setCss(guide, "height", guideH);
		setCss(guide, "line-height", guideH);
		setCss(btn, "height", btnH);
		setCss(btn, "line-height", btnH);
		setCss(title, "height", titleH);
		setCss(main_content, "height", main_contentH);
		setCss(main_content, "line-height", main_contentH);
		setCss(main_answer, "height", main_answerH);
	}
	else if (pattern == 2) {
		//  var title = document.getElementsByClassName("main_title")[0];
		var main_answer = document.getElementById("main_answerULID");
		// var oLis = main_answer.getElementsByTagName("li");
		var main_content = document.getElementById("main_content");

		var guideH = winH * 0.06 + "px";
		var btnH = winH * 0.09 + "px";
		var main_contentH = winH * 0.21 + "px";
		var main_answerH = winH * 0.44 + "px";
		setCss(guide, "height", guideH);
		setCss(guide, "line-height", guideH);
		setCss(btn, "height", btnH);
		setCss(btn, "line-height", btnH);
		setCss(main_content, "height", main_contentH);
		setCss(main_content, "line-height", main_contentH);
		setCss(main_answer, "height", main_answerH);
	}
	else if (pattern === 3) {
		var title = document.getElementsByClassName("main_title")[0];
		var main_answer = document.getElementById("main_answerULID");
		var main_content = document.getElementById("main_content");
		//var oLis = main_answer.getElementsByTagName("li");
		//var liLength = main_answer.dataType;

		var titleH = winH * 0.04 + "px";
		var guideH = winH * 0.08 + "px";
		var btnH = winH * 0.06 + "px";
		var main_answerH = winH * 0.74 + "px";
		setCss(guide, "height", guideH);
		setCss(guide, "line-height", guideH);
		setCss(btn, "height", btnH);
		setCss(btn, "line-height", btnH);
		setCss(title, "height", titleH);
		setCss(main_answer, "height", main_answerH);
	}
	else if (pattern == 4) {
		// var title = document.getElementsByClassName("main_title")[0];
		var main_answer = document.getElementById("main_answerULID");
		//var oLis = main_answer.getElementsByTagName("li");

		//var titleH = winH * 0.25 + "px";
		var guideH = winH * 0.06 + "px";
		var btnH = winH * 0.09 + "px";
		var main_answerH = winH * 0.65 + "px";
		setCss(guide, "height", guideH);
		setCss(guide, "line-height", guideH);
		setCss(btn, "height", btnH);
		setCss(btn, "line-height", btnH);
		setCss(main_answer, "height", main_answerH);
	}
	else if (pattern == 5) {
		var title = document.getElementsByClassName("main_title")[0];
		var main_answer = document.getElementById("main_answerULID");
		// var oLis = main_answer.getElementsByTagName("li");

		var titleH = winH * 0.29 + "px";
		// var guideH = winH * 0.06 + "px";
		var btnH = winH * 0.09 + "px";
		var main_answerH = winH * 0.42 + "px";
		setCss(title, "height", titleH);
		setCss(title, "line-height", titleH);

		setCss(btn, "height", btnH);
		setCss(btn, "line-height", btnH);
		setCss(main_answer, "height", main_answerH);

	}
	else if (pattern == 6) {
		var main_answer = document.getElementById("main_answerULID");
		//  var oLis = main_answer.getElementsByTagName("li");
		var mainR = document.getElementById("mainR");

		var guideH = winH * 0.06 + "px";
		var btnH = winH * 0.09 + "px";
		var main_answerH = 422+'px';
		var main_answerW = 650+'px';
		var mainRH = 530+"px";
		setCss(guide, "height", guideH);
		setCss(guide, "line-height", guideH);
		setCss(btn, "height", btnH);
		setCss(btn, "line-height", btnH);
		setCss(main_answer, "height", main_answerH);
		setCss(main_answer, "margin-top", '70px');
		setCss(main_answer, "width", main_answerW);
		setCss(main_answer, "line-height", main_answerH);
		setCss(mainR, "height", mainRH);

	}
	else if (pattern == 7) {
		// var title = document.getElementsByClassName("main_title")[0];
		var main_answer = document.getElementById("main_answerULID");
		// var oLis = main_answer.getElementsByTagName("li");
		var main_content = document.getElementById("main_content");

		var guideH = winH * 0.06 + "px";
		var btnH = winH * 0.09 + "px";
		var main_contentH = winH * 0.53 + "px";
		var main_answerH = winH * 0.12 + "px";
		setCss(guide, "height", guideH);
		setCss(guide, "line-height", guideH);
		setCss(btn, "height", btnH);
		setCss(btn, "line-height", btnH);
		setCss(main_content, "height", main_contentH);
		setCss(main_content, "line-height", main_contentH);
		setCss(main_answer, "height", main_answerH);
	}
	else if (pattern == 8) {
		//var title = document.getElementsByClassName("main_title")[0];
		var main_answer = document.getElementById("main_answerULID");
		//var oLis = main_answer.getElementsByTagName("li");
		var main_content = document.getElementById("main_content");

		var guideH = winH * 0.06 + "px";
		var btnH = winH * 0.09 + "px";
		var main_contentH = winH * 0.51 + "px";
		var main_answerH = winH * 0.14 + "px";
		setCss(guide, "height", guideH);
		setCss(guide, "line-height", guideH);
		setCss(btn, "height", btnH);
		setCss(btn, "line-height", btnH);
		setCss(main_content, "height", main_contentH);
		setCss(main_content, "line-height", main_contentH);
		setCss(main_answer, "height", main_answerH);
	}
	else if (pattern == 9) {
		//var title = document.getElementsByClassName("main_title")[0];
		var main_answer = document.getElementById("main_answerULID");
		//var oLis = main_answer.getElementsByTagName("li");
		var main_content = document.getElementById("main_content");

		var guideH = winH * 0.06 + "px";
		var btnH = winH * 0.09 + "px";
		var main_contentH = winH * 0.36 + "px";//0.51
		var main_answerH = winH * 0.29 + "px";
		setCss(guide, "height", guideH);
		setCss(guide, "line-height", guideH);
		setCss(btn, "height", btnH);
		setCss(btn, "line-height", btnH);
		setCss(main_content, "height", main_contentH);
		setCss(main_content, "line-height", main_contentH);
		setCss(main_answer, "height", main_answerH);
	}
	else if (pattern == 10) {
		var title = document.getElementsByClassName("main_title")[0]; //题目内容区域
		var main_answer = document.getElementById("main_answerULID"); //题目选项区域
		var main_content = document.getElementById("main_content"); //题目素材区域

		var titleH = winH * 0.06 + "px";
		var guideH = winH * 0.06 + "px";
		var btnH = winH * 0.09 + "px";
		var main_contentH = winH * 0.32 + "px";
		var main_answerH = winH * 0.27 + "px";
		//setCss(guide, "height", guideH);
		//setCss(guide, "line-height", guideH);
		setCss(btn, "height", btnH);
		setCss(btn, "line-height", btnH);
		setCss(title, "height", titleH);
		setCss(main_content, "height", main_contentH);
		setCss(main_content, "line-height", main_contentH);
		setCss(main_answer, "height", main_answerH);
		setCss(main_son_titleID, "height", guideH);
		setCss(main_son_titleID, "line-height", guideH);
	}
	else if (pattern == 13){
		var main_answer = document.getElementById("main_answerULID");
		var btnH = winH * 0.09 + "px";
		//var main_answerH = winH * 0.75 + "px";
		setCss(guide, "height", '25px');
		setCss(guide, "line-height", '25px');
		setCss(btn, "height", btnH);
		setCss(btn, "line-height", btnH);
		setCss(main_answer, "height", '515px');
	}
	else if(pattern == 14) {
		var title = document.getElementsByClassName("main_title")[0]; //题目内容区域
		var main_content = document.getElementById("main_content"); //题目素材区域
		var titleH = winH * 0.09 + "px";
		var btnH = winH * 0.06 + "px";
		var main_contentW = 948 + "px";
		var main_contentH = 593 + "px";
		setCss(title, "height",  titleH );
		setCss(title, "line-height",  titleH );
		setCss(btn, "height", btnH);
		setCss(btn, "line-height", btnH);
		setCss(main_content, "height", main_contentH);
		setCss(main_content, "width", main_contentW);
	}
	else if (pattern == 15) {
		var title = document.getElementsByClassName("main_title")[0]; //题目内容区域
		var titleH = winH * 0.25 + "px";
		setCss(title, "height", titleH);
	}
	else if (pattern == 16) {
		var title = document.getElementsByClassName("main_title")[0]; //题目内容区域
		var titleH = winH * 0.12 + "px";
		setCss(title, "height",  titleH );
		setCss(title, "line-height",  titleH );
	}
    else if (pattern == 17) {
        var title = document.getElementsByClassName("main_title")[0];
        var main_answer = document.getElementById("main_answerULID");
        //var oLis = main_answer.getElementsByTagName("li");
        var main_content = document.getElementById("main_content");

        var guideH = winH * 0.06 + "px";
        var titleH = winH* 0.06+'px';
        var btnH = winH * 0.09 + "px";
        var main_contentH = winH * 0.51 + "px";
        var main_answerH = winH * 0.14 + "px";
        setCss(guide, "height", guideH);
        setCss(guide, "line-height", guideH);
        setCss(title, "height", titleH);
        setCss(title, "line-height", titleH);
        setCss(main_content, "height", main_contentH);
        setCss(main_content, "line-height", main_contentH);
        setCss(main_answer, "height", main_answerH);
        setCss(btn, "height", btnH);
        setCss(btn, "line-height", btnH);
    }
    else if (pattern == 18) {
            var title = document.getElementsByClassName("main_title")[0];
            var main_answer = document.getElementById("main_answerULID");
            // var oLis = main_answer.getElementsByTagName("li");

            var titleH = winH * 0.29 + "px";
            // var guideH = winH * 0.06 + "px";
            var btnH = winH * 0.09 + "px";
            var main_answerH = winH * 0.42 + "px";
            setCss(title, "height", titleH);
            setCss(title, "line-height", titleH);

            setCss(btn, "height", btnH);
            setCss(btn, "line-height", btnH);
            setCss(main_answer, "height", main_answerH);

	}
    else if (pattern === 19) {
        var title = document.getElementsByClassName("main_title")[0];
        var main_answer = document.getElementById("main_answerULID");
        var main_content = document.getElementById("main_content");
        //var oLis = main_answer.getElementsByTagName("li");
        //var liLength = main_answer.dataType;

        var titleH = winH * 0.25 + "px";
        var guideH = winH * 0.06 + "px";
        var btnH = winH * 0.09 + "px";
        var main_answerH = winH * 0.4 + "px";
        setCss(guide, "height", guideH);
        setCss(guide, "line-height", guideH);
        setCss(btn, "height", btnH);
        setCss(btn, "line-height", btnH);
        setCss(title, "height", titleH);
        setCss(main_answer, "height", main_answerH);
    }
    else if (pattern === 20) {
			var title = document.getElementsByClassName("main_title")[0]; //题目内容区域
			var main_answer = document.getElementById("main_answerULID"); //题目选项区域
			var main_content = document.getElementById("main_content"); //题目素材区域
			var titleH = winH * 0.09 + "px";
			var btnH = winH * 0.09 + "px";
			var main_contentH = winH * 0.42 + "px";
			var main_answerH = winH * 0.27 + "px";
			setCss(btn, "height", btnH);
			setCss(btn, "line-height", btnH);
			setCss(title, "height", titleH);
			setCss(main_content, "height", main_contentH);
			setCss(main_content, "line-height", main_contentH);
			setCss(main_answer, "height", main_answerH);
	}
	else if(pattern >= 21 && pattern <= 32){
		staticModel(pattern);
	}
	else if(pattern === 33){
		$("#guideID").css({"line-height": "64px", "height": "64px"});
		$("#main_son_titleID").css("height", "168px");
	}
}

	function staticModel(pattern){
		var guideObj = document.getElementById("guideID"); //引导语区域
		var titleObj = document.getElementById("main_son_titleID"); //标题区域
		var sonTitleObj = document.getElementById("main_son_titleID"); //子标题区域
		var contentObj = document.getElementById("main_content"); //素材区域
		var selectObj = document.getElementById("main_answerULID"); //选项区域
		var btnLayoutObj = document.getElementById("main_btn_layout"); //操作区域
		var guideBTH = 0; //引导语区下边留白区
		var titleBTHObj = document.getElementById("titleBTH"); //标题区下边留白区
		var contentBTHObj = document.getElementById("contentBTH"); //素材区下边留白区
		var selectBTHObj =  document.getElementById("selectBTH"); //选项区下边留白去
		if(titleObj == "" || titleObj == null){
			//有可能不存在标题区域，此时设定子标题值
			titleObj = sonTitleObj;
		}
		if(pattern === 21 || pattern === 22){
			//引导语+选项区+选项留白区+操作区
			setCss(guideObj,"min-height","64px");
			setCss(guideObj,"height","auto");
			setCss(selectObj,"height", pattern === 22 ? "593px":"370px");
			setCss(selectBTHObj,"height", pattern === 22 ? 25 : 191);
		}
		else if(pattern === 23 || pattern === 25){
			//引导语+标题区+标题留白区+选项区+选项留白区+操作区
			setCss(guideObj,"min-height","64px");
			setCss(guideObj,"height","auto");
			setCss(titleObj,"min-height","80px");
			setCss(titleObj,"height","auto");
			setCss(titleBTHObj,"height", pattern === 23 ? "25px" : "60px");
			setCss(selectObj,"height", pattern === 23 ? "436px" : "370px");
			setCss(selectBTHObj,"height",  pattern === 23 ? "25px" : "56px");
		}
		else if(pattern === 24){
			setCss(titleBTHObj,"height", "64px");
			setCss(selectObj,"min-height", "516px");
			setCss(selectObj,"height","auto");
		}
		else if(pattern === 26 || pattern === 28){
			//引导语+标题区+标题留白区+素材区+素材留白区+选项区+选项留白区+操作区
			setCss(guideObj,"min-height","64px");
			setCss(guideObj,"height","auto");
			setCss(titleObj,"min-height","80px");
			setCss(titleObj,"height","auto");
			setCss(titleBTHObj,"height", "25px");
			setCss(contentObj,"min-height",pattern === 26 ? "180px" : "340px");
			setCss(contentObj,"height","auto");
			setCss(contentBTHObj,"height", pattern === 26 ? "64px" : 0);
			setCss(selectObj,"height", pattern === 26 ? "160px" : "82px");
			setCss(selectBTHObj,"height", pattern === 26 ? "56px" : "40px");
		}
		else if(pattern === 27){
			//引导语+标题区+标题留白区+左选项区+右选项区+留白区+操作区
			setCss(guideObj,"min-height","64px");
			setCss(guideObj,"height","auto");
			setCss(titleObj,"min-height","80px");
			setCss(titleObj,"height","auto");
			setCss(titleBTHObj,"height", "25px");
			setCss(contentObj,"width","332px");
			setCss(contentObj,"height","406px");
			setCss(selectObj,"width","332px");
			setCss(selectObj,"height","406px");
			setCss(selectBTHObj,"height", "56px" );
		}
		else if(pattern === 29 || pattern === 30){
			//引导语+素材区+素材留白区+选项区+选项留白区+操作区
			setCss(guideObj,"min-height","64px");
			setCss(guideObj,"height","auto");
			setCss(contentObj,"height", pattern === 29 ? "276px" : "430px");
			setCss(contentBTHObj,"height", pattern === 29 ? "23px" : "30px");
			setCss(selectObj,"height", pattern === 29 ? "212px" : "50px");
			setCss(selectBTHObj,"height", "56px");
		}
		else if(pattern === 31 || pattern === 32){
			//引导语+素材区+素材留白区+选项区+选项留白区+操作区
			setCss(guideObj,"min-height","64px");
			setCss(guideObj,"height","auto");
			setCss(contentObj,"height", pattern === 31 ? "380px" : "280px");
			setCss(contentBTHObj,"height", pattern === 31 ? "30px" : "30px");
			setCss(selectObj,"height", "101px");
			setCss(selectBTHObj,"height",  pattern === 31 ? "56px" : "156px");
		}else if(pattern === 33){
			//引导语+素材区+素材留白区+选项区+选项留白区+操作区
			setCss(guideObj,"min-height","64px");
			setCss(guideObj,"height","auto");
			setCss(contentBTHObj,"height","52px");
			setCss(selectObj,"height", "222px");
		}

	}

//判断浏览器
function isBrower(){
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
		(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
			(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
				(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

	//以下进行测试
	if (Sys.firefox) {
		return "firefox";
	}
	if (Sys.chrome){
		return "chrome";
	}
	return "other";
}

//返回全屏
function checkFullScreen(){
	var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	if(fullscreenElement == null){
		$("#fullScreen").show();
	}else{
		$("#fullScreen").hide();
	}
}

// Events
document.addEventListener("fullscreenchange", function(e) {
	checkFullScreen();
});
document.addEventListener("mozfullscreenchange", function(e) {
	checkFullScreen();
});
document.addEventListener("webkitfullscreenchange", function(e) {
	checkFullScreen();
});
document.addEventListener("msfullscreenchange", function(e) {
	checkFullScreen();
});

//替换地址
//输入参数 url带.mp3地址
//返回 url格式处理.ogg
//例子：
// 输入参数：/res/audio/01/01/RZ-TXTL-T-01-P12-E-V1.mp3
// 返回参数：/res/audio/01/01/RZ-TXTL-T-01-P12-E-V1.ogg
var getFromatOggByMp3 = function (mp3Str) {
	if(audioExtIsMp3){
		return mp3Str;
	}
	var ogg="";
	if(mp3Str != null && mp3Str != ""){
		var mp3Length = mp3Str.length - 4;
		if(mp3Str.lastIndexOf(".mp3",mp3Length)!=-1){
			return ogg = mp3Str.substring(0,mp3Length)+".ogg";
		}else{
			return ogg = mp3Str;
		}
	}
	return ogg;
};

