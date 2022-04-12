import {Movie, Screening, SequenceCondition, Money, PeriodCondition, PercenDiscountPolicy, AmountDiscountPolicy, Customer, Reservation, TicketOffice} from './index';


const movieFee = new Money(10000);
const movieFee2 = new Money(10000);
const ticketOffice = new TicketOffice(new Money(0));
const discountMoney = movieFee.wons(800);
const customer1 = new Customer();
const customer2 = new Customer();

const sequenceCondition = new SequenceCondition(5);
const periodCondition = new PeriodCondition({day: "목요일"}, {startTime:10, endTime:13});

//몇프로를 할인할건지
// 조건,, 중복할꺼냐, 한번만할꺼냐.. 




const amountDiscountPolicy = new AmountDiscountPolicy(discountMoney, [ periodCondition, sequenceCondition], true);
const percentDiscountPolicy = new PercenDiscountPolicy(0.2, [sequenceCondition, periodCondition], true);

const movie = new Movie("아바타", 120, movieFee, amountDiscountPolicy); 
const movie2 = new Movie("타이타닉", 180, movieFee2, percentDiscountPolicy); 


//1.5번째 순번인 아바타를 구매하는 2명의 고객. 5번째 고객이라 순번조건 할인이 들어가고 목요일 10시와 13시 사이에 왔기때문에 중복할인이 적용된다. 할인정책은 할인액이 800원인 금액 할인 정책이다.
const screeing = new Screening(movie, 5, 12, "목요일");
const result1 = screeing.reserve(customer1, 2, ticketOffice);
console.log(result1);


//기존금액: 20000원, 할인 후 금액: 16800원

//2. 5번째 순번인 타이타닉을 구매하는 한 명의 고객. 역시 목요일 10시에 와서 순번조건과 기간조건이 충족해 중복할인이 된다. 할인정책은 할인률이 0.2퍼센트인 비율 할인정책이다
const secondScreening = new Screening(movie2, 2, 10, "목요일");
const result2 = secondScreening.reserve(customer2, 1, ticketOffice);
console.log(result2);


console.log(ticketOffice);

