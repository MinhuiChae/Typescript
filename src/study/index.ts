interface Window {
  shapeModule: any;
}

interface IWidthHeight {
  width: number,
  height?: number
} 

interface IShapeModule extends IWidthHeight {
  shape: string
}

abstract class Shape {
  width: number;
  height: number;
  constructor(info: IWidthHeight) {
    this.width = info.width;
    this.height = info.height;
  }

  abstract getWeight(): number;
}

class Circle extends Shape {  
  constructor(info: IWidthHeight) {
    super(info);
  }

  getWeight(): number {
    return this.width * 3.14;
  }
}

class Triangle extends Shape {
  constructor(info: IWidthHeight) {
    super(info);
  }

  getWeight(): number {
    return this.width * this.height / 2;
  }
}

class Square extends Shape {
  constructor(info: IWidthHeight) {
    super(info);
  }

  getWeight(): number {
    return this.width * this.height;
  }
}

class ShapeFactory {
  shapeInstance: Shape;
  constructor(info: IShapeModule) {
    if(info.shape == 'circle') {
      this.shapeInstance = new Circle(info);
    }else if(info.shape == 'triangle') {
      this.shapeInstance = new Triangle(info);
    }else if(info.shape == 'square') {
      this.shapeInstance = new Square(info);
    }
  }
  
  getWeight(): number {
    return this.shapeInstance.getWeight();
  }
}

((w: Window) => {
  const shapeModuleController = {
    getWeight: (info: IShapeModule) => {
      return new ShapeFactory(info).getWeight();
    }
  }

  w.shapeModule = shapeModuleController;
})(window)

// import {Invitation,Ticket,Bag,Audience,TicketOffice} from '../chapter1';

// const a = new Invitation(); 
// const b = new Ticket();
// const c = new Bag();
// const d = new Audience();
// const e = new TicketOffice();

