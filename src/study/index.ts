import { setWith } from 'lodash';
import {Invitation,Ticket,Bag,Audience,TicketOffice} from '../chapter1';

interface ICircle {
  width: number
}

class Circle {
  private Cwidth : ICircle;

  constructor(x:ICircle){
    this.Cwidth = x;
  }

  getCircle(): number {
    return this.Cwidth.width * this.Cwidth.width * 3.14;
  }
}

interface ISquare {
  width: number,
  height: number
}

class Square {
  private attrs : ISquare;

  constructor(attrs: ISquare){
    this.attrs = attrs;
  }

  getSquare(): number {
    return this.attrs.width * this.attrs.height;
  }
}

interface ITriangle {
  width: number,
  height: number
}

class Triangle {
  private attrs : ITriangle;

  constructor(attrs: ITriangle){
    this.attrs = attrs;
  }

  getTriangle(): number {
    return (this.attrs.width * this.attrs.height)/2;
  }
}

const t = Number(document.getElementById(".width"));
const t2 = Number(document.getElementById(".height"));

const c = new Circle({width:t});
const s = new Square({width:t,height:t2});
const ti = new Triangle({width:t,height:t2});

document.getElementById('.extend').innerText =String(c);
console.log(s.getSquare());
console.log(ti.getTriangle());

