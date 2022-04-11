import {Movie, Screening, SequenceCondition, Money, PeriodCondition, PercenDiscountPolicy, AmountDiscountPolicy, Customer, Reservation} from './src/chapter2/index';


const movieFee = new Money(10000);
const discountMoney = movieFee.wons(800);
const customer = new Customer();

const sequenceCondition1 = new SequenceCondition(5);
const periodCondition1 = new PeriodCondition({day: "목요일"}, {startTime:10, endTime:13});


const amountDiscountPolicy = new AmountDiscountPolicy(discountMoney, [sequenceCondition1, periodCondition1]);

const movie = new Movie("아바타", 120, movieFee, amountDiscountPolicy);



//1. 5번째 순번인 아바타를 구매하는 2명의 고객. 5번째 고객이라 순번조건 할인이 들어감. 할인정책은 할인액이 800원인 금액 할인 정책이다.
const firstScreening = new Screening(movie, 5, 12, "월요일");
console.log(firstScreening.reserve(customer, 2));
//기존금액: 20000원, 할인 후 금액: 18400원

//2. 목요일 11시에 아바타를 보러 온 한 명의 고객. 기간 조건 할인으로 안해 역시 800원의 할인이 들어간다.
const secondScreening = new Screening(movie, 6, 11, "목요일");
console.log(secondScreening.reserve(customer, 1));
//기존금액: 10000원, 할인 후 금액: 9200원












