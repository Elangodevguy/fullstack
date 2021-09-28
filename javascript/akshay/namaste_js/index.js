// 3 How js code is executed
// var n = 2;

// function square(x) {
//   return x * x;
// }

// var square2 = square(2);
// var square4 = square(4);

// 4 Hoisting
// debugger;
// var x = 5;
// aaa(x);
// function aaa() {
//   console.log(x);
//   function elango() {
//     console.log(x + x);
//   }
//   elango();
// }

// var aaab = () => {
//   console.log("arrow");
// };
// 5 How functions work in js
// debugger;
// var x = 10;
// var y = {
//   x: 200,
// };
// a();
// b();

// function a() {
//   console.log(this.x);
// }
// function b() {
//   var x = 1000;
//   console.log(x);
// }

// var binded = a.bind(y);
// binded();
