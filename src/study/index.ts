interface Window {
  shapeModule : any;
}

interface IWidthHeight {
  width: number,
  height: number
}

interface IShapeWidthHeight extends IWidthHeight{
  shape: string
}

abstract class Shape {
  width: number;
  height: number;

  constructor(info: IShapeWidthHeight) {
    this.width = info.width;
    this.height = info.height;
  }

  abstract getWeight(): number;
} 

class getCircleWeight extends Shape{
  constructor(info: IShapeWidthHeight) {
    super(info);
  }

  getWeight(): number {
    return this.width * this.width * 3.14;
  }
}

class getTriangleWeight extends Shape{
  constructor(info: IShapeWidthHeight) {
    super(info);
  }

  getWeight(): number {
    return (this.width * this.height)/2;
  }
}

class getSquareWeight extends Shape{
  constructor(info: IShapeWidthHeight) {
    super(info);
  }

  getWeight(): number {
    return this.width * this.height;
  }
}

// class ShapeModuleFactory {
//   shapeInfo : Shape | null = null;

//   constructor(info: IShapeWidthHeight) {
//     if(info.shape == 'circle') {
//       this.shapeInfo = new getCircleWeight(info);
//     }else if(info.shape == 'triangle') {
//       this.shapeInfo = new getTriangleWeight(info);
//     }else if(info.shape == 'square') {
//       this.shapeInfo = new getSquareWeight(info);
//     }
//   }

//   getWeight(): number {
//     return this.shapeInfo.getWeight();
//   }
// }

// ((w: Window) => {
//   const getShapeController = {
//     getWeight: (info: IShapeWidthHeight) => {
//       return new ShapeModuleFactory(info).getWeight();
//     }
//   }

//   w.shapeModule = getShapeController;
// })(window)


// import {Invitation,Ticket,Bag,Audience,TicketOffice} from '../chapter1';


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