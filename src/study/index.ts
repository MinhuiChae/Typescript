interface Window {
  shapeModule : any
}

interface IWidthHeight {
  width: number,
  height: number
}

interface IShapeWidthHeight extends IWidthHeight{
  shape: string;
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

class SetCircleWeight extends Shape {
  constructor(info: IWidthHeight) {
    super(info);
  }

  getWeight(): number {
    return this.width * this.width * 3.14;
  }
}

class SetTriangleWeight extends Shape {
  constructor(info: IWidthHeight) {
    super(info);
  }

  getWeight(): number {
    return (this.width * this.height)/2;
  }
}

class SetSquareWeight extends Shape {

  constructor(info: IWidthHeight) {
    super(info);
  }
  getWeight(): number {
    return this.width * this.height;
  }
}

class shapeModuleFactory {
  shapeModuleInstance : Shape;

  constructor(info: IShapeWidthHeight) {
    if(info.shape == 'circle') {
      this.shapeModuleInstance = new SetCircleWeight(info);
    }else if(info.shape == 'triangle') {
      this.shapeModuleInstance = new SetTriangleWeight(info);
    }if(info.shape == 'square') {
      this.shapeModuleInstance = new SetSquareWeight(info);
    }
  }

  getWeight(): number{
    return this.shapeModuleInstance.getWeight();
  }
}

((w: Window) => {
  const shapeModuleController = {
    getWeight: (info: IShapeWidthHeight) => {
      return new shapeModuleFactory(info).getWeight();
    }
  }
  
  w.shapeModule = shapeModuleController;

})(window)

