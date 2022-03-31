interface IFruitKind {
  kind: string;
}

interface IFruit {
  color: string,
  amount: number,
  price: number;
}

abstract class Fruit {
  color: string;
  amount: number;

  constructor(attr: IFruit) {
    this.color = attr.color;
    this.amount = attr.amount;
  }

  abstract calFruit(): number;
}

class Apple extends Fruit {
  price: number;

  constructor(attr: IFruit, price:number) {
    super(attr);
  }

  calFruit(): number {
    return this.amount * this.price;
  }
}

// class Pear extends Fruit {
  
//   constructor(attr: IFruit) {
//     super(attr);
//   }

//   calFruit(): number {
//     return this.amount * this.price;
//   }
// }

// class Grape extends Fruit {
  
//   constructor(attr: IFruit) {
//     super(attr);
//   }

//   calFruit(): number {
//     return this.amount * this.price;
//   }
// }