/**
 * Created by zhuwenqi on 2016/8/17.
 */
app.filter('filterNameAndPhone', function () {
    return function (e, searchText) {
        var _out = [];
        for (var i = 0; i < e.length; i++) {
            if ( e[i].name.toLowerCase().indexOf(searchText) != -1 || e[i].phone.indexOf(searchText) != -1 ) {
                _out.push(e[i]);
            }
        }
        return _out;
    }
});
app.controller('leaderManageCtrl', ['$scope', 'DBService', '$timeout', '$location','$filter',
    function($scope, db, $timeout, $location, $filter) {
        $scope.sideNavs = []; //菜单集合
        $scope.thisUrlName = 'cePingReadyView'; //当前选中菜单
        $scope.timeChuo = new Date().getTime(); //时间戳
        var isLogin = function() {
            var userPO = findStorageByStorageKey('userPO');
            var trialId = findStorageByStorageKey('trialId');
            //removeAllStorage();
            saveStorage("userPO", userPO);
            saveStorage("trialId", trialId);
            $scope.roleType = userPO.type;
            $scope.zdyRolesTypeId = userPO.zdyRolesTypeId;
            $scope.sideNavs = createMenu($scope.roleType, $scope.zdyRolesTypeId);
        };
        isLogin();
        
        //顶部切换
        $scope.pageOne = true;
        $scope.userPO = JSON.parse(localStorage.userPO);
        $scope.trialIds = $scope.userPO.parentTrial[0].trialList;   //trialIds => 测评Id数组
        angular.forEach($scope.trialIds, function(value, key) {
            switch(value.trialType) {
                case 1:
                    $scope.trialIdForLeader = value.id;
                    break;
                case 2:
                    $scope.trialIdForTeacher = value.id;
                    break;
                case 3:
                    $scope.trialIdForStudent = value.id;
                    break;      
            }   
        });
        $scope.schoolId = $scope.userPO.schoolId;
        $scope.ServicePath = ServicePath;   //路径

        //跳转到教务链接处理
        var paramsSchoolStr = 'schoolId='+$scope.schoolId+'&teacherId='+$scope.userPO.userId+'&roleId='+$scope.userPO.roles; 
        $scope.toEduSchoolUrl = 'http://101.132.175.193:8082/yitai-educational-web/front/index.html#/?'+Base64.encode(paramsSchoolStr);
        

        /*
         * * * * * * * * * * * 校长列表* * * * * * * * *
         * */

        //删除校长确认框状态设置
        $scope.popupDeleteLeaderIsShow = false;
        $scope.paramsObjForLeader = {}; //校长列表请求参数
        //校长总数
        $scope.leadersLength = 0;

        //获取校长列表
        $scope.initLeader = function() {
            var leaderURLPath = ServicePathNew + "/admin/findHeaderListFront";
            var params = {
                trialId: $scope.trialIdForLeader || 1,
                schoolId: $scope.schoolId || 110200019,
                pageNumber: $scope.paginationConfLeader.currentPage,
                pageSize: $scope.paginationConfLeader.itemsPerPage,
                name: $scope.paramsObjForLeader.name || '',
                phone: $scope.paramsObjForLeader.phone || '',
            };
            //校长列表数据
            $scope.leaders = [];
            $scope.leadersLength = 0;
            //是否无校长数据
            $scope.isNoLeaderData = false;
            db.getListPage(leaderURLPath, params).then(function(resData) {
                if (resData.code == 200) {
                    $scope.leadersLength = resData.data.total;
                    $scope.paginationConfLeader.totalItems = resData.data.total;
                    if ( Object.prototype.toString.call(resData.data.resultList) === '[object Array]' && resData.data.resultList.length == 0 ) {
                        $scope.isNoLeaderData = true;
                    } else if ( Object.prototype.toString.call(resData.data.resultList) === '[object Array]' && resData.data.resultList.length > 0 ) {
                        $scope.leaders = resData.data.resultList;
                    }
                } else {
                    if (!!resData.message) {
                        alertPop(resData.message);
                    } else {
                        alertPop($scope.messageFor500);
                    }
                }
            }, function(error) {
                alertPop($scope.messageForNetError);
            });
        };

        //查询校长
        $scope.searchLeader = function() {
            if ( /\d/.test($scope.searchLeaderText) ) {
                $scope.paramsObjForLeader.phone = $scope.searchLeaderText;
            } else if ( /^[\u4E00-\u9FA5]+$/.test($scope.searchLeaderText) ) {
                $scope.paramsObjForLeader.name = $scope.searchLeaderText;
            } else {
                $scope.paramsObjForLeader.name = '';
                $scope.paramsObjForLeader.phone = '';
            }
            //搜索数据重置到第一页
            if ( $scope.paginationConfLeader.currentPage === 1 ) {  //如果是第一页 调用获取列表数据方法
                $scope.initLeader();
            } else {
                $scope.paginationConfLeader = { //如果不是第一页 通过分页插件获取列表数据
                    currentPage: 1,
                    itemsPerPage: 10
                };
            }
        };

        //回车搜索校长
        $scope.enterEventForLeader = function(e) {
            var key_code = window.event ? e.keyCode : e.which;
            if (key_code == 13 ){
                $scope.searchLeader();
            }
        }

        //删除校长
        $scope.deleteLeaderPopup = function(id) {
            $scope.popupDeleteLeaderIsShow = true;
            $scope.deleteLeaderId = id;
        };
        $scope.deleteLeader = function() {
            var deletePath = ServicePathNew + "/forTrial/canclePTrialRecord";
            var param = {
                beanId: $scope.deleteLeaderId, //人物主键ID
                beanType: 1,    //人物类型1校长2老师3学生
                trialId: $scope.trialIdForLeader || 1,
            };

            $scope.popupDeleteLeaderIsShow = false;
            db.deleteData(deletePath, param).then(function(resData) {
                $scope.resetLeader();
                if (resData.code == 200) {
                    //删除成功
                    alertPop(resData.message);
                } else {
                    if ( !!resData.message ) {
                        alertPop(resData.message);
                    } else {
                        alertPop($scope.messageFor500);
                    }
                }
            }, function(error) {
                alertPop($scope.messageForNetError);
            });
        };

        //重置校长列表至第一页及清空搜素条件
        $scope.resetLeader = function() {
            //删除数据后清空搜索条件
            $scope.searchLeaderText = '';
            $scope.paramsObjForLeader.name = '';
            $scope.paramsObjForLeader.phone = '';
            //删除数据后重置到第一页
            if ( $scope.paginationConfLeader.currentPage === 1 ) { //如果是第一页，重新请求列表即可
                $scope.initLeader();
            } else {
                $scope.paginationConfLeader = { //如果不是第一页，通过分页插件页码的改变获取第一页的数据
                    currentPage: 1,
                    itemsPerPage: 10
                };
            }
        };

        /*
         * * * * * * * * * * * 教师列表* * * * * * * * *
         * */

        //删除教师确认框状态设置
        $scope.popupDeleteTeacherIsShow = false;
        $scope.paramsObjForTeacher = {}; //教师列表请求参数
        //教师总数
        $scope.teachersLength = 0;

        //获取教师列表
        $scope.initTeacher = function() {
            var teacherURLPath = ServicePathNew + "/admin/findTeacherListFront";
            var params = {
                trialId: $scope.trialIdForTeacher || 2,
                schoolId: $scope.schoolId || 110200019,
                pageNumber: $scope.paginationConfTeacher.currentPage,
                pageSize: $scope.paginationConfTeacher.itemsPerPage,
                name: $scope.paramsObjForTeacher.name || '',
                phone: $scope.paramsObjForTeacher.phone || '',
            };
            //教师列表数据
            $scope.Teachers = [];
            $scope.teachersLength = 0;
            //是否无教师数据
            $scope.isNoTeacherData = false;
            db.getListPage(teacherURLPath, params).then(function(resData) {
                if (resData.code == 200) {
                    $scope.teachersLength = resData.data.total;
                    $scope.paginationConfTeacher.totalItems = resData.data.total;
                    if ( Object.prototype.toString.call(resData.data.resultList) === '[object Array]' && resData.data.resultList.length == 0 ) {
                        $scope.isNoTeacherData = true;
                    } else if ( Object.prototype.toString.call(resData.data.resultList) === '[object Array]' && resData.data.resultList.length > 0 ) {
                        $scope.teachers = resData.data.resultList;
                    }
                } else {
                    if (!!resData.message) {
                        alertPop(resData.message);
                    } else {
                        alertPop($scope.messageFor500);
                    }
                }
            }, function(error) {
                alertPop($scope.messageForNetError);
            });
        };

        //查询教师 因为searchTeacher方法被别人占用，所以再次用searchByTeacher
        $scope.searchByTeacher = function() {
            if ( /\d/.test($scope.searchTeacherText) ) {
                $scope.paramsObjForTeacher.phone = $scope.searchTeacherText;
            } else if ( /^[\u4E00-\u9FA5]+$/.test($scope.searchTeacherText) ) {
                $scope.paramsObjForTeacher.name = $scope.searchTeacherText;
            } else {
                $scope.paramsObjForTeacher.name = '';
                $scope.paramsObjForTeacher.phone = '';
            }
            //搜索数据重置到第一页
            if ( $scope.paginationConfTeacher.currentPage === 1 ) {  //如果是第一页 调用获取列表数据方法
                $scope.initTeacher();
            } else {
                $scope.paginationConfTeacher = { //如果不是第一页 通过分页插件获取列表数据
                    currentPage: 1,
                    itemsPerPage: 10
                };
            }
        };

        //回车搜索教师
        $scope.enterEventForTeacher = function(e) {
            var key_code = window.event ? e.keyCode : e.which;
            if (key_code == 13 ){
                $scope.searchByTeacher();
            }
        }

        //删除教师
        $scope.deleteTeacherPopup = function(id) {
            $scope.popupDeleteTeacherIsShow = true;
            $scope.deleteTeacherId = id;
        };
        $scope.deleteTeacher = function() {
            var deletePath = ServicePathNew + "/forTrial/canclePTrialRecord";
            var param = {
                beanId: $scope.deleteTeacherId, //人物主键ID
                beanType: 2,    //人物类型1校长2老师3学生
                trialId: $scope.trialIdForTeacher || 2,
            };

            $scope.popupDeleteTeacherIsShow = false;
            db.deleteData(deletePath, param).then(function(resData) {
                $scope.resetTeacher();
                if (resData.code == 200) {
                    //删除成功
                    alertPop(resData.message);
                } else {
                    if ( !!resData.message ) {
                        alertPop(resData.message);
                    } else {
                        alertPop($scope.messageFor500);
                    }
                }
            }, function(error) {
                alertPop($scope.messageForNetError);
            });
        }

        //重置列表搜索条件及页码
        $scope.resetTeacher = function() {
            //删除数据后清空搜索条件
            $scope.searchTeacherText = '';
            $scope.paramsObjForTeacher.name = '';
            $scope.paramsObjForTeacher.phone = '';
            //删除数据后重置到第一页
            if ( $scope.paginationConfTeacher.currentPage === 1 ) { //如果是第一页，重新请求列表即可
                $scope.initTeacher();
            } else {
                $scope.paginationConfTeacher = { //如果不是第一页，通过分页插件页码的改变获取第一页的数据
                    currentPage: 1,
                    itemsPerPage: 10
                };
            }
        }

        /*
         * * * * * * * * * * * 学生——班级列表* * * * * * * * *
         */
        //删除班级确认框状态设置
        $scope.popupDeleteClassIsShow = false;
        //年级列表
        $scope.initGrade = function() {
            var gradeURLPath = ServicePathNew + "/admin/findGradeListFront";
            var params = {
                trialId: $scope.trialIdForStudent || 3,
                schoolId: $scope.schoolId || 110200019,
            };
            //年级列表数据
            $scope.grades = [];
            db.getListPage(gradeURLPath, params).then(function(resData) {
                if (resData.code == 200) {
                    $scope.grades = resData.data;
                    if ( resData.data.length > 0 ) {
                        $scope.initClass(0, resData.data[0].tId, resData.data[0].name);
                    }
                } else {
                    if (!!resData.message) {
                        alertPop(resData.message);
                    } else {
                        alertPop($scope.messageFor500);
                    }
                }
            }, function(error) {
                alertPop($scope.messageForNetError);
            });
        };

        //班级列表
        $scope.initClass = function(index, tId, gradeName) {
            $scope.gradeIndex = index;
            localStorage.setItem('gradeName', gradeName);
            var classURLPath = ServicePathNew + "/admin/findClassListFront";
            var params = {
                trialId: $scope.trialIdForStudent || 3,
                schoolId: $scope.schoolId || 110200019,
                gradeIndex: tId,
            };
            //年级列表数据
            $scope.classes = [];
            db.getListPage(classURLPath, params).then(function(resData) {
                if (resData.code == 200) {
                    $scope.classes = resData.data;
                } else {
                    if (!!resData.message) {
                        alertPop(resData.message);
                    } else {
                        alertPop($scope.messageFor500);
                    }
                }
            }, function(error) {
                alertPop($scope.messageForNetError);
            });
        };

        //删除班级——查询是否可删除
        $scope.deleteClassPopup = function(id) {
            $scope.deleteClassId = id;
            var deletePath = ServicePathNew + "/forTrial/deleteClassTrialRecordAsk";
            var param = {
                classIndex: $scope.deleteClassId,
                trialId: $scope.trialIdForStudent || 3,
            };

            db.deleteData(deletePath, param).then(function(resData) {
                if (resData.code == 200) {
                    //null 可以删除 提示语不可删除
                    if ( resData.data == null ) {
                        $scope.popupDeleteClassIsShow = true;
                    } else {
                        alertPop(resData.data); 
                    }
                } else {
                    if ( !!resData.message ) {
                        alertPop(resData.message);
                    } else {
                        alertPop($scope.messageFor500);
                    }
                }
            }, function(error) {
                alertPop($scope.messageForNetError);
            });
        };
        $scope.deleteClass = function() {
            var deletePath = ServicePathNew + "/forTrial/deleteClassTrialRecordExu";
            var param = {
                classIndex: $scope.deleteClassId,
                // schoolId: $scope.schoolId || 110200019,
                trialId: $scope.trialIdForStudent || 3,
            };

            $scope.popupDeleteClassIsShow = false;
            db.deleteData(deletePath, param).then(function(resData) {
                if (resData.code == 200) {
                    //删除成功
                    $scope.initGrade();
                    alertPop(resData.message);
                } else {
                    if ( !!resData.message ) {
                        alertPop(resData.message);
                    } else {
                        alertPop($scope.messageFor500);
                    }
                }
            }, function(error) {
                alertPop($scope.messageForNetError);
            });
        }

        /*
         * * * * * * * * * * * 学生——学生列表* * * * * * * * *
         */
        //删除学生确认框状态设置
        $scope.popupDeleteStudentIsShow = false;
        $scope.searchStudentText = '';  //过滤学生字符串

        $scope.initStudent = function() {
            $scope.pageOne = false;
            $scope.trcConIndex = 4; //学生列表
            //$location.search('type','student');
            $scope.classObj = JSON.parse(localStorage.getItem('classObj'));
            $scope.classIndex = JSON.parse(localStorage.getItem('classObj')).index;
            $scope.unitPId = JSON.parse(localStorage.getItem('classObj')).pId; //班级信息pid
            $scope.gradeName = localStorage.getItem('gradeName');
            $scope.allStudentsIsChecked = false;    //重置全选状态
            $scope.studentsIds = []; 

            var studentURLPath = ServicePathNew + "/admin/findStudentListBySchoolClass";
            var params = {
                trialId: $scope.trialIdForStudent || 3,
                schoolId: $scope.schoolId || 110200019,
                classIndex: $scope.classIndex,
                name: '',
                sid: '',
            };
            //学生列表数据
            $scope.students = [];
            db.getListPage(studentURLPath, params).then(function(resData) {
                if (resData.code == 200) {
                    $scope.students = resData.data.stuList;
                    $scope.gradeClass = resData.data.gradeClass;
                    $scope.headerTeaName = resData.data.headerTeaName;
                    $scope.studentCount = resData.data.studentCount;
                    $scope.stuIdsList = resData.data.stuIdsList;
                } else {
                    if (!!resData.message) {
                        alertPop(resData.message);
                    } else {
                        alertPop($scope.messageFor500);
                    }
                }
            }, function(error) {
                alertPop($scope.messageForNetError);
            });
        };

        //过滤学生
        $scope.filterStudentFn = function(e) {
            return e.name.indexOf($scope.searchStudentText) != -1 || e.sid.indexOf($scope.searchStudentText) != -1;
        };

        //返回班级列表
        $scope.goBackClass = function() {
            $scope.pageOne = true;
            $scope.selectTab(3);
        };

        //删除学生
        $scope.deleteStudentPopup = function(id) {
            $scope.popupDeleteStudentIsShow = true;
            $scope.deleteStudentId = id;
        };
        $scope.deleteStudent = function() {
            var deletePath = ServicePathNew + "/forTrial/canclePTrialRecord";
            var params = {
                beanId: $scope.deleteStudentId, //人物主键ID
                beanType: 3,    //人物类型1校长2老师3学生
                trialId: $scope.trialIdForStudent || 3,
            };

            $scope.popupDeleteStudentIsShow = false;
            db.deleteData(deletePath, params).then(function(resData) {
                if (resData.code == 200) {
                    $scope.initStudent();
                    alertPop(resData.message);
                } else {
                    if ( !!resData.message ) {
                        alertPop(resData.message);
                    } else {
                        alertPop($scope.messageFor500);
                    }
                }
            }, function(error) {
                alertPop($scope.messageForNetError);
            });
        }

        //批量删除学生
        $scope.studentsIds = [];    //被选中的学生id数组
        $scope.deleteStudentsPopup = function(id) {
            if ( $scope.studentsIds.length === 0 ) return;  //未选中任何学生直接return
            $scope.popupDeleteStudentsIsShow = true;
        };
        $scope.deleteStudents = function() {

            var deletePath = ServicePathNew + "/forTrial/canclePTrialRecordBatch";
            var params = {
                beanIds: $scope.studentsIds.join(), //人物主键ID
                beanType: 3,    //人物类型1校长2老师3学生
                trialId: $scope.trialIdForStudent || 3,
            };
            // console.log(params); return;

            $scope.popupDeleteStudentsIsShow = false;
            db.deleteData(deletePath, params).then(function(resData) {
                if (resData.code == 200) {
                    $scope.initStudent();
                    alertPop(resData.message);
                } else {
                    if ( !!resData.message ) {
                        alertPop(resData.message);
                    } else {
                        alertPop($scope.messageFor500);
                    }
                }
            }, function(error) {
                alertPop($scope.messageForNetError);
            });
        };

        //选项卡切换
        $scope.selectTab = function(index, item) {
            $scope.trcConIndex = index === null ? 1 : index;
            //console.log($scope.trcConIndex);
            if ( index === null || index == 1 ) {
                localStorage.setItem('currentPageType', 1); //当前选项卡下标
                $scope.paginationConfLeader = {
                    currentPage: 1,
                    itemsPerPage: 10
                };
                $scope.$watch('paginationConfLeader.currentPage + paginationConfLeader.itemsPerPage', $scope.initLeader);
            } else if ( index == 2 ) {
                localStorage.setItem('currentPageType', 2);
                $scope.paginationConfTeacher = {
                    currentPage: 1,
                    itemsPerPage: 10
                };
                $scope.$watch('paginationConfTeacher.currentPage + paginationConfTeacher.itemsPerPage', $scope.initTeacher);
            } else if ( index == 3 ) {
                localStorage.setItem('currentPageType', 3);
                $scope.initGrade();
            } else if ( index == 4 ) {
                localStorage.setItem('currentPageType', 4);
                if ( Object.prototype.toString.call(item) === "[object Object]" ) localStorage.setItem('classObj', JSON.stringify(item));
                $scope.initStudent();
            }
        };
        $scope.selectTab(localStorage.getItem('currentPageType'));


        /*
         * * * * * * * * * * * 各种弹框代码 * * * * * * * * *
         */

        // 班级
        var findclassList = ServicePath + 'yitaifront/admin/findClassList?time='+new Date().getTime();
        //
        var findclassListDownload = ServicePath + 'yitaifront/admin/findClassListForDownload?time='+new Date().getTime();

        // 补充参测学生列表
        var findStudentListPage = ServicePath + 'yitaifront/admin/findStudentListBySchoolClass?time='+new Date().getTime();
        var findStudentList = ServicePath + 'yitaifront/admin/findNoSelectStudentList?time='+new Date().getTime();
        // 添加参测教师
        var supplementTeacher = ServicePath + 'yitaifront/forTrial/createPTrialRecordBatchTeacher?time='+new Date().getTime();
        // 添加测评班级
        var supplementClasses = ServicePath + 'yitaifront/forTrial/createPTrialRecordForBatchStudent?time='+new Date().getTime();

        // 添加参测学生
        var supplementStudent = ServicePath + 'yitaifront/forTrial/createPTrialRecord?time='+new Date().getTime();

        // 老师
        var findTeacherOrHeaderList = ServicePath + 'yitaifront/admin/findTeacherOrHeaderList?time='+new Date().getTime();
        // 下载测评用户账号
        var downloadClass = ServicePath + 'yitaifront/exportStudent?';
        // 单选
        $scope.selectOne = function(item,lists,selectedIds,checkAll) {
            if (item.checked) {
                if(item.index){
                    $scope[selectedIds].push(item.index)
                }else{
                    $scope[selectedIds].push(item.id)
                }

            } else {
                var idx = $scope[selectedIds].indexOf(item.id);
                $scope[selectedIds].splice(idx, 1);
            }
            if ($scope[selectedIds].length == $scope[lists].length) {
                $scope[checkAll] = true;
            } else {
                $scope[checkAll] = false;
            }
            // console.log($scope[selectedIds])
        }
        // 全选
        $scope.checkAllList = function(checkedAll,lists,selectedIds) {
            //console.log(checkedAll,lists,selectedIds)
            if(checkedAll){
                $scope[selectedIds]=[];
                for (var i = 0; i < $scope[lists].length; i++) {
                    $scope[lists][i].checked = true;
                    if($scope[lists][i].index){
                        $scope[selectedIds].push($scope[lists][i].index)
                    }else{
                        $scope[selectedIds].push($scope[lists][i].id)
                    }
                }
            }else{
                for (var i = 0; i < $scope[lists].length; i++) {
                    $scope[lists][i].checked = false;
                    $scope[selectedIds]=[];
                }
            }
            //console.log($scope[selectedIds])
        };




        // 存储选择参测学生id
        $scope.studentSelectedIds = [];
        // 获取所有参测学生
        $scope.studentList = [];
        // 获取补充参测学生列表
        $scope.getExtraStudentList=function(status){
            var params = {
                trialId: $scope.trialIdForStudent || 3,
                classIndex:$scope.classIndex,
                stuIdsList: JSON.stringify($scope.stuIdsList)
            }

            db.getListPage(findStudentList, params).then(function(respData){
                if(respData.code == 200){
                    //console.log(respData.code)

                    $scope.studentList=respData.data.stuList;
                    $scope.gradeClass=respData.data.gradeClass;
                    $scope.studentTatal=respData.data.studentCount;
                    $scope[status]=true;
                } else {
                    alertPop(respData.message);
                }
            });
        }

        // 补充参测学生
        $scope.submitSupplementStudent=function(){
            if(!$scope.studentSelectedIds.length) return;
            var params ={
                beanIds:$scope.studentSelectedIds.toString(),
                beanType: '3',
                unitId: $scope.classIndex,
                unitType: 'clazz',
                trialId: $scope.trialIdForStudent || 3,
                unitPId: $scope.unitPId
            }
            db.getListPage(supplementStudent,params).then(function(respData){
                if(respData.code == 200){
                    $scope.initStudent();
                    $scope.isShowModalStudents=false;
                    alertPop(respData.message);
                } else {
                    $scope.isShowModalStudents=false;
                    alertPop(respData.message);
                }
            });
        };
        // $scope.isShowModalTeacher=true;
        // 存储选择id
        $scope.teacherSelectedIds = [];
        // 获取所有班级
        $scope.teacherList = [];
        // 获取教师列表
        $scope.getExtraTeacherList=function(status){
            var params={
                schoolId: $scope.schoolId || 110200019,
                isSchoolHeader: $scope.roleTypeId,
                trialId: ($scope.roleTypeId === 0 ? $scope.trialIdForTeacher : $scope.trialIdForLeader)
            }
            db.getListPage(findTeacherOrHeaderList,params).then(function(respData){
                if(respData.code == 200){
                    $scope.teacherListOld = respData.data;
                    $scope.teacherList=respData.data;
                    $scope.teacherTatal=$scope.teacherList.length;
                    $scope[status]=true;
                }
            });
        }


        // 搜素教师
        $scope.searchText="";
        //过滤姓名和电话
        // $scope.searchTeacher = function(e) {
        //     return e.name.toLowerCase().indexOf($scope.searchText) != -1 || e.phone.indexOf($scope.searchText) != -1
        // };
        //搜索条件变化 调用自定义过滤器返回过滤后的结果数组
        $scope.searchChange = function() {
            $scope.teacherList = $filter('filterNameAndPhone')($scope.teacherListOld, $scope.searchText);
            // console.log($scope.teacherList);
            $scope.checkAllList($scope.checkedAllTeacher,'teacherList','teacherSelectedIds');
            // console.log($scope.teacherSelectedIds);
        };

        // 补充参测教师
        $scope.submitSupplementTeacher=function(){
            if(!$scope.teacherSelectedIds.length) return;
            var params ={
                schoolId: $scope.schoolId || 110200019,
                teacherIds: $scope.teacherSelectedIds.toString(),
                trialId: ($scope.roleTypeId === 0 ? $scope.trialIdForTeacher : $scope.trialIdForLeader),
                teacherTypeFlag: $scope.roleTypeId
            }
            db.getListPage(supplementTeacher,params).then(function(respData){
                if(respData.code == 200){
                    $scope.isShowModalTeacher=false;
                    if($scope.roleTypeId == 0 ){
                        $scope.resetTeacher();
                    }else if($scope.roleTypeId == 1 ){
                        $scope.resetLeader();
                    }
                    alertPop(respData.message);
                } else {
                    $scope.isShowModalTeacher=false;
                    alertPop(respData.message);
                }
            });
        };



        // 存储选择下载测评班级id
        $scope.downloadListSelectedIds = [];
        // 获取所有测评班级
        $scope.downloadClasses = [];

        // $scope.isShowModalDownload=true;

        $scope.downloadHref = 'javascript:;';

        $scope.findDonloadList=function(status){
            var params={
                schoolId: $scope.schoolId || 110200019,
                trialId: $scope.trialIdForStudent || 3,
            }
            db.getListPage(findclassListDownload,params).then(function(respData){
                if(respData.code == 200){
                    $scope.downloadClassesList=respData.data;
                    // 获取下载班级集合
                    for (var i = 0; i < $scope.downloadClassesList.length; i++) {
                        for (var j = 0; j < $scope.downloadClassesList[i].classVoList.length; j++) {
                            $scope.downloadClasses.push($scope.downloadClassesList[i].classVoList[j])
                        }
                    }
                    $scope[status]=true;
                    //console.log( $scope.downloadClasses)
                }else{
                    alertPop(respData.message);
                }
            });
        }
        //$scope.findDonloadList();

        // 获取下载年级班级
        $scope.getDownloadClass = function(status){
            if(!$scope.downloadListSelectedIds.length) return;
            $scope.gradeSelectedIds=[]
            var gradeSelected =[]
            // 获取年级数组
            for (var i = 0; i < $scope.downloadListSelectedIds.length; i++) {

                for (var j = 0; j < $scope.downloadClasses.length; j++) {
                    if($scope.downloadClasses[j].index == $scope.downloadListSelectedIds[i]){
                        gradeSelected.push($scope.downloadClasses[j].gradeIndex)
                    }
                }
            }
            // 年级数组去重
            for(var i=0,l=gradeSelected.length;i<l;i++){
                if($scope.gradeSelectedIds.indexOf(gradeSelected[i])==-1){
                    $scope.gradeSelectedIds.push(gradeSelected[i])
                }
            }
            if($scope.downloadListSelectedIds.length>0 && $scope.gradeSelectedIds.length>0){
                $scope.downloadHref = downloadClass + 'classIndexs=' +$scope.downloadListSelectedIds.toString()+'&gradeIndex='+$scope.gradeSelectedIds.toString()+'&trialId=' + $scope.trialIdForStudent;
                 $scope.modalClose(status);
            }
            console.log($scope.downloadListSelectedIds)
            console.log($scope.gradeSelectedIds)
            // $scope.modalClose(status)
        }


        // $scope.isShowModalClass=true;
        // 存储选择测评班级id
        $scope.classListSelectedIds = [];
        // 获取所有测评班级
        $scope.selectClasses = [];
        //是否有班级
        $scope.classListBoolean = false;
        // 获取班级列表
        $scope.findclassList=function(status){
            $scope.classListBoolean = false;    //初始话是否有班级为false
            var params={
                schoolId: $scope.schoolId || 110200019,
                trialId: $scope.trialIdForStudent || 3,
            }
            db.getListPage(findclassList,params).then(function(respData){
                if(respData.code == 200){
                    $scope.classList=respData.data;
                    // 获取班级集合
                    for (var i = 0; i < $scope.classList.length; i++) {
                        // 没有classVoList属性，或者长度为0
                        if ( $scope.classList[i].classVoList && $scope.classList[i].classVoList.length > 0 ) {
                            $scope.classListBoolean = true; //有班级
                            for (var j = 0; j < $scope.classList[i].classVoList.length; j++) {
                                $scope.selectClasses.push($scope.classList[i].classVoList[j])
                            }
                        }
                    }

                    $scope[status]=true;
                }
            });
        }

        // 添加测评班级
        $scope.submitSupplementClasses = function(status){
            $scope.gradeSelectedIds=[]
            var gradeSelected =[]
            // 获取年级数组
            for (var i = 0; i < $scope.classListSelectedIds.length; i++) {

                for (var j = 0; j < $scope.selectClasses.length; j++) {
                    if($scope.selectClasses[j].index == $scope.classListSelectedIds[i]){
                        gradeSelected.push($scope.selectClasses[j].gradeIndex)
                    }
                }
            }
            // 年级数组去重
            for(var i=0,l=gradeSelected.length;i<l;i++){
                if($scope.gradeSelectedIds.indexOf(gradeSelected[i])==-1){
                    $scope.gradeSelectedIds.push(gradeSelected[i])
                }
            }

            // console.log($scope.gradeSelectedIds)
            // console.log($scope.classListSelectedIds)

            var params ={
                trialId: $scope.trialIdForStudent || 3,
                schoolId: $scope.schoolId || 110200019,
                gradeIndexs: $scope.gradeSelectedIds.toString(),
                classIndexs: $scope.classListSelectedIds.toString(),
            }
            db.getListPage(supplementClasses,params).then(function(respData){
                if(respData.code == 200){
                    $scope.initGrade()
                    $scope.modalClose(status)
                    alertPop(respData.message);
                } else {
                    $scope.isShowModalTeacher=false;
                    alertPop(respData.message);
                }
            });
        }
        // 控制弹窗打开
        $scope.modalOpen=function(status,selectedsList,selectIds,checkAll,type){
            // console.log($scope[selectedsList])
            // console.log(checkAll)
            //重置搜索条件
            $scope.searchText = '';

            if(type == 'leader'){
                $scope.roleTypeId=1;
                $scope.getExtraTeacherList(status)
            } else if(type == 'teacher'){
                $scope.roleTypeId=0;
                $scope.getExtraTeacherList(status)
            } else if(type == 'gradeClass'){
                $scope.findclassList(status)
            } else if(type == 'classUser'){
                $scope.getExtraStudentList(status)
            } else if(type == 'download'){
                $scope.findDonloadList(status)
            }
            
            if(!selectedsList) return;

            for (var i = 0; i < $scope[selectedsList].length; i++) {
                $scope[selectedsList][i].checked = false;
            }
            $scope[selectIds] = [];
            if(!checkAll) return
            $scope[checkAll] = false;

        }
        // 控制弹窗关闭
        $scope.modalClose = function(status){
            $scope[status]=false;
        }

    }
]);