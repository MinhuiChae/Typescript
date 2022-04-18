import {Call, RegularPhone, Money, NightlyDiscountPhone} from './src/chapter10';

var date2 = new Date(1991,11,25,10,10,58); // 1991년 12월 25일 3:50:00 (월 +1 주의)
var date3 = new Date(1991,11,25,10,50,58); 



const call = new Call(date2,date3);
const phone = new RegularPhone(new Money(10), 1, 0.1);
const night = new NightlyDiscountPhone(new Money(1), new Money(10), 1, 0.2);


console.log(night.calculateCallFee(call));
phone.calls.push(call);
console.log(phone.calculateFee());


