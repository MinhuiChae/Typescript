"use strict";
// interface Window {
//   shapeModule: any;
// }
exports.__esModule = true;
// interface shapeModule {
//   shape: string,
//   width: number,
//   height: number
// }
// ((w: Window) => {
//   const m = {
//     getWeight: (info:shapeModule) => {
//       if(info.shape == 'circle') {
//         return info.width * info.width * 3.14;
//       }else if(info.shape == 'triangle') {
//         return (info.width * info.height)/2;
//       }else if(info.shape == 'square') {
//         return info.width * info.height;
//       }
//     }
//   }
//   w.shapeModule = m;
// })(window)
var chapter1_1 = require("../chapter1");
var a = new chapter1_1.Invitation();
console.log(a);
