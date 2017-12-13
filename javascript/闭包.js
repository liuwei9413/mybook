/*
    闭包是一个函数及其词法环境的组合，函数和函数声明时词法作用域形成闭包。
    函数内部的函数称之为闭包，一般用来函数外访问函数内的变量。
 */

function outer () {
  var name = 'Jerry'
  function inner () {
    console.log(name)
  }
  return inner
}

var fn = outer()
fn() // Jerry

/*
    闭包比较有用的地方在于我们可以用它来实现数据封装
    如下，数据arrs的值只能通过fruits()的实例操作
*/
function Fruits() {
    var arrs = ['apple', 'balana', 'orange'];
    return {
        getArrs: function() { return arrs;},
        addArrs: function(item) { arrs.push(item);}
    }
}
var someFruit = Fruits();
console.log(someFruit.getArrs());
someFruit.addArrs('pear');
console.log(someFruit.getArrs());

/*
    闭包解决经典for循环问题
*/
// 这段代码执行的输出结果中，每次 i 都等于4.这是因为 setTimeout 方法执行的时候，循环早已运行结束。
var arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log(`The value ${arr[i]} is at index: ${i}`);   //The value undefined is at index: 4
  }, (i+1) * 1000);
} 

//我们可以通过立即执行函数 IIFE 来解决这个问题，它可以创建出独立的作用域来存储每次传入 i 的值
var arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(`The value ${arr[j]} is at index: ${j}`);
    }, j * 1000);
  })(i)
} 

// let 关键字来声明变量 i 也能够得到相同的结果
var arr = [10, 12, 15, 21];
for (let i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log(`The value ${arr[i]} is at index: ${i}`);
  }, (i) * 1000);
} 