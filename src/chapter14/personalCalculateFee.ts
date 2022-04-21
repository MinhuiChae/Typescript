import { Money } from '../chapter2';
import TimeOfDayDiscountCall from './timeOfDayDiscountPolicy';

class PersonalFeeCalculate {
  private call: TimeOfDayDiscountCall[] = [];

  constructor(call: TimeOfDayDiscountCall[]) {
    this.call = call;
  }

  calculatePersonalFee(): Money {
    let result = new Money(0);
    this.call.map((a: TimeOfDayDiscountCall) => result = result.plusMoney(a.calAllDate()));
    return result;
  }
}

export default PersonalFeeCalculate;