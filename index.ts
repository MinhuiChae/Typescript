import {Call} from "./src/chapter10";
import  NightlyDiscountPolicy from "./src/chapter14/nightlyDiscountPolicy";
import DateTimeInterval from "./src/chapter14/dateTimeInterval";
import TimeOfDayDiscountCall from './src/chapter14/timeOfDayDiscountPolicy';
import {Phone, Money} from './src/chapter14/phone';
import PersonalFeeCalculate from './src/chapter14/personalCalculateFee';



const date = new Date(2021,0,1,21);
const date3 = new Date(2021,0,3,10);
const date4 = new Date(2021,1,3,10);
const date5 = new Date(2021,1,13,10);

const year = date.getFullYear();
const month = date.getMonth();
const day = date. getDate();


const date2 = new Date(year, month, day);

const time = new TimeOfDayDiscountCall(date, date3, new Money(10), new Money(20), 10);
const time2 = new TimeOfDayDiscountCall(date4, date5, new Money(10), new Money(20), 10);

const duration = new Call(date, date3);
const duration2 = new Call(date4, date5);

const personal = new PersonalFeeCalculate([time, time2]);

console.log(personal.calculatePersonalFee());
console.log(time.calAllDate());
console.log(time2.calAllDate());






