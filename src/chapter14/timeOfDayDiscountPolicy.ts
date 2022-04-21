import {Call} from "../chapter10";
import NightlyDiscountPolicy from "./nightlyDiscountPolicy";
import {Money} from "./basicRatePolicy";
import DateTimeInterval from "./dateTimeInterval";

class TimeOfDayDiscountCall extends NightlyDiscountPolicy {

  private from: Date | null = null;
  private to: Date | null = null;

  constructor(from: Date, to: Date, nightlyAmount: Money, regularAmount: Money, seconds: number) {
    super(nightlyAmount, regularAmount, seconds);
    this.from = from;
    this.to = to;
  }

  during(from: Date, to: Date): number {
    return (to.getDate() - from.getDate())-1;
  }

  fromCalDate(): Money {
   let result = new Money(0); 
   if(this.from) {
    let from = DateTimeInterval.toMidnight(this.from)
    let call = new Call(from.getFrom(),from.getTo());
    result = this.calculateCallFee(call);
   }
   return result;
  }

  intervalDate(): Money {
    let result = new Money(0);
    let interval = 0;
    if(this.from && this.to) {
      if(this.from < this.to) {
        interval = this.during(this.from, this.to);
        result = new Money(24 * 60 * 60 * interval);
      }
    }
    return result;
  }

  toCalDate(): Money {
   let result = new Money(0); 
   if(this.to) {
    let to = DateTimeInterval.fromMidnight(this.to)
    let call = new Call(to.getFrom(),to.getTo());
    result = this.calculateCallFee(call);
   }
   return result;
  }

  calFromToDate(): Money {
    if(this.from && this.to && (this.to > this.from)) {
      return this.fromCalDate().plusMoney(this.toCalDate());
    } return new Money(0);
  }

  calAllDate(): Money {
    if(this.from && this.to && (this.to > this.from)) {
      return this.calFromToDate().plusMoney(this.intervalDate());
    } return new Money(0);
  }
}

export default TimeOfDayDiscountCall;