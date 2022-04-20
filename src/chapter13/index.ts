class Rectangle {
  private x: number = 0;
  private y: number = 0;
  private width: number = 0;
  private height: number = 0;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getWidth(): number {
    return this.width;
  }

  setWidth(width: number): void {
    this.width = width;
  }
  getHeight(): number {
    return this.height;
  }

  setHeight(height: number): void  {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(x: number, y: number, size: number) {
    super(x,y,size,size);
  }

  setWidth(width: number): void {
    super.setWidth(width);
    super.setHeight(width);
  }

  setHeight(height: number): void {
    super.setWidth(height);
    super.setHeight(height);
  }
}

