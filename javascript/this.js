//当函数作为对象的方法调用时，this指向该对象。在全局上下文（任何函数以外），this指向全局对象。
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};

console.log(o.f()); // logs 37