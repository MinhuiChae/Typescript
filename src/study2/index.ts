
interface IFruit {
  color: string,
  amount: number,
}

interface IKind extends IFruit {
  kind: string;
}

abstract class IFruitInfo {
  color: string;
  amount: number;
  price: number;

  constructor(attr: IFruit) {
    this.amount = attr.amount;
    this.color = attr.color;
  }
  
  setPrice(price: number) {
    this.price = price;
  }

  abstract getPriceRatioByColor(): number;

  calFruit(): number {
    return this.amount * this.getPriceRatioByColor();
  };
}

class Apple extends IFruitInfo {
  applePrice : number = 1000;
  constructor(attr: IFruit){
    super(attr);
    this.setPrice(this.applePrice);
  }  

  getPriceRatioByColor(): number {
    if (this.color === 'red') {
      return 1;
    } else if (this.color === 'orange') {
      return 1.5;
    } else if (this.color === 'yellow') {
      return 2;
    } 
  }
}


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