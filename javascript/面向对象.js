 //原型继承 有问题
function SuperType() {
    this.colors = ['red','yellow','blue'];
}
function SubType() {
}
//继承后 超类型实例等于子类型原型 超类型原本的实例属性相对于子类型而言就成了原型属性
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
var p1 = new SubType();
p1.colors.push('grey');
console.log(p1.colors); //["red", "yellow", "blue", "grey", exist: function] 
var p2 = new SubType();
console.log(p2.colors);

//原型 + 借用构造函数组合继承
function Super() {
    this.colors = ['red','yellow','blue'];
}
Super.prototype.showColors = function() {
    console.log(this.colors)
}
function Sub() {
    Super.call(this);   //借用构造函数实现私有属性
}
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;
var s1 = new Sub();
s1.colors.push('grey');
s1.showColors();
var s2 = new Sub();
s2.showColors();