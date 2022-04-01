// import { AsyncDependenciesBlock } from "webpack";

import { result, values } from "lodash";

// interface IFruit {
//   color: string,
//   amount: number,
// }

// interface IKind extends IFruit {
//   kind: string;
// }



// abstract class IFruitInfo {
//   color: string;
//   amount: number;
//   price: number;

//   constructor(attr: IFruit) {
//     this.amount = attr.amount;
//     this.color = attr.color;
//   }
  
//   setPrice(price: number) {
//     this.price = price;
//   }

//   calFruit(): number {
//     return this.amount * this.price;
//   };
// }

// class Apple extends IFruitInfo {
//   applePrice : number = 1000;
//   constructor(attr: IFruit){
//     super(attr);
//     this.setPrice(this.applePrice);
//   }
// }

// class PriceRatioByColor {
//   color: string;
//   kind: string; 
  
//   constructor(attr: IKind) {
//     this.color = attr.color;
//     this.kind = attr.kind;
//   } 
//   getPriceRatioByColor(): number {
//     if(this.kind === 'apple') {
//       if (this.color === 'red') {
//         return 1;
//       } else if (this.color === 'orange') {
//         return 1.5;
//       } else if (this.color === 'yellow') {
//         return 2;
//       } 
//     }
//     if(this.kind === 'pear') {
//       if (this.color === 'red') {
//         return 1;
//       } else if (this.color === 'orange') {
//         return 1.5;
//       } else if (this.color === 'yellow') {
//         return 2;
//       } 
//     }
//     if(this.kind === 'grape') {
//       if (this.color === 'red') {
//         return 1;
//       } else if (this.color === 'orange') {
//         return 1.5;
//       } else if (this.color === 'yellow') {
//         return 2;
//       } 
//     }
//   }
// }

//  해보기 
//  color 마다 value 값을 가지는 오브젝트를 추가하고 color 값으로 value값을 찾는 프로그램을 만드세요.

//  오브젝트 배열
// 클래서 배열

class A {
  color: string;
  price: number;
  constructor(color: string, price: number){
    this.color = color;
    this.price = price;
  }
}

const arr2 =[
  new A('red', 1000),
  new A('orange', 2000),
  new A('yellow', 3000),
]


let aa = arr2.find((element: any) => {
  return element = 'red';
})



console.log(aa);

const arr = [
  {color: 'red', price : 1000}, 
  {color: 'orange', price : 2000},
  {color: 'yellow', price: 3000}
];

function color(element: any)  {
  if(element.color === 'red')  {
    return true;
  }
}

const aaa = arr.find(color);
// console.log(aaa);


// 해보기
// 숫자 10개받고 넣어서 10개중에 찾는 프로그램을 만드세요

// 방번호리스트와 해당 방번호를 받아서 해당 몇번째에 있는지를 출력하는 프로그램을 만드세요.
// const findNum = (list: number[]) => {
//    const a: number[] = list;
//    let result1: number = 0;
//    let result2: number = 0;
  
//   //list.push();
//   // console.log(a);
//   // const b = a.find((element) => {
//   //   return element == number;
//   // });
  
//   // const msg =  b === undefined ? '못' : '찾';
//   // const mmm = list.findIndex((element) => element === number);

// //   for(let i = 0; i<=list.length-1; i++) {
// //     result += list[i];
// //   }
// //   console.log(result);
// // }

//   a.map((element) => {
//     result1 += element;
//   })

//   a.forEach((element) => {
//     result2 += element;
//   })

//   console.log(result1);
//   console.log(result2);
// }

// // 배열이긴 OBJECT 배열  color: string, price: number 

// // 값리스트 , 값
// console.log(findNum([1,2,3]));
// console.log(findNum([1,2,3,5,65,6,7,8]));


// class Pear extends IFruitInfo {
//   pearPrice : number = 2000;

//   constructor(attr: IFruit){
//     super(attr);
//   }
// }

// class Grape extends IFruitInfo { 
//   grapePrice : number = 3000;

//   constructor(attr: IFruit){
//     super(attr);
//   }
// }

// class FruitFactory {
//   fruitInfo: IFruitInfo;

//   constructor(info: IKind) {
//     if(info.kind == 'apple') {
//       this.fruitInfo = new Apple(info);
//     }else if(info.kind == 'pear') {
//       this.fruitInfo = new Pear(info);
//     }else if(info.kind == 'grape') {
//       this.fruitInfo = new Grape(info);
//     }
//   }

//   calFruit(): number {
//     return this.fruitInfo.calFruit();
//   }
// }

// const a = new Apple({color:'red', amount:1});
// const b = new Apple({color:'orange', amount:1});
// const c = new Apple({color:'yellow', amount:1});
// const d = new Pear({color:'red', amount:1});
// const e = new Pear({color:'orange', amount:1});
// const f = new Pear({color:'yellow', amount:1});
// const g = new Grape({color:'red', amount:1});
// const h = new Grape({color:'orange', amount:1});
// const i = new Grape({color:'yellow', amount:1});



// console.log(a.calFruit());
// console.log(b.calFruit());
// console.log(c.calFruit());
// console.log(d.calFruit());
// console.log(e.calFruit());
// console.log(f.calFruit());
// console.log(g.calFruit());
// console.log(h.calFruit());
// console.log(i.calFruit());