import {Movie, Screening, DiscountPolicy, SequenceCondition, DiscountCondition, Money} from './src/chapter2/index';

const a = new Money(10);
let c: DiscountCondition;
const b = new SequenceCondition(5);



// const d = new Movie("라이언킹", 11, a, e);

const test:number[] = [1,2,3,4,5,6];

const s = test.map((a) => {
  if(a === 4) {
    return a;
  }else{
    return -1;
  }
});

console.log(test);
console.log(s);




