/*函数和函数声明时词法作用域形成闭包。函数内部的函数称之为闭包，一般用来函数外访问函数内的变量。*/

function outer () {
  var name = 'Jerry'
  function inner () {
    console.log(name)
  }
  return inner
}

var fn = outer()
fn() // Jerry