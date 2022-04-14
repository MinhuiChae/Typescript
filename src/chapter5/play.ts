import {Customer, Money, Screening, PeriodCondition, SequenceCondition, AmountDiscountMovie, PercentDiscountMovie, NoneDiscountMovie} from "../chapter5";

const periodCondition = new PeriodCondition("금요일", 10);
const sequenceCondition = new SequenceCondition(5);

const amountDiscountMovie = new AmountDiscountMovie("타이타닉", 120, new Money(10000), new Money(1000), [periodCondition]);
const percentDiscountMovie = new PercentDiscountMovie("타이타닉", 120, new Money(10000), 0.2, [sequenceCondition]);

const screening = new Screening(percentDiscountMovie, 5, 5, "금요일");
const customer = new Customer("채민희", "minhui");

console.log(screening.reserve(customer, 2));
