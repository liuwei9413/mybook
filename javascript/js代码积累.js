//淘宝代码 防止多个window.onload冲突
domReady = (function(ready) {
    var fns = []
    var fn
    var f = false
    var doc = document
    var testEl = doc.documentElement
    var hack = testEl.doScroll
    var domContentLoaded = 'DOMContentLoaded'
    var addEventListener = 'addEventListener'
    var onreadystatechange = 'onreadystatechange'
    var readyState = 'readyState'
    var loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
    var loaded = loadedRgx.test(doc[readyState])

    function flush(f) {
        loaded = 1
        while (f = fns.shift()) f()
    }

    if (doc[addEventListener]) {
        fn = function() {
            doc.removeEventListener(domContentLoaded, fn, f)
            flush()
        }
        doc[addEventListener](domContentLoaded, fn, f)
    }

    if (hack) {
        fn = function() {
            if (/^c/.test(doc[readyState])) {
                doc.detachEvent(onreadystatechange, fn)
                flush()
            }
        }
        doc.attachEvent(onreadystatechange, fn)
    }

    if (!hack) {
        return function(fn) {
            if (loaded) {
                fn()
            } else {
                fns.push(fn)
            }
        }
    } else {
        ready = function(fn) {
            if (this != top) {
                if (loaded) {
                    fn()
                } else {
                    fns.push(fn)
                }
            } else {
                try {
                    testEl.doScroll('left')
                } catch (e) {
                    return setTimeout(function() {
                        ready(fn)
                    }, 50)
                }
                fn()
            }
        }
        return ready;
    }
})();


/*绑定事件监听函数*/
function addHandler(element, type, fn) {
    if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    } else if(element.attachEvent) {
        element.attachEvent("on" + type, function() {
            fn.call(element)
        });
    } else {
        element['on'+type] = fn;
    }
}
/*取消事件绑定*/
function removeHandler(element, type, fn) {
    if (element.removeEventListener) {
        element.removeEventListener(type, fn, false)
    } else if (element.detachEvent) {
        element.detachEvent("on"+type, fn)
    } else {
        element['on'+type] = null;
    }
}

// 比如绑定window.onload事件
addListener(window, "load",
    function() {
        alert('window.onload is execute');
    }
);


/*浏览器检测*/
ie：window.ActiveXObject (ie10及以下)
chrome: window.openDatabase
ff: window.updateCommands  top.netscape

$(function () {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    if (Sys.ie) console.log('IE: ' + Sys.ie);
    if (Sys.firefox)  console.log('Firefox: ' + Sys.firefox);
    if (Sys.chrome)  console.log('Chrome: ' + Sys.chrome);
    if (Sys.opera)  console.log('Opera: ' + Sys.opera);
    if (Sys.safari)  console.log('Safari: ' + Sys.safari);
});

/*HTML检测ie版本代码*/
<!--[if !IE]><!--> 除IE外都可识别 <!--<![endif]-->
<!--[if IE]> 所有的IE可识别 <![endif]-->
<!--[if IE 6]> 仅IE6可识别 <![endif]-->
<!--[if lt IE 6]> IE6以及IE6以下版本可识别 <![endif]-->
<!--[if gte IE 6]> IE6以及IE6以上版本可识别 <![endif]-->
<!--[if IE 7]> 仅IE7可识别 <![endif]-->
<!--[if lt IE 7]> IE7以及IE7以下版本可识别 <![endif]-->
<!--[if gte IE 7]> IE7以及IE7以上版本可识别 <![endif]-->
<!--[if IE 8]> 仅IE8可识别 <![endif]-->
<!--[if IE 9]> 仅IE9可识别 <![endif]-->


/*ie9以下 检测ie版本*/
var isIE = function(ver){
    var b = document.createElement('b')
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
}


/*滚动条滚动高度*/
var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

/*iframe相关*/
//子页面获取父页面iframe 不同域名下获取不到
window.parent.document.getElementById('myFrame');
window.name //获取父页面iframe的name 同域名下数据获取

/*js执行顺序*/
1. 读入第一个代码块。
2. 做语法分析，有错则报语法错误（比如括号不匹配等），并跳转到 5。
3. 对var变量和function定义做“预编译处理”（永远不会报错的，因为只解析正确的声明）。
4. 执行代码段，有错则报错（比如变量未定义）。
5. 如果还有下一个代码段，则读入下一个代码段，重复 2。
6. 结束。


/*insertAfter函数封装 目标节点之后插入节点*/
function insertAfter(target, bullet) {
    target.nextSibling ? target.parentNode.insertBefore(bullet, target.nextSibling) : target.parentNode.appendChild(bullet);
}


/*原生js获取样式属性（obj.style 只能获取行间样式 样式表里的样式获取不到）*/
function css(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else if (window.getComputedStyle) {
        return document.defaultView.getComputedStyle(obj, null)[attr];
    }
}
function css(obj, attr, value) {
    switch (arguments.length) {
        case 2:
            if (typeof arguments[1] == "object") { //二个参数, 如果第二个参数是对象, 批量设置属性
                for (var i in attr) obj.style[i] = attr[i]
            } else { //二个参数, 如果第二个参数是字符串, 读取属性值
                return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr]
            }
            break;
        case 3:
            //三个参数, 单一设置属性
            obj.style[attr] = value;
            break;
        default:
            alert("参数错误！")
    }
}

/*日期字符串转时间戳 '2015-04-07'*/
//1.精确到时分秒 2015-04-07 14-22-33
function covertime(date) {
    var date = date.split('-');
    var d = new Date();
    d.setFullYear(date[0]);
    d.setMonth(date[1]);
    d.setDate(date[2]);
    return Date.parse(d);   //Date.parse("2015-06-26 13:48:30"); 1435297710000  日期格式转时间戳
}
alert(covertime('2015-04-07'));//1430980899000(精确到时分秒)
//2.精确到天 2015-04-07 00-00-00
var date = '2015-04-07';
date = new Date(Date.parse(date.replace(/-/g, "/")));
date = date.getTime();
alert(date);

//获取当前时间的时间戳
(+new Date);
new Date().getTime();


//取min到max之间的值
function range(num, max, min){
    return Math.min(max, Math.Max(num, min));
}

//区别火狐
try {
    document.createEvent('MouseScrollEvents');
    alert('firefox')
} catch(e){
    alert('other')
}


//匿名函数自执行 简化写法
!function add(a,b){
    console.log(a+b)
}(1,2),                 //3
    function sum(a,b){
        console.log(a-b)
    }(1,2);                 //-1


//行间js函数 参数转义 注意单双引号隔开使用
imgBox.innerHTML = '<a href="'+ads[i]['tourl']+'" target="_blank" onclick="clickImg(\'e\', \''+ads[i]['curl']+'\');"><img src="'+ads[i]['picurl']+'" width="270" height="250" /></a>';

//window.onload 页面加载完成函数封装
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
//domReady函数
function IEContentLoaded (w, fn) {
    var d = w.document, done = false,
    // 只执行一次用户的回调函数init()
        init = function () {
            if (!done) {
                done = true;
                fn();
            }
        };
    (function () {
        try {
            // DOM树未创建完之前调用doScroll会抛出错误
            d.documentElement.doScroll('left');
        } catch (e) {
            //延迟再试一次~
            setTimeout(arguments.callee, 50);
            return;
        }
        // 没有错误就表示DOM树创建完毕，然后立马执行用户回调
        init();
    })();
    //监听document的加载状态
    d.onreadystatechange = function() {
        // 如果用户是在domReady之后绑定的函数，就立马执行
        if (d.readyState == 'complete') {
            d.onreadystatechange = null;
            init();
        }
    };
}


function stopPropagation(e) {
//如果提供了事件对象，则这是一个非IE浏览器
    if ( e && e.stopPropagation )
    //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    else
    //否则，我们需要使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
}

function preventDefault( e ) {
    //阻止默认浏览器动作(W3C)
    if ( e && e.preventDefault )
        e.preventDefault();
    //IE中阻止函数器默认动作的方式
    else
        window.event.returnValue = false;
    return false;
}


//添加收藏  ie下有效
function bookMark(url, title) {
    var d = url || window.location.href, e = title || document.title;
    try {
        window.external.AddFavorite(d, e)
    } catch (a) {
        try {
            window.sidebar.addPanel(e, d, '')
        } catch (a) {
            window.alert('请您尝试同时按下Ctrl和D键收藏本页')
        }
    }
}

//字符串和json对象转换
var str = '{"name":"fengge","age":"26"}';
var json = {name:'fengge',age:'26'};
console.log(str);
//JSON.parse(str) 从字符串解析出对象
console.log(JSON.parse(str));
//stringify() 从对象解析出字符串
console.log(json);
console.log(JSON.stringify(json));


//连续三目运算
a = 1 > 2 ? 3 : 1 > 3 ? 4 : 5;
console.log(a); //5


//jq $().each和$.each()用法 $().each操作DOM  $.each操作数组或对象
var arr = ['a','b','c'];
$.each(arr,function(i,val){
    console.log('下标'+i+'值为：'+val);
})
var obj = { one:1, two:2, three:3, four:4};
$.each(obj, function(key, val) {
    console.log(val);
});

//indexOf 和 ~
var str = 'hello';
if ( ~str.indexOf('ha') ){
    console.log('yes')
} else {
    console.log('no') //no
}

//检测是否为标准模式 标准：CSS1Compat 非标准：BackCompat
/1/.test(d.compatMode)

//无刷新修改地址栏
history.replaceState(null, '', 'hello')

//meta标签跳转前进后退按钮无法使用
// document.writeln('<meta name="referrer" content="never"><meta http-equiv="refresh" content="0;url=http://www.hao123.com/" />');
// (function(a){
//     a.href = 'http://www.hao123.com/';
//     document.body.appendChild(a);
//     a.click();
// })(document.createElement('a'))


//for循环简写 直接获取赋值循环
for ( var a, b=[1,2,3,4,5], c = b.length; c--; ){
    a = b[c];
    if (a > 10) {
        console.log(a);
    }
}

//判断数据类型
Object.prototype.toString.call([])
"[object Array]"
Object.prototype.toString.call({})
"[object Object]"
Object.prototype.toString.call('')
"[object String]"
Object.prototype.toString.call(1)
"[object Number]"

if(typeof Array.isArray==="undefined") {
    Array.isArray = function(arg){
        return Object.prototype.toString.call(arg)==="[object Array]"
    };
}

var Type = {};
for ( var i = 0, type; type = [ 'String', 'Array', 'Number' ][ i++ ]; ){
    (function( type ){
        Type[ 'is' + type ] = function( obj ){
            return Object.prototype.toString.call( obj ) === '[object '+ type +']';
        }
    })( type )
};

Type.isArray( [] ); // 输出：true
Type.isString( "str" ); // 输出：true

var isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
};

//异步操作 promise对象
var wait = function(dtd) {
    var dtd = $.Deferred(); //新建Deferred对象
    var task = function() {
        alert('执行完毕');
        // dtd.resolve();   //改变Deferred对象的执行状态
        dtd.reject();
    };
    setTimeout(task, 3000);
    return dtd.promise(); //返回promise对象
    // return dtd  //返回延迟对象也可以 延迟对象比promise对象多几个方法如：resolve等
};

//判断空数组或空对象
function isEmpty(value) {
  return (Array.isArray(value) && value.length === 0) 
      || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
}

$.when(wait()).then(function() {alert('成功！')}, function() {alert('失败！')});

//正则表达式
(?!pattern) 正向否定预查 例如 windows(?!98|95|2000) 能匹配window3.1中的windows 不匹配windows98中的windows
(?:pattern) 匹配不获取 industr(?:y|ies)    industries industry
//正则排除指定字符串
/(?!.*初中|.*中学|.*baiduhome|.*sitehao123)^.*$/.test('www.baidu.com/?tn=sitehao123')   //false
/(?!.*初中|.*中学|.*baiduhome|.*sitehao123)^.*$/.test('www.baidu.com/?tn=sitehao12')    //true
//匹配姓名2-4个中文
^[\u4E00-\u9FA5]{2,4}$
//匹配手机号码
1((3\d)|(4[57])|(5\d)|(8\d))\d{8}
//匹配6个字符以上 必须同时包含数字、小写字母、大写字母的正则
^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$


//随机数+数组 随机取出数组中某个元素
function rand(n,) {
    return Math.floor( Math.random()*n );
}
var arr = ['a','b','c','d'];
var a = arr[rand(arr.length)];
console.log(a);

1.23 | 0 == 1;
function rand(n) {
    return Math.random() * n | 0;
}
rand(2) // 1/2概率

function rand(n, m) {
    var i = m - n;
    return (Math.random()*(i+1)+n | 0) ; //
}
// rand(10, 15);   //10-15之间的数字
var arr = [];
for (var i = 0; i < 10; i++) {
    arr.push(rand(10,15));
}
console.log(arr);   //[15, 14, 12, 11, 15, 12, 10, 12, 15, 11]

//数组添加求和方法
Array.prototype.sum = function() {
    var sum = 0;
    for(var i = 0; i < this.length; i++) sum += this[i];
    return sum;
}
//数组求最大值
Array.prototype.max = function() {
    var max = Number.MIN_VALUE;
    for( var i = 0; i < this.length; i++) {
        // this[i] > max && max = this[i]; 易错写法 优先级&&>=
        this[i] > max && (max = this[i]);
    }
    return max;
}



//匿名函数传参递归arguments.callee 用不带参数的匿名函数包裹 否则会报错
~function(a,b) {
    (function() {
        b && clearTimeout(b);
        b = null;
        console.log(a--);

        b = setTimeout(arguments.callee, 1000)
    })()
}(100)

//大牛写法 匿名函数参数为函数
(function(k) {
    k(1,2)
})( function(a, b) {
    console.log(a+b)
} )

//dispatchEvent 绑定事件(可解决Safari非button元素的click事件)
function dispatch(ele, type) {
    var evt = document.createEvent('MouseEvent');   //创建事件对象
    evt.initEvent(type, true, true);    //初始化事件类型
    ele.dispatchEvent(evt)              //绑定事件到相应DOM上
}
dispatch(btn, 'click');

//函数表达式+匿名函数
var x = (function(k) {
    k(1,2);
    return k;   //3
})(function(a,b) {
    alert(a+b)
});
console.log(x); //function (a,b)
x(10,20);       //30

//首字母大写 \b匹配单词边界 此处指匹配\w+
name = 'aaa bbb ccc';
uw=name.replace(/\b\w+\b/g, function(word){
    return word.substring(0,1).toUpperCase()+word.substring(1);}
);

var a = '2015/04/04/11/11/11';
ua = a.replace(/\d+\//g,function(x) {
    return x.replace('/','-')
})

var str = '{"a":"hehe"}';
JSON.parse(str);

//获取元素
var getById = function(id) { return (typeof id) == 'string' ? document.getElementById(id) : id;};
var getByTag = function(elem, oParent) {return (oParent || document).getElementsByTagName(elem);};
var getByClass = function(sClass, oParent) {
    var aClass = [];
    var reClass = new RegExp('(^| )' + sClass + '( |$)');
    var aElem = getByTag('*', oParent);
    for (var i=0, el=aElem.length; i<el; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
    return aClass;
};

var getByTag = function(tag, oParent) {
    return (oParent || document).getElementsByTagName(tag);
};
var getByClass = function(cName, oParent) {
    var aClass = [];
    var reClass = new RegExp('(^|\\s)' + cName + '(\\s|$)');
    var elems = getByTag('*', oParent);
    for(var i=0, el=elems.length; i<el; i++) reClass.test(elems[i].className) && aClass.push(elems[i]);
    return aClass;
}

//获取样式
function getStyle(obj, attr){
    return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr])
}
//绑定事件
function addHandler(element, type, handler){
    return element.addEventListener ? element.addEventListener(type, handler, false) : element.attachEvent("on" + type, handler)
}



//定时器 定时随机
var a = [1000, 4000];

(function() {
    var b = a[rand(2)];
    console.log(b);
    setTimeout(arguments.callee, b);
})();

function rand(n) {
    return Math.random() * n | 0;
}

//定时器循环判断 当fn1执行完毕再执行fn2
var _CF = function(fn1, fn2) {
    var n = fn1();
    if(n) {
        fn2 && fn2(n);
    }else {
        setTimeout(function() {
            _CF(fn1, fn2)
        },30)
    }
};
//页面灰色
html {
    filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    -webkit-filter: grayscale(1);
}

//清除浮动
.clearfix { *zoom:1;}
.clearfix:after { content:"."; display:block; height:0; visibility:hidden; clear:both;}

//用json表示一个树结构（递归）
var json = [{'menuid':'001','parentid':'','name':'系统管理'},
    {'menuid':'002','parentid':'001','name':'菜单管理'},
    {'menuid':'003','parentid':'001','name':'配置管理'},
    {'menuid':'004','parentid':'003','name':'预警规则设置'},
    {'menuid':'005','parentid':'004','name':'规则列表'}
// {'menuid':'006','parentid':'','name':'业务受理'},
// {'menuid':'007','parentid':'006','name':'移动故障单录入'}
];
{
    "name": "系统管理",
    "id": "001",
    "children": [{
    "name": "菜单管理",
    "id": "002",
    "children": []
},
    {
        "name": "配置管理",
        "id": "003",
        "children": [{
            "name": "预警规则设置",
            "id": "004",
            "children": [{
                "name": "规则列表",
                "id": "005",
                "children": []
            }]
        }]
    }]
}

function toTree(json) {
    var tmp = {},parent;
    for (var i = 0; i < json.length; i++) {
        if (json[i].parentid == '') {
            parent = json[i].menuid;
        }
        if (!tmp[json[i].menuid]) {
            tmp[json[i].menuid] = {};
        }
        tmp[json[i].menuid].name = json[i].name;
        tmp[json[i].menuid].id = json[i].menuid;
        if (!('children' in tmp[json[i].menuid])) tmp[json[i].menuid].children = [];

        if(json[i].parentid != ''){
            if(tmp[json[i].parentid]){
                tmp[json[i].parentid].children.push(tmp[json[i].menuid]);
            }else{
                tmp[json[i].parentid]={children:[tmp[json[i].menuid]]};
            }
        }
    };

    return tmp[parent];
}
console.log(JSON.stringify(toTree(json)));


/*


 */

//事件模拟
var blue = document.getElementById('blue');
function addHandler(element, type, handler){
    return element.addEventListener ? element.addEventListener(type, handler, false) : element.attachEvent("on" + type, handler)
}
addHandler(blue,'mouseover',function(){
    alert(1)
})
function trigger(ele, type) {
    if (document.createEvent) {
        var evtObj = document.createEvent('MouseEvent');
        evtObj.initEvent(type, false, false);
        ele.dispatchEvent(evtObj);
    } else {
        var evtObj = document.createEventObject();
        ele.fireEvent('on'+type, evtObj);
    }
}
trigger(blue, 'mouseover');


//淘宝橱窗广告事件绑定代码
addHandler: function(e, t, n) {
    e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n
},
getButton: function(e) {
    if (document.implementation.hasFeature("MouseEvents", "2.0")) return e.button;
    switch (e.button) {
        case 0:
        case 1:
        case 3:
        case 5:
        case 7:
            return 0;
        case 2:
        case 6:
            return 2;
        case 4:
            return 1
    }
},
getCharCode: function(e) {
    return typeof e.charCode == "number" ? e.charCode : e.keyCode
},
getClipboardText: function(e) {
    var t = e.clipboardData || window.clipboardData;
    return t.getData("text")
},
getEvent: function(e) {
    return e ? e : window.event
},
getRelatedTarget: function(e) {
    return e.relatedTarget ? e.relatedTarget : e.toElement ? e.toElement : e.fromElement ? e.fromElement : null
},
getTarget: function(e) {
    return e.target || e.srcElement
},
getWheelDelta: function(e) {
    return e.wheelDelta ? client.engine.opera && client.engine.opera < 9.5 ? -e.wheelDelta : e.wheelDelta : -e.detail * 40
},
preventDefault: function(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = !1
},
removeHandler: function(e, t, n) {
    e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent ? e.detachEvent("on" + t, n) : e["on" + t] = null
},
setClipboardText: function(e, t) {
    e.clipboardData ? e.clipboardData.setData("text/plain", t) : window.clipboardData && window.clipboardData.setData("text", t)
},
stopPropagation: function(e) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
},
mouseEnterLeave: function(e, t, n) {
    var r = t === "mouseenter",
        s = r ? "fromElement" : "toElement",
        o = function(t) {
            t = t || window.event;
            var r = t.target || t.srcElement,
                o = t.relatedTarget || t[s];
            (e === r || i._contains(e, r)) && !i._contains(e, o) && n(t)
        };
    return t = r ? "mouseover" : "mouseout", i.addHandler(e, t, o), o
},
_contains: function(e, t) {
    return e.contains ? e.contains(t) : !!(e.compareDocumentPosition(t) & 16)
}

//事件绑定(惰性加载函数 提升性能)
var addEvent = function( elem, type, handler ){
    if ( window.addEventListener ){
        addEvent = function( elem, type, handler ){
            elem.addEventListener( type, handler, false );
        }
    }else if ( window.attachEvent ){
        addEvent = function( elem, type, handler ){
            elem.attachEvent( 'on' + type, handler );
        }
    }
    addEvent( elem, type, handler );
};


/*iframe跨域获取父页面url*/
function getParentUrl() {
    var url = null;
    if (parent !== window) {
        try {
            url = parent.location.href;
        } catch (e) {
            url = document.referrer;
        }
    }
    return url;
}

//伪数组转化为数组
Array.prototype.slice.call(arguments);
//给Function添加bind方法 改变this指向
Function.prototype.bind = Function.prototype.bind || function(context){
        var self = this;

        return function(){
            return self.apply(context, arguments);
        };
    }

//获取class
function jyHasClass(cName, tagName, oParent) {
    var target = [];
    var elements = (oParent || document).getElementsByTagName(tagName);
    for (var i = 0, el = elements.length; i < el; i++) {
        if (~elements[i].className.indexOf(cName)) {
            target.push(elements[i])
        }
    };
    return target;
};

//获取id
function $ (id)
{
    return typeof id === "string" ? document.getElementById(id) : id;
}
//获取tagName
function $$ (elem, oParent)
{
    return (oParent || document).getElementsByTagName(elem);
}
//获取class
function $$$ (className, oParent)
{
    var aClass = [];
    var reClass = new RegExp("(//s|^)" + className + "($|//s)");
    var aElem = $$("*", oParent);
    for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
    return aClass
}

//DNS预读取：显示对页面未出现的域名DNS预读取
<link rel="dns-prefetch" href="http://web2.baidu.com" >

//多行溢出显示省略号 css代码 只支持chrome
    {overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical;}
//css溢出显示省略号
{overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;}

//移动端字体最佳效果
body {
    font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
}

//移动端rem 设置
adapt:function(designPercent){
    var mainWidth = document.body.clientWidth;
    var fontSize = mainWidth/designPercent + 'px';
    document.documentElement.style.fontSize = fontSize;
//视窗变化时需要再次适配，这种情况实际价值不是很大！最主要的只是首次适配
    window.onresize = function(){
        var mainWidth = document.body.clientWidth;
        var fontSize = mainWidth/designPercent + 'px';
        document.documentElement.style.fontSize = fontSize;
    }
};
adapt(640/64); //设计图宽度为640

//rem设置
(function(win,doc){
  change();
  function change(){
      doc.documentElement.style.fontSize = doc.documentElement.clientWidth *20/320+'px';
  }
  win.addEventListener('resize',change,false);
  win.addEventListener('orientationchange',change,false);  /* 这个是移动端设备横屏、竖屏转换时触发的事件处理函数 */
})(window,document);

//移动端rem.js
;(function() {
    var dpr, rem, scale;
    var docEl = document.documentElement;
    var fontEl = document.createElement('style');
    var metaEl = document.querySelector('meta[name="viewport"]');

    dpr = window.devicePixelRatio || 1;
    scale = 1 / dpr;
    rem = docEl.clientWidth * dpr / 10;

    //设置viewport,进行缩放，达到高清效果
    metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ',user-scalable=no');
    //设置data-dpr属性，留作css hack之用
    docEl.setAttribute('data-dpr', dpr);
    //动态写入样式
    docEl.firstElementChild.appendChild(fontEl);
    fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

    //js调用的，某一dpr下rem和px之间的转换函数
    window.remToPx = function(v) {
        v = parseFloat(v);
        return v * rem;
    };
    window.pxToRem = function(v) {
        v = parseFloat(v);
        return v / rem;
    };

    window.dpr = dpr;
    window.rem = rem;
})();


//css设置字体大小根据dpr
[data-dpr='3'] .mydiv { font-size:48px;}


//cookie操作
function setCookie(key,value) {
    var date = new Date(),
        t = 5;
    date.setDate( date.getDate() + t );
    document.cookie = key+'='+encodeURIComponent(value)+';expires='+date.toGMTString() + ';path=/';
}
function getCookie(key) {
    var arr,reg = RegExp('(^| )'+key+'=([^;]+)(;|$)');
    if (arr = document.cookie.match(reg))    //["username=liuwei;", "", "liuwei", ";"]
        return decodeURIComponent(arr[2]);
    else
        return null;
}

function delCookie(key) {
    var date = new Date();
    date.setTime(date.getTime() - 1);
    var delValue = getCookie(key);
    if (!!delValue) {
        document.cookie = key+'='+delValue+';expires='+date.toGMTString();
    }
}
delCookie('username');


//图片预加载
function loadImage(url,callback) {
    var img = new Image();

    img.src = url;

    if(img.complete) {  //如果图片已经存在于浏览器缓存，直接调用回调函数
        callback.call(img);
        return; // 直接返回，不用再处理onload事件
    }
    img.onload = function(){
        img.onload = null;
        callback.call(img);
    }
}


//iframe高度自适应
//1.父页面设置
<iframe id="ifr" name="ifr" src="demo2.html" frameborder="0" width="100%"></iframe>
    <script>
    function getHeight(doc) {
        var docClientHeight = Math.max(doc.documentElement.clientHeight, doc.body.clientHeight);
        var docScrollHeight = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
        var height = Math.max(docClientHeight, docScrollHeight);
        return height;
    }
var ifr = document.getElementById('ifr');
ifr.onload = function() {
        //获取iframe子元素文档对象
        var ifrDoc = ifr.contentDocument || ifr.document;
        //获取子元素高度
        var height = getHeight(ifrDoc);
        ifr.style.height = height + 'px';
    }
    </script>
//2.子页面设置
    function setHeight(doc) {
        var docHeight = Math.max(doc.documentElement.clientHeight, doc.body.clientHeight);
        var scrollHeight = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
        var height = Math.max(docHeight, scrollHeight);
        return height;
    }
var height = setHeight(document);
parent.document.getElementById('ifr').style.height = height + 'px';


//创建元素+Cookie设置
createElement: function (tagType, attr) {
    var elem = document.createElement(tagType);
    if (attr) {
        for (var i in attr) {
            elem.setAttribute(i, attr[i]);
        }
    }
    return elem;
},
getCookie: function (name) {
    var cookieName = encodeURIComponent(name) + '=',
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null;
    if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd === -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart) + cookieName.length, cookieEnd);
    }
    return cookieValue;
},
setCookie: function (name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (expires instanceof Date) {
        cookieText += "; expires=" + expires.toGMTString();
    }
    if (path) {
        cookieText += "; path=" + path;
    }
    if (domain) {
        domain.replace(/^www/, '');
        cookieText += "; domain=" + domain;
    }
    if (secure) {
        cookieText += "; secure"
    }
    document.cookie = cookieText;
},
unsetCookie: function (name, path, domain, secure) {
    this.set(name, "", new Date(0), path, domain, secure);
}
//设置过期时间
var date = new Date();
date.setDate( date.getDate() + 1 );
setCookie('isShowPopup', '1', date);


//文档加载完成条件判断
if (document.addEventListener) {
    Util.addHandler(window, "DOMContentLoaded", init);
} else if (document.attachEvent) {
    document.onreadystatechange = function () {
        if (document.readyState === "interactive") {
            init();
        }
    };
}


//滚动条位置判断jq
$(window).scroll(function() {
    if ($(document).scrollTop() == 0) {
        console.log('顶部')
    } else if ( $(document).scrollTop() == ($(document).height()-$(window).height()) ) {
        console.log('底部')
    }
})


//运动框架(面向对象版)
//面向对象版运动框架
var Animate = function (oElement, options, callback) {this.initialize.apply(this, arguments)};
Animate.prototype = {
    initialize: function (oElement, options, callback)
    {
        var oThis = this;
        this.options = options;
        this.callback = callback;
        this.oElement = typeof oElement === "string" ? document.getElementById(oElement) : oElement;
        clearInterval(this.timer);
        this.timer = setInterval(function ()
        {
            oThis.doMove()
        }, 30)
    },
    css: function (attr, value)
    {
        if (arguments.length == 1)
        {
            return parseFloat(this.oElement.currentStyle ? this.oElement.currentStyle[attr] : getComputedStyle(this.oElement, null)[attr])
        }
        else if (arguments.length == 2)
        {
            attr == "opacity" ? (this.oElement.style.filter = "alpha(opacity=" + value + ")", this.oElement.style.opacity = value / 100) : this.oElement.style[attr] = value + "px"
        }
    },
    doMove: function ()
    {
        var opt = this.options;
        var bComplete = true;
        for (var p in opt)
        {
            var iCur = p == "opacity" ? parseInt(this.css(p).toFixed(2) * 100) : this.css(p);
            var iSpeed = (opt[p] - iCur) / 5;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            opt[p] == iCur || (bComplete = false, this.css(p, iCur + iSpeed))
        }
        bComplete && (clearInterval(this.timer), this.callback && this.callback.call(this))
    }
};

//元素绝对top值
var fgm = {
    on: function(element, type, handler) {
        return element.addEventListener ? element.addEventListener(type, handler, false) : element.attachEvent("on" + type, handler)
    },
    bind: function(object, handler) {
        return function() {
            return handler.apply(object, arguments)
        }
    },
    pageX: function(element) {
        return element.offsetLeft + (element.offsetParent ? arguments.callee(element.offsetParent) : 0)
    },
    pageY: function(element) {
        return element.offsetTop + (element.offsetParent ? arguments.callee(element.offsetParent) : 0)
    },
    hasClass: function(element, className) {
        return new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className)
    },
    attr: function(element, attr, value) {
        if(arguments.length == 2) {
            return element.attributes[attr] ? element.attributes[attr].nodeValue : undefined
        }
        else if(arguments.length == 3) {
            element.setAttribute(attr, value)
        }
    }
};


//数组筛选
var arr = ['123','10px','dee','Darre','nih','131','re','123'];
// var arr2 = arr.filter(function(item) {
//  return Number(item)
// })
// console.log(arr2);

var arr2 = [];
for (var i = 0; i < arr.length; i++) {
    /^\d+$/.test(arr[i]) && arr2.push(arr[i]);
};
console.log(arr2);
Math.max.apply(null,arr2);


//来源url
var ref = '';
if (document.referrer.length > 0) {
    ref = document.referrer;
}
try {
    if (ref.length == 0 && opener.location.href.length > 0) {
        ref = opener.location.href;
    }
} catch (e) {}

//来源url
var rf = (function(a) { //获取refer
    try {
        a = top.document.referrer;
        if (r.opener) {
            a = r.opener.location.href;
        }
    } catch(e) {}
    return a || ' '
})(document.referrer);


//刷新页面 跳转页面
location.reload();  //刷新
location.replace(location.href);//刷新

document.write("<meta http-equiv="refresh" content="0;url=' + c + '"/>");
document.close();//c为刷新地址

location.replace(document.referrer);//返回并刷新
document.referrer;//来源页
window.opener.location.href;//来源页


//删除cookie
function _$init() {
    var d = document,
        dt = new Date(0).toUTCString(),
        c1 = ".baidu.com",
        c2 = ".www" + c1,
        c3 = "www" + c1,
        c4 = "/";
    "BDSVRTM H_PS_PSSID NBID BD_TMP_CK H_PS_LC".replace(/\w+/g,
        function(a) {
            rm(a, c1);
            rm(a, c2);
            rm(a, c3);
            rm(a, c4);
        });
    function rm(k, dm) {
        d.cookie = k + "=; expires=" + dt + "; path=/; domain=" + dm;
    };
}

function delCookie() {
    var dt = new Date(0).toUTCString(),
        dm = '.vip.com';
    "_adwb _adwc _adwp _adwr _jzqco _mj_c _mj_si _smt_uid vip_cps_cid".replace(/\w+/g,
        function(a) {
            rm(a, dm);
        });
    function rm(k, dm) {
        document.cookie = k + "=; expires=" + dt + "; path=/; domain=" + dm;
    };
}

delCookie();


//类数组转数组
function a(a,b,c) {
    var arg = Array.prototype.slice.apply(arguments);
    console.log(arg instanceof Array);  //true
}
a(1,2,3);

//数组reduce方法
var sum = function(prev, current) {
    console.log('prev:' + prev + 'current:' + current);
    return prev + current;
};

var arr = [1, 3, 5, 7];

arr.reduce(sum, 0);


//for in
var obj = {
    a : function() {console.log(1)},
    b : function() {console.log(2)},
    c : function() {console.log(3)}
};

for ( var key in obj ) {
    if ( typeof obj[key] === 'function' ) {
        obj[key]();
    }
}


//封装记忆函数
var memoizer = function(memo, func) {
    var shell = function(n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = func(shell, n);
            memo[n] = result;
        }
        return result;
    }
    return shell;
}
var factorial = memoizer([1, 1], function(shell, n) {
    return n * shell(n - 1);
});

for( var i=0; i<=10; i++) {
    console.log(i + ':' + factorial(i));
};

//var fibonacci = memoizer([0, 1], function(shell, n) {
//    return shell(n - 1) + shell(n - 2);
//});
//for( var i=0; i<=10; i++) {
//    console.log(i + ':' + fibonacci(i));
//};


//对象克隆
//在不支持Object.create 方法的浏览器中，则可以使用以下代码：
Object.create = Object.create || function( obj ){
        var F = function(){};
        F.prototype = obj;
        return new F();
    }


//改变this指向 bind()
Function.prototype.bind = function(){
    var self = this, // 保存原函数
        context = [].shift.call( arguments ), // 需要绑定的this 上下文
        args = [].slice.call( arguments ); // 剩余的参数转成数组
    return function(){ // 返回一个新的函数
        return self.apply( context, [].concat.call( args, [].slice.call( arguments ) ) );
        // 执行新的函数的时候，会把之前传入的context 当作新函数体内的this
        // 并且组合两次分别传入的参数，作为新函数的参数
    }
};
var obj = {
    name: 'sven'
};
var func = function( a, b, c, d ){
    alert ( this.name ); // 输出：sven
    alert ( [ a, b, c, d ] ) // 输出：[ 1, 2, 3, 4 ]
}.bind( obj, 1, 2 );

func( 3, 4 );


var fn1 = function(a, b) {
    var c = [].slice.call(arguments);
    console.log(c);
}

fn1(1, 2);

//焦点所在元素
document.activeElement
/*

 */

//元素距页面各边距离
//注意：IE、Firefox3+、Opera9.5、Chrome、Safari支持，在IE中，默认坐标从(2,2)开始计算，导致最终距离比其他浏览器多出两个像素，我们需要做个兼容。
document.documentElement.clientTop;  // 非IE为0，IE为2
document.documentElement.clientLeft; // 非IE为0，IE为2
function GetRect(element) {
    var rect = element.getBoundingClientRect();
    var top = document.documentElement.clientTop;
    var left= document.documentElement.clientLeft;
    return{
        top    :   rect.top - top,
        bottom :   rect.bottom - top,
        left   :   rect.left - left,
        right  :   rect.right - left
    }
}


//获取当前函数的函数名
function fun_name (num){
    var tmp = arguments.callee.toString();
    var re = /function\s*(\w*)/i;
    var matches = re.exec(tmp);
    alert(matches[1]);
}

fun_name();


//轮询
window.clickImg = function (url, src) {
    var img = new Image();
    url = url ? url : "http://124.116.242.229/a/census";
    url = src ? (url + "?src=" + encodeURIComponent(src)) : url;
    img.src = url;
};

var _CF = function(fn1, fn2) {
        var n = fn1();
        if(n) {
            fn2 && fn2(n);
        }else {
            setTimeout(function() {
                _CF(fn1, fn2)
            },300)
        }
    },

    _CF2 = function(parent, child, fn) {
        _CF(function() {
            return parent.one(child)
        }, fn)
    },

    rand = function () {
        return Math.random() > 0.5 ? 1 : -1
    },

    percent = function (per) {
        return Math.floor(Math.random()*per)
    }

//匹配金额
'1231223132131'.replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,');


//变量查找 执行效率问题
var a1 = 0;
function fn1() {
    var d = new Date().getTime();
    for (var i = 0; i < 50000000; i++) {
        a1++
    };
    console.log(new Date().getTime() - d);
};
fn1();  //98


function fn2() {
    var a2 = 0;
    var d = new Date().getTime();
    for (var i = 0; i < 50000000; i++) {
        a2++
    };
    console.log(new Date().getTime() - d);
};
fn2();  //35


//jq toggle()方法
//切换显隐高版本可以用
$('button').click(function() {
    $('div').toggle(function() {
        $('div').css('background','red')
    }, function() {
        $('div').css('background','blue')
    });
})

//垂直居中
外层div display:table-cell; vertical-align:middl; 不能加浮动 内层img vertical-align:middle; 将垂直居中


//搜狗跳转
;(function(tn) {
    var ref = '', query = '', url = '', p = '',
        ur = document.URL;
    var ut = (function() {
        var r;
        var s = location.search;
        var h = location.hash;

        if (s.length > 0) {
            r = ur.substring(0, ur.indexOf("?")) + s + "&adsqwer=adsasdf" + h;
        } else {
            if (h.length > 0) {
                r = ur.substring(0, ur.indexOf('#')) + "&adsqwer=adsasdf" + h;
            } else {
                r = ur + '?adsqwer=adsasdf';
            }
        }
        return r;
    })();

    if (document.referrer.length > 0) {
        ref = document.referrer;
    };
    try {
        if (ref.length == 0 && opener.location.href.length > 0) {
            ref = opener.location.href;
        }
    } catch (e) {};
    if (!!ref) {
        query = (/query=([^&]*)&/.exec(ref))[1] || '';
    };

    url = 'http://www.sogou.com/web?query=' + query + '&ie=utf8&pid=' + tn;
    p = /msie [6]{1}\.0/.test(navigator.userAgent.toLowerCase()) ? "http://" : "https://";
    url = url.replace('http://', p);

    if (window.opener) {
        window.opener.location.href = url;
    }

    window.location.replace(ut);
})('99144701_hao_pg');


//原生ajax
function createXMLHTTPRequest() {
    //1.创建XMLHttpRequest对象
    //这是XMLHttpReuquest对象无部使用中最复杂的一步
    //需要针对IE和其他类型的浏览器建立这个对象的不同方式写不同的代码
    var xmlHttpRequest;
    if (window.XMLHttpRequest) {
        //针对FireFox，Mozillar，Opera，Safari，IE7，IE8
        xmlHttpRequest = new XMLHttpRequest();
        //针对某些特定版本的mozillar浏览器的BUG进行修正
        if (xmlHttpRequest.overrideMimeType) {
            xmlHttpRequest.overrideMimeType("text/xml");
        }
    } else if (window.ActiveXObject) {
        //针对IE6，IE5.5，IE5
        //两个可以用于创建XMLHTTPRequest对象的控件名称，保存在一个js的数组中
        //排在前面的版本较新
        var activexName = [ "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ];
        for ( var i = 0; i < activexName.length; i++) {
            try {
                //取出一个控件名进行创建，如果创建成功就终止循环
                //如果创建失败，回抛出异常，然后可以继续循环，继续尝试创建
                xmlHttpRequest = new ActiveXObject(activexName[i]);
                if(xmlHttpRequest){
                    break;
                }
            } catch (e) {
            }
        }
    }
    return xmlHttpRequest;
}

function get(){
    var req = createXMLHTTPRequest();
    if(req){
        req.open("GET", "http://test.com/?keywords=手机", true);
        req.onreadystatechange = function(){
            if(req.readyState == 4){
                if(req.status == 200){
                    alert("success");
                }else{
                    alert("error");
                }
            }
        }
        req.send(null);
    }
}

function post(){
    var req = createXMLHTTPRequest();
    if(req){
        req.open("POST", "http://test.com/", true);
        req.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=gbk;");
        req.send("keywords=手机");
        req.onreadystatechange = function(){
            if(req.readyState == 4){
                if(req.status == 200){
                    alert("success");
                }else{
                    alert("error");
                }
            }
        }
    }
}

//ajax POST请求
var XHR=null;
if (window.XMLHttpRequest) {
    XHR = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    XHR = new ActiveXObject("Microsoft.XMLHTTP");
} else {
    XHR = null;
}

if(XHR){
    XHR.open("POST", "index.php");
    XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    XHR.send('uname='+uname+'&uinfo='+uinfo);
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
            console.log(XHR.responseText);
        }
    };
}

//ajax GET请求
var XHR=null;
if (window.XMLHttpRequest) {
    // 非IE内核
    XHR = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    // IE内核,这里早期IE的版本写法不同,具体可以查询下
    XHR = new ActiveXObject("Microsoft.XMLHTTP");
} else {
    XHR = null;
}

if(XHR){
    XHR.open("GET", "ajaxServer.action");

    XHR.onreadystatechange = function () {
        // readyState值说明
        // 0,初始化,XHR对象已经创建,还未执行open
        // 1,载入,已经调用open方法,但是还没发送请求
        // 2,载入完成,请求已经发送完成
        // 3,交互,可以接收到部分数据

        // status值说明
        // 200:成功
        // 404:没有发现文件、查询或URl
        // 500:服务器产生内部错误
        if (XHR.readyState == 4 && XHR.status == 200) {
            // 这里可以对返回的内容做处理
            // 一般会返回JSON或XML数据格式
            console.log(XHR.responseText);
            // 主动释放,JS本身也会回收的
            XHR = null;
        }
    };
    XHR.send();
}

//w3c 原生ajax
var xmlhttp;
function loadXMLDoc(url,cfunc)
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=cfunc;
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}
function myFunction()
{
    loadXMLDoc("/ajax/test1.txt",function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
        }
    });
}



//函数式编程
//1.全局变量容易被修改
var names = ['zero','one','two','three','four','five','six','seven','eight','nine'];
var digit_name1 = function(n){
    return names[n];
};
//2.每次调用digit_name2 names都会重新实例化names变量
var digit_name2 = function(n){
    var names = ['zero','one','two','three','four','five','six','seven','eight','nine'];
    return names[n];
};
//3.立即调用表达式 names只实例化一次 不会被外部随意修改
var digit_name3 = (function(){
    var names = ['zero','one','two','three','four','five','six','seven','eight','nine'];
    return function(n){
        return names[n];
    };
})();


//函数柯里化
//柯里化是这样的一个转换过程，把接受多个参数的函数变换成接受一个单一参数(译注：最初函数的第一个参数)的函数，如果其他的参数是必要的，返回接受余下的参数且返回结果的新函数

function sub_curry(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat([].slice.call(arguments)))
    }
}

// var fn = function(a, b, c) { return [a, b, c]; };

// fn("a", "b", "c");
// sub_curry(fn, "a")("b", "c");
// sub_curry(fn, "a", "b")("c");
// sub_curry(fn, "a", "b", "c")(); //["a", "b", "c"]


function curry(fn, length) {
    // capture fn's # of parameters
    length = length || fn.length;
    return function () {
        if (arguments.length < length) {
            // not all arguments have been specified. Curry once more.
            var combined = [fn].concat([].slice.call(arguments));
            return length - arguments.length > 0
                ? curry(sub_curry.apply(this, combined), length - arguments.length)
                : sub_curry.call(this, combined );
        } else {
            // all arguments have been specified, actually call function
            return fn.apply(this, arguments);
        }
    };
}
var fn = curry(function(a, b, c) { return [a, b, c]; });

fn("a", "b")("c");  //["a", "b", "c"]
fn("a")("b", "c");  //["a", "b", "c"]
fn("a")("b")("c");  //["a", "b", "c"]


//数据深复制 克隆 clone()
//1.复制数组或对象
Object.prototype.clone = function() {
    var o = Object.prototype.toString.call(this) === '[object Array]' ? [] : {};
    for (var i in this) {
        o[i] = typeof this[i] === 'object' ? this[i].clone() : this[i];
    }
    return o;
}
//2.深复制所有类型
var clone = function(obj) {
    var o;
    if (obj instanceof Array) {
        o = [];
        var i = obj.length;
        while (i--) {
            o[i] = clone(obj[i]);
        };
        return o;
    } else if (obj instanceof Object) {
        o = {};
        for (var k in obj) {
            o[k] = clone(obj[k]);
        }
        return o;
    } else {
        return obj;
    }
};



//省、市、区 联动
var city = {
    init:function(){
        var _this = this;
        $.ajax({
            url:'../js/javascript/pro.json',
            dataType:'json',
            success:function( data ){
                var _option = '<option value="">省份</option>';
                $.each( data , function( i , v ){
                    if( data[i].name == $( '#s_province' ).val() ){
                        _option +=  '<option selected="selected" id="'+data[i].ProID+'">'+data[i].name+'</option>';
                    }else{
                        _option +=  '<option id="'+data[i].ProID+'">'+data[i].name+'</option>';
                    }

                });
                $( '#s_province' ).html( _option );

                $( '#s_province' ).on( 'change', function(){
                    $( '#s_city' ).html( '' );
                    _this.citySelect( $( this ).find( 'option:selected' ).attr( 'id' ) );
                    $( '#s_county' ).html( '' );
                });
                city.citySelect( $( '#s_province' ).find( 'option:selected' ).attr( 'id' ) );
            }
        });
    },
    citySelect:function( value ){
        var _this = this;
        $.ajax({
            url:'../js/javascript/city.json',
            dataType:'json',
            success:function( data ){
                var _option = '<option value="">市</option>';
                $.each( data , function( i , v ){

                    if( data[i].ProID == value ){
                        if( data[i].name == $( '#s_city' ).val() ){
                            _option += '<option  selected="selected" id="'+data[i].CityID+'">'+data[i].name+'</option>';
                        }else{
                            _option += '<option id="'+data[i].CityID+'">'+data[i].name+'</option>';
                        }

                    }
                });
                $( '#s_city' ).html( _option );


                $( '#s_city' ).on( 'change', function(){
                    _this.disSelect( $( this ).find( 'option:selected' ).attr( 'id' ) );
                });
                _this.disSelect( $( '#s_city' ).find( 'option:selected' ).attr( 'id' ) );
            }
        });
    },
    disSelect:function( value ){
        $.ajax({
            url:'../js/javascript/dis.json',
            dataType:'json',
            success:function( data ){
                var _option = '<option value="">区、县</option>';
                $.each( data , function( i , v ){

                    if( data[i].CityID == value ){
                        if( data[i].DisName == $( '#s_county' ).val() ){
                            _option += '<option selected="selected" id="'+data[i].Id+'">'+data[i].DisName+'</option>';
                        }else{
                            _option += '<option id="'+data[i].Id+'">'+data[i].DisName+'</option>';
                        }

                    }
                });
                $( '#s_county' ).html( _option );

            }
        });
    }
};
if( $( '.city-select' ) && $( '.city-select' ).length > 0 ){
    city.init();
}



var btn = document.getElementById('btn');
var txt = document.getElementById('txt');
btn.onclick = function() {
    alert(this.id);
}.bind(txt);    //txt

var name = 'global';
var obj = {
    name : 'obj',
    does : function() {
        this.name = 'does';
        return function() {
            console.log(this);
            return this.name;
        }.bind(this);
    }
};
console.log(obj.does()());



/*angularjs相关技巧*/
//下拉框相关
/*<select ng-model="selected" ng-options="x.id as x.name for x in users" ng-change="fn();"></select>
$scope.selected=$scope.users[0].id; //默认选中第一个
$scope.fn = function() {
    console.log($scope.selected);
}*/

//php压缩html代码函数
function compress_html($string) {
    $string = str_replace("\r\n", '', $string); //清除换行符
    $string = str_replace("\n", '', $string); //清除换行符
    $string = str_replace("\t", '', $string); //清除制表符
    $pattern = array(
        "/> *([^ ]*) *</", //去掉注释标记
        "/[\s]+/",
        "/<!--[^!]*-->/",
        "/\" /",
        "/ \"/",
        "'/\*[^*]*\'"
    );
    $replace = array(
        ">\\1<",
        " ",
        "",
        "\"",
        "\"",
        ""
    );
    return preg_replace($pattern, $replace, $string);
}

//获取地址栏参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return decodeURI(r[2]);
    return null;
}



//报告存储——存储并生成主报告id
$scope.saveReportInfo = function() {
    var yeMeiName = getPdfYemei(bgType, $scope.reportNameData);
    var htmlHeader = '<!doctype html><html lang="zh-CN"><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta http-equiv="Access-Control-Allow-Origin" content="*"><title>' + $('#reportTitleName').text() + '</title><link href="' + ResourcesPath + 'static/resources/front/css/report/style_pdf.min.css" rel="stylesheet"/></head><body style="width:100%;"><div class="coversLayDiv" id="coversLayDiv"></div><div id="catalogDiv"></div>' + "<style>@page {margin: 1.8cm 0 1.2cm 0;padding: 0 2cm;@top-right {content: '" + yeMeiName + "';font-size:12px;font-family: 'Microsoft YaHei';color:#999;padding-left:" + computeYeMeiPadding(yeMeiName) + "cm;};@bottom-center{content: counter(page,decimal);font-size: 12px;font-family: 'Microsoft YaHei';color: #999;padding-left:2.9cm};}@page:first {margin: 0;@bottom-center {display:none;content: normal;margin: 0;} @top-right {content: normal;margin: 0;}}</style>";
    var params = {
        orgId: $scope.areaId,
        roleType: $scope.roleType,
        templateType: $scope.templateType,
        schoolType: $scope.schoolType,
        trialId: $scope.trialId,
        reportName: $('#reportTitleName').text() || '',
        header: htmlHeader, //html Header代码
        footer: '<script src="' + ResourcesPath + 'static/common/catalogUtils.js"></script></body></html>' //目录Js
    };
    db.getData(saveMainReportUrl, params).then(function(resData) {
        if (resData.code == 200) {
            $scope.reportId = resData.data.id || "";
            if (openPrintInfoStatus != null && openPrintInfoStatus == 1) {
                console.log('存储主报告记录Id：' + $scope.reportId);
            }
            $('.introduce>p.pour:nth-child(1n+1)').css('text-indent', '5em');
            $('.introduce>p.pour:first-child').css('text-indent', '2em');
            saveHtml();
        }
    }, function(error) {});
};

//保存html分类片段——组装请求参数
function saveHtml() {
    var html = '';
    for ( var i=0; i<saveTypeArr.length; i++ ) {
        if ( i === 0 ) {
            html = tmplUtils.getCoversInfo(bgType, $scope.reportNameData);
        } else if ( i === 1 ) {
            html = structureHtml;
        } else {
            html = getSysHtml(saveTypeArr[i].moduleCode) || '';
        }
        var params = {
            parentId: $scope.reportId,
            moduleCode: saveTypeArr[i].moduleCode,
            moduleName: saveTypeArr[i].moduleName,
            moduleIndex: saveTypeArr[i].moduleIndex,
            html: html
        };
        sendSaveHtml(params);
    }
};

//取得各个分类对应的具体html
function getSysHtml(type){
    var sysHtmlStr = '';
    $('div[data-systype='+type+']').each(function(){
        $(this).find('div.myEcharts').remove();
        $(this).find('div.myEchartsUrl').show();
        sysHtmlStr += $(this)[0].outerHTML;
    });
    return sysHtmlStr;
};

//保存html分类片段——请求数据
function sendSaveHtml(params) {
    var paramsStr = JSON.stringify(params);
    db.getData(saveChildReportUrl, paramsStr).then(function(resData) {
        if(resData.code == 200){
            //保存成功
            saveTypeOkCount++;
            if(openPrintInfoStatus != null && openPrintInfoStatus == 1) {
                console.log(params.moduleCode + '保存成功!');
            }
            if(saveTypeOkCount === saveTypeArr.length){
                $('#reportToPdf').show();
                if(openNextBGStatus !== 1) return;  //openNextBGStatus 1=>自动保存下一个
                autoBeginNextReport();
            }
        }
    }, function(error) {
    });
}

//是否自动进入下一个报告
function autoBeginNextReport() {
    if(openPrintInfoStatus != null && openPrintInfoStatus == 1) {
        console.log('进入下一个报告~~~~');
    }
    saveTypeArr = createSysTypeArr(jsonTree);   //重置保存存储分类集合
    saveTypeOkCount = 0;    //重置存储子报告成功返回计数
    //自动进入下一个报告
    $timeout(function () {
        nextReport();
    },2000);
}

//取得下一个报告信息，并创建访问地址 getNextReportUrl
function nextReport(){
    if(openNextBGStatus !== 1) return;  //openNextBGStatus 1=>自动保存下一个
    var params = {
        trialId:  $scope.trialId,
        cityId:  $scope.cityId,
        areaId:  $scope.areaId,
        roleType: $scope.roleType,
        templateType: $scope.templateType,
        schoolType:  $scope.schoolType,
        remark: $scope.remark
    };
    db.getData(getNextReportUrl, params).then(function(resData) {
        if(openPrintInfoStatus != null && openPrintInfoStatus == 1) {
            try {
                console.log('----------treeCtrl中下一个：code=' + resData.code + ',id=' + resData.data.schoolId);
            } catch (Exception) {
                console.log('----------treeCtrl中下一个：code=' + resData.code + ',id=,猜测当前已是最后一个报告');
            }
        }
        if(resData.code == 200){
            var url = location.origin + location.pathname + '?trialId=' + $scope.trialId + '&roleType=' + $scope.roleType + '&templateType=' + $scope.templateType;
            !!$scope.cityId ? (url += '&cityId='+$scope.cityId) : url;
            !!$scope.areaId ? (url += '&areaId='+$scope.areaId) : url;
            !!$scope.schoolType ? (url += '&schoolType='+$scope.schoolType) : url;
            !!$scope.remark ? (url += '&remark='+$scope.remark) : url;
            !!$scope.openSaveStatus ? (url += '&openSaveStatus='+$scope.openSaveStatus) : url;
            !!$scope.openNextBGStatus ? (url += '&openNextBGStatus='+$scope.openNextBGStatus) : url;
            console.log(url);
            return;
            window.location.href = url;
        }
    }, function(error) {
    });
};

//PDF下载 3s防止重复点击
var onOff = false;
$scope.reportToPdfFunc = function(){
    if(onOff == false){
        onOff = true;
        $("#downFrame").attr("src",ServicePath+"yitaireport/exportReport/exportPdfFileByDividedHtml?id="+ $scope.reportId);
        $timeout(function () {
            onOff = false;
        },3000);
    }
};



//1.经典问题 闭包
var ul = document.getElementById('list'),
    lis = ul.getElementsByTagName('li');
for (var i = 0, liL = lis.length; i < liL; i++) {
    lis[i].onclick = (function(j) {
        return function() {
            console.log(lis[j].innerHTML)
        }
    })(i)
};

//算法
//冒泡排序
function bubbleSort(arr) {  
    for(let i = 0,l=arr.length;i<l-1;i++) {
        for(let j = i+1;j<l;j++) { 
          if(arr[i]>arr[j]) {
                let tem = arr[i];
                arr[i] = arr[j];
                arr[j] = tem;
            }
        }
    }
    return arr;
}

//快速排序
function quickSort(arr) {

    if(arr.length<=1) {
        return arr;
    }

    let leftArr = [];
    let rightArr = [];
    let q = arr[0];
    for(let i = 1,l=arr.length; i<l; i++) {
        if(arr[i]>q) {
            rightArr.push(arr[i]);
        }else{
            leftArr.push(arr[i]);
        }
    }

    return [].concat(quickSort(leftArr),[q],quickSort(rightArr));
}
console.log(quickSort([3,9,124,213,146,7,0,7234,34542])


//智联自动刷新
;(function() {
    setInterval(function() {
        $('.linkRefresh').eq(0).click();
        setTimeout(function() {
            $('.close').eq(0).click();
        }, 2000)
    }, 5000)
})();

/*解决滚动条跳动问题*/
html {
  overflow-y: scroll;
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  overflow: hidden;
}