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

var textElement = <HTMLInputElement>document.getElementById('width');
var Helement = <HTMLInputElement>document.getElementById('height');
var Welement = <HTMLInputElement>document.getElementById('extend');

function CPlus():void {
  let t = Number(textElement.value);
  const c = new Circle({width:t});
  alert(c.getCircle());
}

function TPlus():void {
  let t = Number(textElement.value);
  let t2 = Number(Helement.value);
  const ti = new Triangle({width:t,height:t2});
  alert(ti.getTriangle());
}

function SPlus():void {
  let t = Number(textElement.value);
  let t2 = Number(Helement.value);
  const s = new Square({width:t,height:t2});
  alert(s.getSquare());
}

let btnc = document.querySelector('#circle');
btnc.addEventListener("click", (e:Event) => CPlus());
let btns = document.querySelector('#square');
btns.addEventListener("click", (e:Event) => SPlus());
let btnt = document.querySelector('#triangle');
btnt.addEventListener("click", (e:Event) => TPlus());



