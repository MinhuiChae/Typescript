import TimeOfDayDiscountCall from './timeOfDayDiscountPolicy';
import { Money} from './phone';
import PersonalFeeCalculate from './personalCalculateFee';



const date = new Date(2021,0,1,21);
const date3 = new Date(2021,0,3,10);
const date4 = new Date(2021,1,3,10);
const date5 = new Date(2021,1,13,10);

const time = new TimeOfDayDiscountCall(date, date3, new Money(10), new Money(20), 10);
const time2 = new TimeOfDayDiscountCall(date4, date5, new Money(10), new Money(20), 10);

const personal = new PersonalFeeCalculate([time, time2]);

console.log(personal.calculatePersonalFee());
console.log(time.calAllDate());
console.log(time2.calAllDate());






