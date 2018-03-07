/**
 * Created by zhuwenqi on 2016/2/17.
 */
app.controller('personController', ['$scope', 'DBService', '$location',function($scope, db, $location) {
	//主机域名
	$scope.hostUrl = location.origin;
	$scope.hostUrlHasYitaifront = location.origin + '/yitaifront';
	//服务器500提示信息
	$scope.messageFor500 = '操作失败，请刷新重试或者联系测评项目负责人。';
	//网络错误提示信息
	$scope.messageForNetError = '网络异常！请刷新重试';
	//cookie设置
	var setCookie = function (key,val) {
		if ( val === 'teacher' ) {
			var value = JSON.parse(localStorage.userPO).zdyRolesTypeId || JSON.parse(localStorage.userPO).roles;
			if ( value === '0' ) {	//教师
				value = 'teacher';
			} else if ( value === '1' ) {	//班主任
				value = 'classTeacher';
			} else if ( value === '2' ) {	//测评负责人
				value = 'headmaster';
			} else if ( value === '4' ) {	//区域负责人
				value = 'customer';
			}
		} else if ( val === 'student' ) {
			var value = 'student';
		}

		var date = new Date(),
			t = 5;
		date.setDate( date.getDate() + t );
		document.cookie = key+'='+encodeURIComponent(value)+';expires='+date.toGMTString() + ';path=/';
	}

	setCookie('userRoleType', JSON.parse(localStorage.userPO).type);
	// ************************************************** //
	// 定义对象
	// ************************************************** //
	$scope.userPO = JSON.parse(localStorage.userPO);
	$scope.userRoles = $scope.userPO.roles;	//角色数组
	$scope.rolesPopup = false;	//选择角色弹框状态
	$scope.sysInfoByNewsList = [];
	// ************************************************** //
	// 关联对象
	// ************************************************** //
	$scope.convertRoleType = function(typeId){
		typeId = typeId || $scope.userPO.zdyRolesTypeId;
		if(typeId == '1'){
			return '班主任';
		}else if(typeId == '2'){
			return '测评负责人';
		}else if(typeId == '4'){
			return '教育局领导'
		}else if(typeId == '0'){
			return '参测领导或教师';
		}else {
			return '';
		}
	};

	$scope.toPersonData = function(){
		location.href = '#/personal-data?ts='+new Date().getTime();
	};
	$scope.toPromptData = function(){
		$scope.promptData = true;
		$scope.promptDataMsg = "更多咨询，请联系测评项目负责人。";
	};

	/*********************************
		改版代码开始 2018-01-19
	*********************************/
	//选择角色
	$scope.selectRole = function() {
		$scope.rolesPopup = true;
	};

	//切换角色
	$scope.changeRole = function(index) {
		$scope.rolesPopup = false;
		$scope.roleIndex = index;
		$scope.roleId = $scope.userRoles[$scope.roleIndex];
		$scope.saveLogin();
	};

	//关闭角色弹框
	$scope.closeRolesPopup = function() {
		$scope.rolesPopup = false;
	};

	//保存登陆信息
	$scope.saveLogin = function() {
		var url = 'http://101.132.175.193:8084/yitaifront/GetTestOriginalData?schoolId='+ $scope.userPO.schoolId +'&userId='+ $scope.userPO.userId +'&roleId='+ $scope.roleId;
		db.getList(url).then(function(resData) {
			if (resData.code == 200) {
				localStorage.removeItem('userPO');	//清空userPO
				$scope.userPO = resData.data;
				$scope.userPO.zdyRolesTypeId = $scope.userPO.roles.toString();
				saveStorage("userPO", $scope.userPO);
				sessionStorage.userPO = JSON.stringify($scope.userPO);
				location.href = getRootPath() + "/pages/front/myCenter/person.html";
			} else {
				if (!!resData.message) {
					alertPop(resData.message);
				}
			}
		}, function(error) {
		});
	};

	//退出本地登陆
	$scope.loginNo = function() {
		var url = 'http://101.132.175.193:8084/yitaifront/logout';
		db.getList(url).then(function(resData) {
			if (resData.code == 200) {
				//退出本地登陆成功 退出cas
				$scope.logOutCas();
			} else {
				if (!!resData.message) {
					alertPop(resData.message);
				}
			}
		}, function(error) {
		});
	};

	//退出cas
	$scope.logOutCas = function() {
		var url = 'http://101.132.175.193:8083/cas/logout';
		db.getList(url).then(function() {
			removeAllStorage();
			//location.href = getRootPath() + "/login.html";
			location.href = location.origin + "/yitaifront/login.html";
		}, function(error) {
		});
	};
	/*********************************
	   			改版代码结束
	 *********************************/


	//切换角色--新版
	$scope.changeRoleNew = function(){
		//回到个人信息页面，弹出面板。
		if($scope.userRoles != null && $scope.userRoles.length > 1){
			$('#tabRolesDiv,#tabRolesDivOverlay').show();
		}
	};
	//获取对应角色图片
	$scope.convertRolesImg = function(typeId){
		if(typeId == '1'){
			return  'http://res.yujingceping.com/res/resources/front/imgs/classteachertu.png';
		}else if(typeId == '2'){
			return  'http://res.yujingceping.com/res/resources/front/imgs/xxldtu.png';
		}else if(typeId == '4'){
			return  'http://res.yujingceping.com/res/resources/front/imgs/jyjldtu.png';
		}else if(typeId == '0'){
			return  'http://res.yujingceping.com/res/resources/front/imgs/teachertu.png';
		}else {
			return '';
		}
	};
	//关闭切换角色弹出框面板
	$scope.closeTabRoles = function(){
		//若未存储当前角色，默认选择第一个
		$('#tabRolesDiv,#tabRolesDivOverlay').hide();
	};


	//切换角色--[调用修改]
	$scope.changeRolesInfo = function(userRoleId){
		$scope.userPO.zdyRolesTypeId = userRoleId;
		saveStorage("userPO", $scope.userPO);
		setCookie('userRoleType', JSON.parse(localStorage.userPO).type);
		//角色切换，更改弹出框状态
		if($scope.roleType == 'student' && $scope.sysInfoByNewsList.length > 0){ //学生
			$scope.newsDialogCtrlFunc('changeRole');
		}
		else if($scope.roleType == 'teacher' && ($scope.userPO.zdyRolesTypeId == '0' || $scope.userPO.zdyRolesTypeId == '') && $scope.sysInfoByNewsList.length > 0 ) { //参测领导或教师
			$scope.newsDialogCtrlFunc('changeRole');
		}else{//其它
			saveStorage('isExistsBySysNews', false);
		}
		//修改---弹框选择完成后，关闭弹框
		$scope.closeTabRoles();
		if($scope.roleType == 'student'){
			subCenterStrLocation();
		}else{
			//切换角色，刷新当前页面
			subCenterStrLocation('changeRole');
		}
	};

	$scope.toHrefByType = function(hrefCtx, hrefType){
		if(null == hrefType || '' == hrefType){
			window.location.href = getRootPath()+'/'+hrefCtx+'.html';
			return;
		}
		window.location.href = getRootPath()+'/pages/front/'+hrefType+'/'+hrefCtx+'.html';
	};

	$scope.toMyCenterUrl = function(hrefType){
		if(hrefType == 'login'){
			location.href = window.sessionStorage.getItem('thisHref');
		}else{
			location.href = '#/'+hrefType;
		}
	};

	/*$scope.loginOutThis = function(){
		var loginOutPath = ServicePath + "yitaifront/user/logOut?ts="+new Date().getTime();
		db.getList(loginOutPath).then(function(response){
			$scope.renderLoginOut(response);
		},function(error){
			if(error.status == -1){
				alertPop('网络连接异常，请稍候“重试”！');
			}
			location.href = window.sessionStorage.getItem('thisHref');
		});
	};*/

	/*$scope.renderLoginOut = function(respData){
		if(respData.code == 200 || respData.code == 401){//退出成功
			removeAllStorage();
			$('.yesLogin').hide();
			$('.noLogin').show();
			location.href = window.sessionStorage.getItem('thisHref');
		}else{
			alertPop('用户登录已失效！');
			removeAllStorage();
			$('.yesLogin').hide();
			$('.noLogin').show();
			location.href = window.sessionStorage.getItem('thisHref');
		}
	};*/

	$scope.goGuideMain = function(evaluationObj, type){
		var evaluationInfo = $scope.setPaperIdList(evaluationObj, type);
		if(evaluationInfo.examIdList.length > 0){
			//开始测评，关闭弹框
			closeNewsDialog();
			if(type == 'parent'){
				location.href = '#/select-role';
			}else{//非学生父母
				if(type == 'student'){//如果是学生，直接进入试听页
					location.href = getRootPath()+'/pages/front/liangbiao/index.html';
				}else{//如果非学生，直接进入测评页
					if(openManifest == 'all'){
						//进入测评（缓存全部）
						location.href = ServicePath + 'yitaifront/normalcase/cacheUrl?trialId='+evaluationInfo.trialId;
					}else if(openManifest == 'section'){
						//进入测评（缓存单套量表）
						location.href = ServicePath + 'yitaifront/normalcase/cacheUrlForExam?examId='+evaluationInfo.examIdList[0];
					}else{
						//进入测评（不缓存）
						location.href = getRootPath()+'/pages/front/liangbiao/main.html';
					}
				}
			}
		}else{
			alert('缺少试卷内容编号');
		}
	};

	$scope.setPaperIdList = function(evaluationObj, type){
		//学生 roleType 0；家长父 roleType 1；家长母 roleType 2；家长爷爷 roleType 3; 家长奶奶 roleType 4; 老师 roleType 5; 班主任 roleType 6；
		//学校测评联系人 roleType 7; 局领导 roleType 8；
		var evaluationInfo = {isAllManifest: 0 ,manifestIndex: 0,trialId: '',examIdList:[],finishedExamCount: 0,isListenFlag: false};
		if(evaluationObj == null || evaluationObj == undefined){
			alert('参数传递有误，请重新登录进入测评！');
			return;
		}else{
			evaluationInfo.trialId = evaluationObj.id;
		}
		//缓存类型	isAllManifest --是否全量缓存 （0--未缓存，1--全量缓存；2--部分缓存）
		if(openManifest == 'all'){
			//进入测评（缓存全部）
			evaluationInfo.isAllManifest = 1;
		}else if(openManifest == 'section'){
			//进入测评（缓存单套量表）
			evaluationInfo.isAllManifest = 2;
		}else{
			//进入测评（不缓存）
			evaluationInfo.isAllManifest = 0;
		}
		//已经完成测评的个数
		if(evaluationObj.finishedExamList != undefined && evaluationObj.finishedExamList != null){
			evaluationInfo.finishedExamCount = evaluationObj.finishedExamList.length;
		}else{
			evaluationInfo.finishedExamCount = 0;
		}
		//试题集合
		var examObjList = [];
		if(type == 'parent'){//学生家长
			examObjList = evaluationObj.parentsExamList;
		}else if(type == 'Teachers'){
			evaluationInfo.roleType = 5;
			examObjList = evaluationObj.personalExamList;
		}else if(type == 'HeadTeacher' && $scope.zdyRolesTypeId == '1'){//班主任
			evaluationInfo.roleType = 6;
			examObjList = evaluationObj.personalExamList;
		}else if(type == 'HeadTeacher' && $scope.zdyRolesTypeId == '2'){//学校测评联系人
			evaluationInfo.roleType = 7;
			examObjList = evaluationObj.personalExamList;
		}else if(type == 'HeadTeacher' && $scope.zdyRolesTypeId == '4'){//局领导
			evaluationInfo.roleType = 8;
			examObjList = evaluationObj.personalExamList;
		}else{//学生
			evaluationInfo.roleType = 0;
			examObjList = evaluationObj.personalExamList;
		}

		var tempArray = [];
		for(var i = 0; i<examObjList.length;i++){
			tempArray.push(examObjList[i].id);
		}
		evaluationInfo.examIdList = tempArray;
		//数据组装完成，存储缓存
		saveStorage("evaluationInfo", evaluationInfo);
		//anku 添加总指导语
		saveStorage("guide", evaluationObj["guide"]);//开始总指导语 文字部分
		saveStorage("giudeAudioUrl", evaluationObj["giudeAudioUrl"]);//开始总指导语 音频部分
		saveStorage("conclusion", evaluationObj["conclusion"]); //结束总指导语 文字部分
		saveStorage("conclusionAudioUrl", evaluationObj["conclusionAudioUrl"]);//结束总指导语 音频部分

		//按钮点击的时候，当前下标归0
		var newLianBiaoObj = {liangbiaoIndex: 0};
		saveStorage('liangbiaoObj', newLianBiaoObj);
		return evaluationInfo;
	};
	// ************************************************** //
	// 实现方式
	// ************************************************** //
	$scope.loadSysInfoByNews = function(){
		$(".blockOverlay,#newsDialog").hide(); //可测弹出框先不展示
		var sysInfoByNewsPath = ServicePath + "yitaifront/trial/fulltrials?time="+new Date().getTime();
		db.getListPage(sysInfoByNewsPath,{state: 3}).then(function(response){
			$scope.renderSysInfoByNews(response);
		},function(error){
			if(error.status == -1){
				alert('网络连接异常，请稍候“重试”！');
			}
			location.href = window.sessionStorage.getItem('thisHref');
		});
	};

	$scope.renderSysInfoByNews = function(response){
		saveStorage('isExistsBySysNews', false);
		if(response.code != 200){//无推送信息
			$scope.sysInfoByNewsList = [];
		}else{
			$scope.sysInfoByNewsList = response.data;
			if($scope.roleType == 'student' && $scope.sysInfoByNewsList.length > 0){ //学生
				$scope.newsDialogCtrlFunc();
			}else if($scope.roleType == 'teacher' && ($scope.userPO.zdyRolesTypeId == '0' || $scope.userPO.zdyRolesTypeId == '') && $scope.sysInfoByNewsList.length > 0 ) { //学校参测领导或教师
				$scope.newsDialogCtrlFunc();
			}else{//其它
				location.href='#/personal-data?ts='+new Date().getTime();
			}
		}
	};

	$scope.newsDialogCtrlFunc = function(){
		for(var i = 0; i<$scope.sysInfoByNewsList.length; i++){
			var _personExamList = $scope.sysInfoByNewsList[i].personalExamList;
			if(_personExamList!= null && _personExamList.length>0){
				saveStorage('isExistsBySysNews', true);
				break;
			}
		}
		if($scope.roleType == 'student'){//学生
			location.href='#/evaluation-query?ts='+new Date().getTime();
		}else{//非学生
			//location.href='#/personal-data?ts='+new Date().getTime();
		}
	};

	var loadPersonalInfo = function(){
		//从本地缓存中读取用户数据，若有值，则跳转至个人中心；否则，跳转至登录页面
		$scope.userPO = findStorageByStorageKey("userPO");
		$scope.roleType = $scope.userPO.type;
		if($scope.userPO != null && $scope.userPO != '' && $scope.userPO.loginName != ''){
			//数据初始化~~~~~~~~~~
			personDom.bindEvents();
//			$scope.loadSysInfoByNews();
			var isExistsBySysNews = false;
			saveStorage("isExistsBySysNews", isExistsBySysNews);
			if($scope.roleType == 'student'){//学生
				location.href='#/evaluation-query?ts='+new Date().getTime();
			}else{//非学生
				//location.href='#/personal-data?ts='+new Date().getTime();
			}
		}else{
			//$scope.loginOutThis();
			$scope.loginNo();
		}
	};

	var compare = function(value1, value2) {
		if (value1 < value2) {
			return 1;
		} else if (value1 > value2) {
			return -1;
		} else {
			return 0;
		}
	};

	var setTimeChuo = function(){
		$scope.timeChuo = new Date().getTime();
	};
	// ************************************************** //
	// 流程控制
	// ************************************************** //
	loadPersonalInfo();
	setTimeChuo();
}]);

var closeNewsDialog = function(){
	$(".blockOverlay,#newsDialog").hide();
};

var personDom = {
	bindEvents: function(){
		$('#span_jsqh').mouseover(function(){
			$('.jsqh_box').removeClass('hideCss');
		}).mouseout(function(){
			$('.jsqh_box').addClass('hideCss');
		});
		$('.jsqh_box').mouseover(function(){
			$('.jsqh_box').removeClass('hideCss');
		}).mouseout(function(){
			$('.jsqh_box').addClass('hideCss');
		});
	}
};

//自定义alertPop弹框
function alertPop(noticeText,isJump,isReload) {
	var alertPopHtml = '<div class="alert-popup" style="position: fixed; top: 200px; left: 50%; z-index:100001; padding: 20px 15px 20px 15px; width: 240px;font-size:12px;background: #fff;border-radius: 5px;"><p style="text-align: center; font-size: 14px; font-weight: 600; color: #4a5b62;">'+ noticeText +'</p><a href="javascript:;" style="display:block; margin: 18px auto 0;width: 80px;height: 34px;line-height: 34px;text-align:                                       center;font-size:14px;letter-spacing: 1px;border-radius: 25px;color: #4daffd;border: 1px solid #4daffd;" >确定</a></div><div class="alert-popup-mark" style="position:fixed; top:0; left:0; z-index:100000; width:100%; height:1000px; background: rgba(0, 0, 0, 0.5);"></div>';
	$('body').append(alertPopHtml);
	$('.alert-popup').css({'left': $(window).width()/2-$('.alert-popup').width()/2});
	$('.alert-popup-mark').css('height', $(window).height());

	$('.alert-popup a').click(function() {
		$('.alert-popup-mark').remove();
		$('.alert-popup').remove();
		if (!!isJump && isJump === 'goToLeaderManager') {
			location.href = location.origin + '/yitaifront/pages/front/myCenter/person.html#/leaderManager';
		};
		if(isReload){
            window.location.reload();
		}

	});
}
//内部弹框设置左右居中
$(function() {
	var popUpLeft = ($(window).width()-1000)/2+235+(765/2-$('.lm-popup').outerWidth()/2);
	$('.lm-popup').css( 'left', popUpLeft);
	$('.cm-popup').css( 'left', popUpLeft);
});