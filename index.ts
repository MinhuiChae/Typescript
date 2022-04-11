import {Movie, Screening, SequenceCondition, Money, PeriodCondition, PercenDiscountPolicy, AmountDiscountPolicy, Customer, Reservation} from './src/chapter2/index';


const movieFee = new Money(10000);
const discountMoney = movieFee.wons(800);
const customer = new Customer();

const sequenceCondition = new SequenceCondition(5);
const periodCondition = new PeriodCondition({day: "목요일"}, {startTime:10, endTime:13});

//몇프로를 할인할건지
// 조건,, 중복할꺼냐, 한번만할꺼냐.. 




const amountDiscountPolicy = new AmountDiscountPolicy(discountMoney, [ periodCondition, sequenceCondition], true, 0.1);

// const percentDiscountPolicy = new PercenDiscountPolicy(0.2, [sequenceCondition, periodCondition]);

const movie = new Movie("아바타", 120, movieFee, amountDiscountPolicy); 



//1.5번째 순번인 아바타를 구매하는 2명의 고객. 5번째 고객이라 순번조건 할인이 들어감. 할인정책은 할인액이 800원인 금액 할인 정책이다.
const screeing = new Screening(movie, 5, 12, "목요일");
console.log(screeing.reserve(customer, 1));
//기존금액: 20000원, 할인 후 금액: 18400원












