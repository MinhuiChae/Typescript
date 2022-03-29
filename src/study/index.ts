import { setWith } from 'lodash';
import {Invitation,Ticket,Bag,Audience,TicketOffice} from '../chapter1';

// const a = new Invitation(); 
// const b = new Ticket();
// const c = new Bag();
// const d = new Audience();
// const e = new TicketOffice();

// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);
// console.log(e);

// interface Circle {
//   width : number;
// }

// class circle {
//   private attrs : Circle;
//   constructor(attrs: Circle) {
//     this.attrs = attrs;
//   }
//   getW() : number {
//     return (this.attrs.width * this.attrs.width) * 3.14;
//   }

//   setWidth(width:number){
//     this.attrs.width = width;
//   }
// }

// const x = 100;
// const t = new circle({width : x} as Circle);

// t.setWidth(50);

// console.log(t.getW());


interface ISquare {
  width : number;
}

class Square {
  private attrs : ISquare;

  constructor(attrs:ISquare){
    this.attrs = attrs;
  }

  getS() : number {
    return this.attrs.width * this.attrs.width;
  }

  setWidth(width:number) {
    this.attrs.width = width;
  }
}

let x = 10;

const s = new Square({width : x} as ISquare);
s.setWidth(5);
console.log(s.getS());