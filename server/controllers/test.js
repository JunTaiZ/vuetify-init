let arr = [3, 4, 6, 3, 6]
for ([idx, value] of arr.entries()) {
  // console.log(`idx in arr: ${idx}, ${value}`)
}

const md5 = require('js-md5')
let code = md5.base64('89-')
console.log(code)
console.log(md5.base64)
// let date = new Date('2018-8-2');
// console.log(date.getTime());
// console.log(new Date().getTime())
let time = setTimeout(() => {

}, 2)
console.log(time, setTimeout(() => {

}, 2), setTimeout(() => {

}, 2))
console.log(clearTimeout())