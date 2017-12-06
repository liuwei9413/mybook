/*1.复制数组或对象*/
Object.prototype.clone = function() {
    var o = Object.prototype.toString.call(this) === '[object Array]' ? [] : {};
    for (var i in this) {
        o[i] = typeof this[i] === 'object' ? this[i].clone() : this[i];
    }
    return o;
}

/*2.深复制所有类型*/
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