import { Call } from '../chapter10';
import {Phone, RegularPhone, NightlyDiscountPhone, RateDiscountablePolicy, TaxableRegularPhone, TaxableNightlyDiscountPhone, RateDiscountableRegularPhone, RateDiscountableNightlyDiscountPhone, TaxableAndRateDiscountableRegularPhone, RateDiscountableAndTaxableRegularPhone, TaxableAndDiscountableNightlyDiscountPhone, RateDiscountableAndTaxableNightlyDiscountPhone, RegularPolicy, NightlyDiscountPolicy} from '../chapter11'
import { Money } from '../chapter2'

const fromDate = new Date(1991,11,25,23,10,58); 
var toDate = new Date(1991,11,25,23,50,58); 

const regularPolicy = new RegularPolicy(new Money(10), 10);
const nightlyDiscountPolicy = new NightlyDiscountPolicy(new Money(5), new Money(10), 10);

const phone = new Phone(regularPolicy);
const phone2 = new Phone(nightlyDiscountPolicy);
const call = new Call(fromDate, toDate);
const call2 = new Call(fromDate, toDate);

phone.calls.push(call);
phone2.calls.push(call2);

console.log(phone);
console.log(phone2);
console.log(phone2.calculateFee());