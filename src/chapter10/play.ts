import {Call, RegularPhone, Money, NightlyDiscountPhone} from './index';

var date2 = new Date(1991,11,25,23,10,58); 
var date3 = new Date(1991,11,25,23,50,58); 
var date4 = new Date(1991,11,25,22,20,58); 
var date5 = new Date(1991,11,25,22,50,58); 



const call = new Call(date2,date3);
const call2 = new Call(date4,date5);
const phone = new RegularPhone(new Money(10), 1, 0.1);
const night = new NightlyDiscountPhone(new Money(10), new Money(20), 1, 0.1);

night.calls.push(call);
night.calls.push(call2);
console.log(night.calculateFee());


