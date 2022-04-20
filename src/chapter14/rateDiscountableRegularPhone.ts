import {RatePolicy, Money} from "./interface";
import RegularPhone from './regularPhone';

class RateDiscountableRegularPhone extends RegularPhone {
  private discountAmount: Money = new Money(0);

  constructor(amount: Money, seconds: number, discountAmount: Money, ratePolicy: RatePolicy) {
    super(amount, seconds, ratePolicy);
    this.discountAmount = discountAmount;
  }

  afterCalculated(fee: Money): Money {
    return fee.minus(this.discountAmount)
  }
}

export default RateDiscountableRegularPhone;